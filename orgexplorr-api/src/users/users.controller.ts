import { Body, Controller, Get, Put, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  async getAuthenticatedUser(@Request() req) {
    return this.usersService.getUser(req.user.id);
  }

  @Put('/me')
  @UseGuards(AuthGuard('jwt'))
  async updateMyProfile() {}

  @Put('/me/password')
  @UseGuards(AuthGuard('jwt'))
  async updateAuthenticatedUserPassword(
    @Request() req,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(
      req.user.id,
      updatePasswordDto.password,
      updatePasswordDto.oldPassword,
    );
  }
}
