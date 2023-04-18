import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TasksDocument = Tasks & Document

@Schema()
export class Tasks {
  @Prop({required: true})
  title: string;

  @Prop({required: true})
  description: string;

  @Prop({required: false})
  status: string;
}

export const TaskSchema = SchemaFactory.createForClass(Tasks);
