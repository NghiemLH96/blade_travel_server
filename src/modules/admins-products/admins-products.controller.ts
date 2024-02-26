import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AdminsProductsService } from './admins-products.service';
import { Response } from 'express';

@Controller('admin-products')
export class AdminsProductsController {
  constructor(private readonly adminsProductsService: AdminsProductsService) {}
  @Post('search')
  async search(@Body() searchOption:{
    productName:string,
    material:number|null,
    status:boolean|null,
    madeBy:number|null,
    category:number|null,
    brand: number| null
    currentPage:number,
    pageSize:number
  },@Res() res:Response){
    console.log(searchOption);
    
    try {
      const {message,data,total,error} = await this.adminsProductsService.search(searchOption)
      if (error) {
        throw error
      }
      
      console.log("**************",data);
      
      return res.status(200).json({
        message,
        data,
        total
      })
    } catch (error) {
      return res.status(500).json({
        error
      })
    }
  }

  @Get('brands')
  async getBrands(@Res() res:Response){
    try {
      const {message , data , error} = await this.adminsProductsService.getBrand()
      if (error) {
        throw error
      }
      return res.status(200).json({
        message,
        data
      })
    } catch (error) {
      return res.status(500).json({
        error
      })
    }
  }

  @Get('made-by')
  async getMadeBy(@Res() res:Response){
    try {
      const {message , data , error} = await this.adminsProductsService.getMadeBy()
      if (error) {
        throw error
      }
      return res.status(200).json({
        message,
        data
      })
    } catch (error) {
      return res.status(500).json({
        error
      })
    }
  }

  @Get('categories')
  async getCategories(@Res() res:Response){
    try {
      const {message , data , error} = await this.adminsProductsService.getCategories()
      if (error) {
        throw error
      }
      return res.status(200).json({
        message,
        data
      })
    } catch (error) {
      return res.status(500).json({
        error
      })
    }
  }

  @Get('material')
  async getMaterial(@Res() res:Response){
    try {
      const {message , data , error} = await this.adminsProductsService.getMaterial()
      if (error) {
        throw error
      }
      return res.status(200).json({
        message,
        data
      })
    } catch (error) {
      return res.status(500).json({
        error
      })
    }
  }
}
