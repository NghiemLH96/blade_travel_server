import { Controller, Get, Query, Res } from '@nestjs/common';
import { ProductsService } from './products.service'
import { Response } from 'express';
import searchQueryDto from './dto/search-query.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('best-seller')
  async getBestSeller(@Res() res:Response){
    try {
      const { message , data , error } = await this.productsService.getBestSeller();
      if (error) {
        throw error
      }
      return res.status(200).json({
        message,
        data
      })
    } catch (error) {
      return res.status(413).json({
        error
      })
    }
  }

  @Get()
  async searchByOption(@Res() res:Response,@Query() query:searchQueryDto){
    try {
      const searchQuery = query
      const { message ,data ,count , error } = await this.productsService.searchByOption(searchQuery) 
      return res.status(200).json({
        message,
        data,
        count
      })
      
    } catch (err) {
      return res.status(413).json({
        err
      })
    }
  }
}
