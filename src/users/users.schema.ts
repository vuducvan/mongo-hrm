import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  employeeId: string;

  @Prop()
  managerId: string;

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
  avatar: string;

  @Prop()
  department: string;

  @Prop()
  identificationNumber: string;

  @Prop()
  insuranceNumber: string;

  @Prop()
  isDelete: number;

  @Prop()
  createAt: Date;

  @Prop()
  updateAt: Date;

  @Prop()
  createBy: string;

  @Prop()
  updateBy: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
