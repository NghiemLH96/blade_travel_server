import { Body, Controller, Ip, Post, Get, Req, Res, UploadedFile, UseInterceptors, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFileSync } from 'fs';
import checkExistUserDto from './dto/checkExist_uset.dto';
import { mailService, emailTemplates } from '../mailer/mailer.service';
import { tokenService } from 'src/utils/token/token.service';
import { loginUserDto } from './dto/login_user.dto';
import { uploadFileToStorage } from '../firebase/firebase.module';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private mailerSevice: mailService, private tokenServ: tokenService) { }

  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadFile(@Body() body: any, @UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    try {
      let fileName = `avatar_${body.userId}.${file.mimetype.split("/")[1]}`
      writeFileSync(`public/imgs/avatars/` + fileName, file.buffer)
      let updateData = {
        id: body.userId,
        avatar: fileName
      }
      let { message, error } = await this.usersService.uploadAvatar(updateData)
      return res.status(200).json({
        message: "upload-avatar successed"
      })
    } catch (error) {
      return res.status(200).json({
        message: "upload-avatar failed",
        error
      })
    }
  }

  //Register 2nd step
  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  async createNewUser(@UploadedFile() file: Express.Multer.File, @Req() req: Request, @Ip() ip: string, @Body() body: any, @Res() res: Response) {
    try {
      let newUserDetail = JSON.parse(body.data)
      const fileName = await uploadFileToStorage(file,"user-avatar",file.buffer)
      
      //let realIp = req.headers['x-forwarded-for'].toString().split(",")[0]
      let { message, error, data } = await this.usersService.createNewUser({ ...newUserDetail, ip: "127.0.0.1" , avatar:fileName});

      this.mailerSevice.sendMail(newUserDetail.email, "Xác nhận Email", emailTemplates.emailVerify(newUserDetail.email, `http://${process.env.HOST_API}/api/v1/users/email-confirm/${this.tokenServ.createToken(data, "3d")}`))
      return res.status(200).json({ message })
    } catch (error) {
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
        message: "Lỗi gì đó r",
        error
      })
    }
  }

  //Verify Email
  @Get("email-confirm/:token")
  async verifyEmail(@Param("token") param: string) {
    try {
      let userDetail = this.tokenServ.verify(param)

      let result: boolean = await this.usersService.confirmEmail(userDetail.email)
      if (result) {
        console.log("xac minh thanh cong");
      }
    } catch (error) {
      console.log(error);
    }
  }

  //Register 1st step
  @Post("check-exist")
  async check_exist(@Body() check_Exist: checkExistUserDto, @Res() res: Response) {
    try {
      let { message, data, error } = await this.usersService.check_Exist_Fn(check_Exist)

      if (data) {
        if (data) {
          return res.status(213).json({
            message,
            data
          })
        }
      } else {
        return res.status(200).json({
          message,
          data
        })
      }
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message: "Lỗi gì đó!",
        error
      })
    }
  }

  //login
  @Post("login")
  async loginFn(@Body() loginInfo:loginUserDto, @Res() res:Response){
    try {
      let{message, info} = await this.usersService.loginFn(loginInfo)
      if (info) {
        return res.status(200).json({
          message,
          info,
          token:this.tokenServ.createToken(info,"1d")
        })
      }else{
        return res.status(213).json({
          message
        })
      }
    } catch (error) {
        return res.status(500).json({
          message:"Lỗi j nhỉ?",
          error
        })
    }
  }

  //checkLogin
  @Get("check-login/:token")
  async checkLoginFn(@Param("token") token:string, @Res() res:Response){
    try {
      let loginUser = this.tokenServ.verify(token)
      let result = await this.usersService.checkLoginFn(loginUser)
      if (result) {
        return res.status(200).json({
          confirm:true
        })
      }else{
        throw false
      }
    } catch (error) {
      return res.status(213).json({
        confirm:false
      })
    }
  }
}
