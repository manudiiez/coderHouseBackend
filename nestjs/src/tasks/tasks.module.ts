import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import {MongooseModule} from '@nestjs/mongoose'
import { Tasks, TaskSchema } from './schemas/task.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Tasks.name,
        schema: TaskSchema, 
      }
    ])
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
