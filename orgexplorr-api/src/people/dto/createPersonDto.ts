import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { BasePersonDto } from './basePersonDto';

// create a DTO class that maps to our person schema
export class CreatePersonDto extends BasePersonDto {}
