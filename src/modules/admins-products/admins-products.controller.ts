import { Body, Controller, Post, Res } from '@nestjs/common';
import { AdminsProductsService } from './admins-products.service';
import { Response } from 'express';
import { productBrand, productMadeBy, productMaterial} from '@prisma/client';

@Controller('admin-products')
export class AdminsProductsController {
  constructor(private readonly adminsProductsService: AdminsProductsService) {}
  @Post('search')
  async search(@Body() searchOption:{
    productName:string,
    material:productMaterial|null,
    status:boolean|null,
    madeBy:productMadeBy|null,
    category:number|null,
    brand: productBrand| null
    currentPage:number,
    pageSize:number
  },@Res() res:Response){
    console.log(searchOption);
    
    try {
      const {message,data,total,error} = await this.adminsProductsService.search(searchOption)
      if (error) {
        throw error
      }
      
      console.log(data);
      
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
}
