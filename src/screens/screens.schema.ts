import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ScreenDocument = Screen & Document;

@Schema()
export class Screen {
  @Prop()
  screenName: string;

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

export const ScreenSchema = SchemaFactory.createForClass(Screen);
