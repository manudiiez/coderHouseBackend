import { Injectable } from '@nestjs/common';
import { Product, ProductsDocument } from './schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {

    constructor(@InjectModel(Product.name) private productsModule: Model<ProductsDocument>) {}


    async getAll() {
        return await this.productsModule.find({}).lean()
    }

    async save(createProduct) {
        const productCreated = await this.productsModule.create(createProduct)
        return productCreated
    }

    async getById(id) {
        return await this.productsModule.findById(id)
    }

    async updateById(id, updatedFields) {
        return await this.productsModule.findByIdAndUpdate(
            id,
            { $set: updatedFields },
            { new: true }
        )
    }

    async deleteById(id) {
        return await this.productsModule.findByIdAndDelete(id)
    }

    // // @Agregar el Task significa que vamos aestar retornando un obj de tipo Task
    // getTaskById(id: string): Task {
    //     return this.tasks.find(task => task.id === id)
    // }

    // updateTask(id: string, updatedFields: updateTaskDto): Task {
    //     const task = this.getTaskById(id)
    //     const newTask = Object.assign(task, updatedFields)
    //     this.tasks = this.tasks.map(task => task.id === id ? newTask : task)
    //     return newTask
    // }

}
