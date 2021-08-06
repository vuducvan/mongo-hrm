import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
  @Prop()
  userId: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

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

export const AccountSchema = SchemaFactory.createForClass(Account);
