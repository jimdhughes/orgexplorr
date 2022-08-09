import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { User, UserDocument } from './schema/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUser(email: string): Promise<UserDto> {
    const user = await this.userModel.findOne({ email });
    return this.mapUserToUserDTO(user);
  }

  async validateUserPassword(
    email: string,
    password: string,
  ): Promise<boolean> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      return false;
    }
    const isValidPassword = bcrypt.compare(password, user.password);
    return isValidPassword;
  }

  async create(
    email: string,
    password: string,
    fullName: string,
  ): Promise<UserDto> {
    email = email.toLowerCase();
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw 'This email is already registered';
    }
    const salt = await bcrypt.genSalt(10);
    var encryptedPassword = await bcrypt.hash(password, salt);
    await this.userModel.create({
      email,
      password: encryptedPassword,
      fullName,
    });
    const created = await this.userModel.findOne({
      email,
    });
    return this.mapUserToUserDTO(created);
  }

  async updatePassword(
    _id: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<boolean> {
    const user = await this.userModel.findById(_id);
    if (!user) {
      return false;
    }
    const isValidOldPassword = await bcrypt.compareSync(
      oldPassword,
      user.password,
    );
    if (!isValidOldPassword) {
      return false;
    }
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(newPassword, salt);
    user.password = encryptedPassword;
    await user.save();
    return true;
  }

  private mapUserToUserDTO(user: UserDocument): UserDto {
    const { _id, email, fullName, role } = user;
    const userDto: UserDto = { id: _id, email, fullName, role };
    return userDto;
  }
}
