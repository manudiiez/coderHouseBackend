import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { createTaskDto, updateTaskDto } from './dto/task.dto'

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) { }

    @Get()
    getAllTasks() {
        return this.tasksService.getAllTasks()
    }

    @Post()
    // @Es una forma de llamar al req.body
    createTask(@Body() newTask: createTaskDto) {
        return this.tasksService.createTask(newTask)
    }

    @Delete(':id')
    // @Es una forma de llamar al req.body
    deleteTask(@Param('id') id: string) {
        return this.tasksService.deleteTask(id)
    }

    @Patch(':id')
    updateTask(@Param('id') id: string, @Body() updatedFields: updateTaskDto) {
        return this.tasksService.updateTask(id, updatedFields)
    }
}
