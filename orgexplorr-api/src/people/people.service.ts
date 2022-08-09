import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PersonDto } from './dto/person.dto';
import { Person, PersonDocument } from './schema/person.schema';

@Injectable()
export class PeopleService {
  constructor(
    @InjectModel(Person.name) private personModel: Model<PersonDocument>,
  ) {}

  async findAll(skip: number = 0, limit: number = 50): Promise<PersonDto[]> {
    const people = await this.personModel.find().skip(skip).limit(limit);
    return Promise.all(
      people.map((person) => this.mapPersonToPersonDTO(person)),
    );
  }

  async findOne(id: string): Promise<PersonDto> {
    const person = await this.personModel.findById(id);
    return person ? this.mapPersonToPersonDTO(person) : null;
  }

  async findOneByEmail(email: string): Promise<PersonDto> {
    const person = await this.personModel.findOne({ email });
    return this.mapPersonToPersonDTO(person);
  }

  async findManagementChainForPerson(id: string): Promise<PersonDto[]> {
    const hierarchy: PersonDto[] = [];
    let person = await this.personModel.findById(id);
    hierarchy.push(await this.mapPersonToPersonDTO(person));
    while (person && person.managerId) {
      person = await this.personModel.findById(person.managerId);
      if (person) {
        hierarchy.push(await this.mapPersonToPersonDTO(person));
      }
    }
    return hierarchy;
  }

  async findDirectReportsForPerson(id: string): Promise<PersonDto[]> {
    const directReports = await this.personModel.find({
      managerId: id,
    });
    return Promise.all(
      directReports.map((directReport) =>
        this.mapPersonToPersonDTO(directReport),
      ),
    );
  }

  async findAllSubordinatesForPerson(id: string): Promise<PersonDto[]> {
    const person = await this.personModel.findById(id);
    const people = [];
    const queue = [await this.mapPersonToPersonDTO(person)];
    while (queue.length > 0) {
      const person = queue.pop();
      const directReports = await this.findDirectReportsForPerson(person.id);
      people.push(person);
      queue.push(...directReports);
    }
    return people;
  }

  // fulltext search for people
  async search(
    query: string,
    skip: number = 0,
    limit: number = 50,
  ): Promise<PersonDto[]> {
    const people = await this.personModel
      .find({ $text: { $search: query } }, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
      .skip(skip)
      .limit(limit);
    return Promise.all(
      people.map((person) => this.mapPersonToPersonDTO(person)),
    );
  }

  async createPerson(person: Person) {
    const newPerson = await this.personModel.create(person);
    return newPerson;
  }

  async updatePerson(person: Person, id: string) {
    const updatedPerson = await this.personModel.findByIdAndUpdate(id, person, {
      new: true,
    });
    return updatedPerson;
  }

  async deletePerson(id: string) {
    const deletedPerson = await this.personModel.findByIdAndDelete(id);
    return deletedPerson;
  }

  private async mapPersonToPersonDTO(
    person: PersonDocument,
  ): Promise<PersonDto> {
    return {
      id: person._id,
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email,
      phone: person.phone,
      address: person.address,
      city: person.city,
      state: person.state,
      country: person.country,
      managerId: person.managerId,
      title: person.title,
    };
  }
}
