import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskStatus } from './tasks.entity';
import { v4 } from 'uuid'
import { createTaskDto, updateTaskDto } from './dto/task.dto';
import { Tasks, TasksDocument } from './schemas/task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {

    constructor(@InjectModel(Tasks.name) private tasksModule: Model<TasksDocument>) {

    }

    private tasks: Task[] = [{
        id: '1',
        title: 'first taks',
        description: 'somne taks',
        status: TaskStatus.PENDING
    }]

    getAllTasks() {
        return this.tasks
    }
    async createTask(createTaskDto: createTaskDto) {
        const taskCreated = await this.tasksModule.create(createTaskDto )
        // this.tasks.push(task)
        return taskCreated
    }
    deleteTask(id: string) {
        this.tasks = this.tasks.filter((task => task.id !== id))
        return this.tasks
    }

    // @Agregar el Task significa que vamos aestar retornando un obj de tipo Task
    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id)
    }

    updateTask(id: string, updatedFields: updateTaskDto): Task {
        const task = this.getTaskById(id)
        const newTask = Object.assign(task, updatedFields)
        this.tasks = this.tasks.map(task => task.id === id ? newTask : task)
        return newTask
    }
}
