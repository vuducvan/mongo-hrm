import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserroleDocument = Userrole & Document;

@Schema()
export class Userrole {
  @Prop()
  userId: string;

  @Prop({ type: Array })
  roleName: string;

  @Prop({ type: Array })
  permission: {
    screenId: string;
    url: string;
    canWrite: number;
    canRead: number;
    canUpdate: number;
    canDelete: number;
    canApprove: number;
  };

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

export const UserroleSchema = SchemaFactory.createForClass(Userrole);
