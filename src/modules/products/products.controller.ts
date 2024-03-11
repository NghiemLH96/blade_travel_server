import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
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

  @Get('brand')
  async getProductByBrand(@Query() query:{brandId:string},@Res() res:Response){
    console.log(query);
    try {
      const {message , data , error } = await this.productsService.getProductByBrand(Number(query.brandId))
      if (error) {
        throw error
      }else{
        return res.status(200).json({
          message,
          data
        })
      }
    } catch (error) {
      return res.status(200).json({
        error
      })
    }
  }

  @Get('brand-detail')
  async getBrandDetail(@Query() query:{brandId:string},@Res() res:Response){
    console.log(query);
    try {
      const {message , data , error } = await this.productsService.getBrandDetail(Number(query.brandId))
      if (error) {
        throw error
      }else{
        return res.status(200).json({
          message,
          data
        })
      }
    } catch (error) {
      return res.status(200).json({
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

  @Post('add-to-cart')
  async addToCart(@Body() body:{userId:number,itemId:number},@Res() res:Response){
    try {
      const {message,error} = await this.productsService.addToCart(body.userId,body.itemId)
      if (!error) {
        res.status(200).json({
          message
        })
      }else{
        throw error
      }
    } catch (error) {
      res.status(413).json({
        error
      })
    }
  }

  @Post('get-cart')
  async getCart(@Body() body:{userId:number},@Res() res:Response){
    try {
      const {message,data,error} = await this.productsService.getCart(body.userId)
      if (!error) {
        return res.status(200).json({
          message,
          data
        })
      }else{
        throw error
      }
    } catch (error) {
      return res.status(413).json({
        error
      })
    }
  }

  @Patch('cart-increase')
  async cartIncrease(@Body() body:{itemId:number},@Res() res:Response){
    try {
      const {message,error} = await this.productsService.cartIncrease(body.itemId)
      if (error) {
        throw error
      }else{
        return res.status(200).json({
          message
        })
      }
    } catch (error) {
        return res.status(413).json({
          error
        })
    }
  }

  @Patch('cart-decrease')
  async cartDecrease(@Body() body:{itemId:number},@Res() res:Response){
    try {
      const {message,error} = await this.productsService.cartDecrease(body.itemId)
      if (error) {
        throw error
      }else{
        return res.status(200).json({
          message
        })
      }
    } catch (error) {
        return res.status(413).json({
          error
        })
    }
  }

  @Delete('cart-remove/:itemId')
  async removeCartItem(@Param() param:{itemId:string},@Res() res:Response){
    try {
      const {message , error} = await this.productsService.removeCartItem(Number(param.itemId))
      if (error) {
        throw error
      }else{
        return res.status(200).json({
          message
        })
      }
    } catch (error) {
      return res.status(413).json({
        error
      })
    }
  }

  @Post('check-out-cod')
  async checkOutCOD(@Body() body:{id:number,phone:string,address:string,email:string},@Res() res:Response){
    try {
      const {message , error} = await this.productsService.checkOutCOD(body)
      if (error) {
        throw error
      }else{
        return res.status(200).json({
          message
        })
      }
    } catch (error) {
      console.log(error);
      
      return res.status(413).json({
        error
      })
    }
  }

  @Post('check-out-wallet')
  async checkOutWallet(@Body() body:{id:number,phone:string,address:string,email:string},@Res() res:Response){
    try {
      const {message, paid ,user , error} = await this.productsService.checkOutWallet(body)
      if (error) {
        throw error
      }else{
        if (paid) {
          return res.status(200).json({
            user,
            message
          })
        }else{
          return res.status(214).json({
            message
          })
        }
      }
    } catch (error) {
      return res.status(413).json({
        error
      })
    }
  }
}
