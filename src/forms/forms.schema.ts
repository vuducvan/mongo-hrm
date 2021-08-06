import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FormDocument = Form & Document;

@Schema()
export class Form {
  @Prop()
  userId: string;

  @Prop()
  typeOf: string;

  @Prop()
  managerId: string;

  @Prop()
  note: string;

  @Prop()
  task: string;

  @Prop()
  achievement: string;

  @Prop()
  managerComment: string;

  @Prop()
  status: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  isDelete: number;

  @Prop()
  createBy: string;

  @Prop()
  updateBy: string;
}

export const FormSchema = SchemaFactory.createForClass(Form);
