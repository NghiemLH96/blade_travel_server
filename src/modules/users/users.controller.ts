import { Body, Controller, Ip, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import createUserDto from './dto/create_user.dto';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFileSync } from 'fs';
import checkExistUserDto from './dto/checkExist_uset.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadFile(@Body() body:any ,@UploadedFile() file: Express.Multer.File , @Res() res:Response) {
    try {
      let fileName = `avatar_${body.userId}.${file.mimetype.split("/")[1]}`
      writeFileSync(`public/imgs/avatars/` + fileName,file.buffer)
      let updateData = {
        id :body.userId,
        avatar:fileName
      }
      let { message , error } = await this.usersService.uploadAvatar(updateData)
      return res.status(200).json({
        message:"upload-avatar successed"
      })
    } catch (error) {
      return res.status(200).json({
        message:"upload-avatar failed",
        error
      })
    }
  }
  //processing
  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  async createNewUser(@UploadedFile() file: Express.Multer.File ,@Req() req:Request ,@Ip() ip:string ,@Body() body:any , @Res() res: Response) {
    console.log("newUserDetail",body);
    console.log("header", req.headers);
    
    try {
      //let realIp = req.headers['x-forwarded-for'].toString().split(",")[0]
      let newUserDetail = JSON.parse(body.data)
      let { message, error } = await this.usersService.createNewUser({...newUserDetail,ip:"127.0.0.1"});
      if (error) {
        throw error
      }
      return res.status(200).json({ message })
    } catch (error) {
      console.log(error);
      if (error.code == "P2002") {
        if (error.meta.target == "users_email_key") {
          return res.status(213).json({
            message: "Email đã tồn tại!",
          })
        }
        if (error.meta.target == "users_phone_key") {
          return res.status(213).json({
            message: "Số điện thoại đã được đăng ký, xin vui lòng sử dụng số khác!",
          })
        }
      }
      return res.status(500).json({
        message: "Lỗi gì đó",
        error
      })
    }
  }

  //Register 1st step
  @Post("check-exist")
  async check_exist(@Body() check_Exist: checkExistUserDto, @Res() res: Response) {
    try {
      let { message, data, error } = await this.usersService.check_Exist_Fn(check_Exist)

      if(error){
        throw error
      }

      if (data) {
        if (data) {
          return res.status(213).json({
            message,
            data
          })
        }
      }else{
        return res.status(200).json({
          message,
          data
        })
      }
    } catch (error) {
      console.log(error);
      
      return res.status(500).json({
        message:"Lỗi gì đó!",
        error
      })
    }
  }
}
