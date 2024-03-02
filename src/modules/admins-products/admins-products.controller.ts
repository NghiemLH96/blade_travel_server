import { Body, Controller, Delete, Get, Patch, Post, Query, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AdminsProductsService } from './admins-products.service';
import { Response } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { writeFileSync } from 'fs';
import searchQueryDto from './dto/search-query.dto';

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
      return res.status(500).json({
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
      return res.status(500).json({
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
      return res.status(500).json({
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
      return res.status(500).json({
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
      return res.status(500).json({
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
      console.log(fileName);
      
      fileName && writeFileSync(`public/imgs/product-avatar/${fileName}`, file.buffer);
      console.log("write file")
      let { message, error } = await this.adminsProductsService.createNewProduct({ ...newProductDetail, avatar:fileName});
      console.log("done",message)
      console.log("error",error);
      
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
      
      return res.status(500).json({
        error
      })
    }
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('uploadImgs'))
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>, @Req() req: Request, @Body() body: any, @Res() res: Response){
    let uploadDataList = []  
    for (const i in files) {
      let fileName = `product_img_${Number(i)+1}.${files[i].mimetype.split("/")[1]}`
      writeFileSync(`public/imgs/product-imgs/${fileName}`, files[i].buffer);
      uploadDataList.push({
        picLink:fileName,
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
      
      return res.status(500).json({
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
      
      return res.status(500).json({
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
      return res.status(500).json({
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
      return res.status(500).json({
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
      return res.status(500).json({
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
      return res.status(500).json({
        error
      })
    }
  }

  @Post('brand-new')
  async createNewBrand(@Body() body:{newBrandName:string} ,@Res() res:Response){
    try {
      const { message , error } = await this.adminsProductsService.createNewBrand(body.newBrandName)
      return res.status(200).json({
        message
      })
    } catch (error) {
      console.log(error);
      
      return res.status(500).json({
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
      return res.status(500).json({
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
      return res.status(500).json({
        error
      })
    }
  }

  @Post('category-new')
  async createNewCategory(@Body() body:{newCategoryName:string} ,@Res() res:Response){
    try {
      const { message , error } = await this.adminsProductsService.createNewCategory(body.newCategoryName)
      return res.status(200).json({
        message
      })
    } catch (error) {
      console.log(error);
      
      return res.status(500).json({
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
      return res.status(500).json({
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
      return res.status(500).json({
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
      return res.status(500).json({
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
      return res.status(500).json({
        error
      })
    }
  }
}
