import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Person } from '../models/Person';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  constructor(private http: HttpClient) {}

  async search(term: string): Promise<Person[]> {
    if (!term) {
      return null;
    }
    const people = await this.http
      .get<Person[]>(`${environment.apiUrl}/people?q=${term}`)
      .toPromise();
    return people;
  }

  async getSubordinates(id: number): Promise<Person[]> {
    const people = await this.http
      .get<Person[]>(`${environment.apiUrl}/people/${id}/directReports`)
      .toPromise();
    return people;
  }

  async getPerson(id: number): Promise<Person> {
    const person = await this.http
      .get<Person>(`${environment.apiUrl}/people/${id}`)
      .toPromise();
    return person;
  }

  async getManagementChain(id: number): Promise<Person[]> {
    const people = await this.http
      .get<Person[]>(`${environment.apiUrl}/people/${id}/management`)
      .toPromise();
    return people;
  }

  async getCommonManager(
    firstChain: Person[],
    secondChain: Person[]
  ): Promise<Person> {
    // remove the people we are comparing
    const firstChainWithoutSelf = JSON.parse(JSON.stringify(firstChain))
      .reverse()
      .slice(0, firstChain.length - 1);
    const secondChainWithoutSelf = JSON.parse(JSON.stringify(secondChain))
      .reverse()
      .slice(0, secondChain.length - 1);
    const minLengthChain =
      firstChainWithoutSelf.length < secondChainWithoutSelf.length
        ? firstChainWithoutSelf
        : secondChainWithoutSelf;
    for (let i = 0; i < firstChainWithoutSelf.length; i++) {
      if (firstChainWithoutSelf[i].id !== secondChainWithoutSelf[i].id) {
        return firstChainWithoutSelf[i - 1];
      }
    }
  }
}
