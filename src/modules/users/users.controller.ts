import { Body, Controller, Ip, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import createUserDto from './dto/create_user.dto';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFileSync } from 'fs';

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

  @Post()
  async createNewUser(@Req() req:Request ,@Ip() ip:string ,@Body() newUserDetail:createUserDto , @Res() res: Response) {
    try {
      let realIp = req.headers['x-forwarded-for'].toString().split(",")[0]
      
      let currentIp = ip.split(":")[3]
      let { message, error } = await this.usersService.createNewUser({...newUserDetail,ip:realIp});
      if (error) {
        throw error
      }
      return res.status(200).json({ message })
    } catch (error) {
      if (error.code == "P2002") {
        if (error.meta.target == "users_email_key") {
          return res.status(413).json({
            message: "Email đã tồn tại!",
          })
        }
        if (error.meta.target == "users_phone_key") {
          return res.status(413).json({
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
  async check_exist(@Body() check_Exist: { email: string, phone: string }, @Res() res: Response) {
    try {
      let { data, error } = await this.usersService.check_Exist_Fn(check_Exist)
      if (data) {
        if (data.email == check_Exist.email) {
          return res.status(213).json({
            message: "Email đã tồn tại!",
          })
        }
        if (data.phone == check_Exist.phone) {
          return res.status(213).json({
            message: "Số điện thoại đã được đăng ký",
          })
        }else{
          throw {
            message:"Lỗi mất tiêu rồi",
          }
        }
      }else{
        return res.status(200).json({
          message:"Thông tin không trùng , có thể sử dụng.",
        })
      }
    } catch (error) {
      return res.status(500).json({
        message:"Lỗi gì đó!",
        error
      })
    }
  }
}
