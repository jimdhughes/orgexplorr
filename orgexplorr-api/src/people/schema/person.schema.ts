import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type PersonDocument = Person & Document;

@Schema()
@ObjectType({ description: 'person' })
export class Person {
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  email: string;
  @Prop()
  phone: string;
  @Prop()
  address: string;
  @Prop()
  city: string;
  @Prop()
  state: string;
  @Prop()
  country: string;
  @Prop()
  title: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: Person.name })
  managerId: Types.ObjectId;
}

export const PersonSchema = SchemaFactory.createForClass(Person);

PersonSchema.index({
  firstName: 'text',
  lastName: 'text',
  email: 'text',
  title: 'text',
});
