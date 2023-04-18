import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';
import { ProductsService } from './products.service';


@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }

    @Get()
    getAll() {
        return this.productsService.getAll()
    }

    @Post()
    save(@Body() newProduct: any) {
        return this.productsService.save(newProduct)
    }

    @Get(':PRODUCT_ID')
    getById(@Param('PRODUCT_ID') id: String) {
        return this.productsService.getById(id)
    }

    @Patch(':PRODUCT_ID')
    updateById(@Param('PRODUCT_ID') id: String, @Body() updatedFields: any) {
        return this.productsService.updateById(id, updatedFields)
    }

    @Delete(':PRODUCT_ID')
    deleteById(@Param('PRODUCT_ID') id: String) {
        return this.productsService.deleteById(id)
    }
}
