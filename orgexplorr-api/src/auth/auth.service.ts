import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { LoginUserDto } from 'src/users/dto/userLogin.dto';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.usersService.getUser(payload.email);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async register(createUserDto: CreateUserDto): Promise<RegistrationStatus> {
    
    try {
      const user = await this.usersService.create(
        createUserDto.email,
        createUserDto.password,
        createUserDto.fullName,
      );
      let regStatus: RegistrationStatus = {
        success: true,
        email: user.email,
      };
      return regStatus;
    } catch (e) {
      this.logger.error(e);
      let failStatus: RegistrationStatus = {
        success: false,
        email: '',
      };
      return failStatus;
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    // find user in db
    const isValidPassword = await this.usersService.validateUserPassword(
      loginUserDto.email,
      loginUserDto.password,
    );
    if (!isValidPassword) {
      return null;
    }
    const user = await this.usersService.getUser(loginUserDto.email);
    // generate and sign token
    const token = this._createToken(user);

    return {
      email: user.email,
      role: user.role,
      ...token,
    };
  }

  private _createToken({ email, role }: UserDto): JwtToken {
    const user: JwtPayload = { email, role };
    const accessToken = this.jwtService.sign(user, {
      secret: process.env.JWT_SECRETKEY,
      expiresIn: process.env.JWT_EXPIRESIN,
    });
    return {
      expiresIn: process.env.JWT_EXPIRESIN,
      accessToken,
    };
  }
}

export interface JwtToken {
  expiresIn: string;
  accessToken: string;
}

export interface LoginStatus {
  email: string;
  role: string;
  expiresIn: string;
  accessToken: string;
}

export interface RegistrationStatus {
  success: boolean;
  email: string;
}
