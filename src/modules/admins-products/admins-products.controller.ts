import { Body, Controller, Get, Patch, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AdminsProductsService } from './admins-products.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFileSync } from 'fs';

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
    
    try {
      const {message,data,total,error} = await this.adminsProductsService.search(searchOption)
      if (error) {
        throw error
      }
      
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

  @Patch('status')
  async changeStatus(@Body() item:{id:number,status:boolean},@Res() res:Response){
    try {
      const {message , error} = await this.adminsProductsService.changeStatus(item)
      if (error) {
        throw error
      }
      return res.status(200).json({
        message
      })
    } catch (error) {
      return res.status(500).json({
        error
      })
    }
  }

  @Post('create-new')
  @UseInterceptors(FileInterceptor('avatar'))
  async createNewProduct(@UploadedFile() file: Express.Multer.File, @Req() req: Request, @Body() body: any, @Res() res: Response){
    
    try {
      let newProductDetail = JSON.parse(body.data)
      const fileName = file ? `avatar_id_${Math.random()*Date.now()}.${file.mimetype.split("/")[1]}` : null
      fileName && writeFileSync(`public/imgs/product-avatar/${fileName}`, file.buffer);
      let { message, error, data } = await this.adminsProductsService.createNewProduct({ ...newProductDetail, avatar:fileName});
      if (error) {
        throw error
      }

      return res.status(200).json({ message })
    } catch (error) {
      return res.status(500).json({
        error
      })
    }
  }

  @Patch('delete')
  async deleteProduct(@Body() item:{id:number},@Res() res:Response){
    try {
      const { message , error } = await this.adminsProductsService.deleteProduct(item.id)
      if (error) {
        throw error
      }
      return res.status(200).json({
        message
      })
    } catch (error) {
      //console.log(error);
      
      return res.status(500).json({
        error
      })
    }
  }
}
