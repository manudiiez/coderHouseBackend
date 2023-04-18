import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductsDocument = Product & Document

@Schema()
export class Product {
  @Prop({required: true})
  name: string;

  @Prop({required: true})
  price: Number;

  @Prop({required: true})
  description: string;

  @Prop({default: 'https://http2.mlstatic.com/D_NQ_NP_876031-MLA51698106514_092022-W.jpg'})
  image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
