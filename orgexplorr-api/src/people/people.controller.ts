import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { BasePersonDto } from './dto/basePersonDto';
import { CreatePersonDto } from './dto/createPersonDto';
import { PeopleService } from './people.service';

@Controller('people')
@ApiBearerAuth()
export class PeopleController {
  constructor(private peopleService: PeopleService) {}

  // Find all Users
  @Get()
  @Roles('admin', 'user')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiQuery({
    name: 'q',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'resultsPerPage',
    type: Number,
    required: false,
  })
  async getAllPeople(
    @Query('q') query?: string,
    @Query('page') page?: number,
    @Query('resultsPerPage') resultsPerPage?: number,
  ) {
    if (!page) {
      page = 1;
    }
    if (!resultsPerPage) {
      resultsPerPage = 50;
    }
    return query
      ? this.peopleService.search(
          query,
          (page - 1) * resultsPerPage,
          resultsPerPage,
        )
      : this.peopleService.findAll((page - 1) * resultsPerPage, resultsPerPage);
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  @Roles('user', 'admin')
  async getPersonById(@Param('id') id: string) {
    return this.peopleService.findOne(id);
  }

  // get the management chain for a specific user
  @Get('/:id/management')
  @UseGuards(AuthGuard('jwt'))
  @Roles('user', 'admin')
  async getManagementChainForPersonById(@Param('id') id: string) {
    return this.peopleService.findManagementChainForPerson(id);
  }

  // get the direct reports for a specific user
  @Get('/:id/directReports')
  @UseGuards(AuthGuard('jwt'))
  @Roles('user', 'admin')
  async getDirectReportsForPersonById(@Param('id') id: string) {
    return this.peopleService.findDirectReportsForPerson(id);
  }

  // get all subordinates for a specific user
  @Get('/:id/subordinates')
  @UseGuards(AuthGuard('jwt'))
  @Roles('user', 'admin')
  async getSubordinatesForPersonById(@Param('id') id: string) {
    return this.peopleService.findAllSubordinatesForPerson(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  async createPerson(@Body() person: CreatePersonDto) {
    return this.peopleService.createPerson(person);
  }
}
