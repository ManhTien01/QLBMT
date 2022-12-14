import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = await this.productModel.create(createProductDto);
    return createdProduct;
  }

  // async findAll(): Promise<Product[]> {
  //   return this.productModel.find().exec();
  // }

  

  async delete(id: string) {
    const deletedProduct = await this.productModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedProduct;
  }
  find(options) {
    return this.productModel.find(options);
  }
  async findOne(id: string): Promise<Product> {
    return this.productModel.findOne({ _id: id }).exec();
  }

  count(options) {
    return this.productModel.count(options).exec();
  }


}