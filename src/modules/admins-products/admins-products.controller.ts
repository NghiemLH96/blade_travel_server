import { Body, Controller, Delete, Get, Patch, Post, Query, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AdminsProductsService } from './admins-products.service';
import { Response } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import searchQueryDto from './dto/search-query.dto';
import { uploadFileToStorage } from '../firebase/firebase.module';
import updateProductDto from './dto/update-product.dto';
import { receiptStatus } from '@prisma/client';

@Controller('admin-products')
export class AdminsProductsController {
  constructor(private readonly adminsProductsService: AdminsProductsService) {}
  @Get()
  async productFilter(@Res() res:Response,@Query() query:searchQueryDto){
    try {
      const searchQuery = query
      const { message ,data ,count , error } = await this.adminsProductsService.productFilter(searchQuery) 
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

  @Get('brands')
  async getBrands(@Res() res:Response){
    try {
      const {message , data , error} = await this.adminsProductsService.getBrand()
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

  @Get('made-by')
  async getMadeBy(@Res() res:Response){
    try {
      const {message , data , error} = await this.adminsProductsService.getMadeBy()
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

  @Get('categories')
  async getCategories(@Res() res:Response){
    try {
      const {message , data , error} = await this.adminsProductsService.getCategories()
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

  @Get('material')
  async getMaterial(@Res() res:Response){
    try {
      const {message , data , error} = await this.adminsProductsService.getMaterial()
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

  @Patch('status')
  async changeStatus(@Body() item:{id:number,status:boolean},@Res() res:Response){
    try {
      const {message , error} = await this.adminsProductsService.changeStatus(item)
      return res.status(200).json({
        message
      })
    } catch (error) {
      return res.status(413).json({
        error
      })
    }
  }

  @Post('create-new')
  @UseInterceptors(FileInterceptor('avatar'))
  async createNewProduct(@UploadedFile() file: Express.Multer.File, @Body() body: any, @Res() res: Response){
    try {
      let newProductDetail = JSON.parse(body.data)
      
      const fireBaseFileName = await uploadFileToStorage(file,'product-avatar',file.buffer)
      console.log("fireBaseFileName",fireBaseFileName);
      
      let { message, error } = await this.adminsProductsService.createNewProduct({ ...newProductDetail, avatar:fireBaseFileName});
      
      if (error) {
        if (error.code == "P2002") {
          if (error.meta.target == "products_productName_key") {
            return res.status(214).json({ message:"Tên sản phẩm đã tồn tại!" })
          }
        }
      }

      return res.status(200).json({ message })
    } catch (error) {
      console.log(error);
      return res.status(413).json({
        error
      })
    }
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('uploadImgs'))
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body: any, @Res() res: Response){
    let uploadDataList = [] 
    
    for (const i in files) {
      let fireBaseFileName = await uploadFileToStorage(files[i],'product-pics',(files as any).buffer)
      console.log(fireBaseFileName);
      
      uploadDataList.push({
        picLink:fireBaseFileName,
        productId:Number(body.productId),
        createAt:String(Date.now()),
        updateAt:String(Date.now())
      })
    }
    try {
      let {message , error} = await this.adminsProductsService.uploadImgs(uploadDataList,Number(body.productId));
      return res.status(200).json({
        message
      })
    } catch (error) {
      console.log(error);
      
      return res.status(413).json({
        error
      })
    }
    
  }

  @Patch('update-detail')
  async updateDetail(@Body() body:updateProductDto, @Res() res: Response){
    try {
      const {message,error} = await this.adminsProductsService.updateDetail(body)
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

  @Patch('delete')
  async deleteProduct(@Body() item:{id:number},@Res() res:Response){
    try {
      const { message , error } = await this.adminsProductsService.deleteProduct(item.id)
      return res.status(200).json({
        message
      })
    } catch (error) {
      //console.log(error);
      
      return res.status(413).json({
        error
      })
    }
  }

  @Patch('material-status')
  async changeMaterialStatus(@Body() item:{id:number,status:boolean},@Res() res:Response){
    try {
      const {message , error} = await this.adminsProductsService.changeMaterialStatus(item)
      return res.status(200).json({
        message
      })
    } catch (error) {
      return res.status(413).json({
        error
      })
    }
  }

  @Post('material-new')
  async createNewMaterial(@Body() body:{newMaterialName:string} ,@Res() res:Response){
    try {
      const { message , error } = await this.adminsProductsService.createNewMaterial(body.newMaterialName)
      return res.status(200).json({
        message
      })
    } catch (error) {
      return res.status(413).json({
        error
      })
    }
  }

  @Delete('material')
  async deleteMaterial(@Query() query:{id:string},@Res() res:Response){
    try {
      const {message, success , error} = await this.adminsProductsService.deleteMaterial(Number(query.id))
      if (success) {
        return res.status(200).json({
          message
        })
      }else{
        return res.status(214).json({
          message
        })
      }
      
    } catch (error) {
      return res.status(413).json({
        error
      })
    }
  }

  @Patch('brand-status')
  async changeBrandStatus(@Body() item:{id:number,status:boolean},@Res() res:Response){
    try {
      const {message , error} = await this.adminsProductsService.changeBrandStatus(item)
      return res.status(200).json({
        message
      })
    } catch (error) {
      return res.status(413).json({
        error
      })
    }
  }

  @Post('brand-new')
  @UseInterceptors(FilesInterceptor('avatar'))
  async createNewBrand(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body: any, @Res() res: Response){
    try {
      const brandName = JSON.parse(body.data).brandName
      let picsList = [];
      for (const i in files) {
        const picLink = await uploadFileToStorage(files[i],"assets/brands",files[i].buffer)
        picsList.push(picLink)
      }
      const { message , error } = await this.adminsProductsService.createNewBrand(picsList,brandName)
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

  @Delete('brand')
  async deleteBrand(@Query() query:{id:string},@Res() res:Response){
    try {
      const {message, success , error} = await this.adminsProductsService.deleteBrand(Number(query.id))
      if (success) {
        return res.status(200).json({
          message
        })
      }else{
        return res.status(214).json({
          message
        })
      }
      
    } catch (error) {
      return res.status(413).json({
        error
      })
    }
  }

  @Patch('category-status')
  async changeCategoryStatus(@Body() item:{id:number,status:boolean},@Res() res:Response){
    try {
      const {message , error} = await this.adminsProductsService.changeCategoryStatus(item)
      return res.status(200).json({
        message
      })
    } catch (error) {
      return res.status(413).json({
        error
      })
    }
  }

  @Post('category-new')
  @UseInterceptors(FilesInterceptor('avatar'))
  async createNewCategory(@UploadedFiles() files: Array<Express.Multer.File>,@Body() body:any ,@Res() res:Response){
    try {
      const catName = JSON.parse(body.data).categoryName
      
      let fireBaseFileName = await uploadFileToStorage(files[0],'assets/banner',(files[0] as any).buffer)
      const { message , error } = await this.adminsProductsService.createNewCategory(fireBaseFileName,catName)
      console.log(message);
      
      if (error) {
        throw error
      }
      return res.status(200).json({
        message
      })
    } catch (error) {
      return res.status(413).json({
        error
      })
    }
  }

  @Delete('category')
  async deleteCategory(@Query() query:{id:string},@Res() res:Response){
    try {
      const {message, success , error} = await this.adminsProductsService.deleteCategory(Number(query.id))
      if (success) {
        return res.status(200).json({
          message
        })
      }else{
        return res.status(214).json({
          message
        })
      }
      
    } catch (error) {
      return res.status(413).json({
        error
      })
    }
  }

  @Patch('made-by-status')
  async changeMadeByStatus(@Body() item:{id:number,status:boolean},@Res() res:Response){
    try {
      const {message , error} = await this.adminsProductsService.changeMadeByStatus(item)
      return res.status(200).json({
        message
      })
    } catch (error) {
      return res.status(413).json({
        error
      })
    }
  }

  @Post('made-by-new')
  async createNewMadeBy(@Body() body:{newCountry:string} ,@Res() res:Response){
    try {
      console.log(body.newCountry);
      
      const { message , error } = await this.adminsProductsService.createNewMadeBy(body.newCountry)
      return res.status(200).json({
        message
      })
    } catch (error) {
      return res.status(413).json({
        error
      })
    }
  }

  @Delete('made-by')
  async deleteMadeBy(@Query() query:{id:string},@Res() res:Response){
    try {
      const {message, success , error} = await this.adminsProductsService.deleteMadeBy(Number(query.id))
      if (success) {
        return res.status(200).json({
          message
        })
      }else{
        return res.status(214).json({
          message
        })
      }
      
    } catch (error) {
      return res.status(413).json({
        error
      })
    }
  }

  @Get('receipts')
  async getReceipts(@Query() query:{userName:string,status:receiptStatus,current:number,size:number},@Res() res:Response){
    try {
      console.log(query);
      
      const {message, data , total , error} = await this.adminsProductsService.getReceipts(query)
      if (error) {
        throw error
      } else{
        return res.status(200).json({
          message,
          total,
          data
        })
      }
    } catch (error) {
      return res.status(413).json({
        error
      })
    }
  }

  @Patch('set-BS')
  async setBestSeller(@Body() body:{id:number,bestSeller:boolean},@Res() res:Response){
    try {
      const {message, flag , error} = await this.adminsProductsService.setBestSeller(body)
      if (error) {
        throw error
      }else{
        if (flag) {
          return res.status(200).json({
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

  @Patch('cancel-receipt')
  async cancelReceipt(@Body() body:{receiptId:number},@Res() res:Response){
    try {
      const {message,error} = await this.adminsProductsService.cancelReceipt(body.receiptId)
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
}
