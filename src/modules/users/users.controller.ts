import { Body, Controller, Ip, Post, Get, Req, Res, UploadedFile, UseInterceptors, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFileSync } from 'fs';
import checkExistUserDto from './dto/checkExist_uset.dto';
import { mailService, emailTemplates } from '../mailer/mailer.service';
import { tokenService } from 'src/utils/token/token.service';
import { loginUserDto } from './dto/login_user.dto';
import { uploadFileToStorage } from '../firebase/firebase.module';
import createUserDto from './dto/create_user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private mailerSevice: mailService, private tokenServ: tokenService) { }

  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadFile(@Body() body: any, @UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    try {
      const fileName = await uploadFileToStorage(file,"user-avatar",file.buffer)
      const userId = JSON.parse(body.id)
      let updateData = {
        id: userId,
        avatar: fileName
      }
      let { message,data, error } = await this.usersService.uploadAvatar(updateData)
      if (error) {
        throw error
      }else{
        return res.status(200).json({
          message,
          data,
          token:this.tokenServ.createToken(data,"1d")
        })
      }
    } catch (error) {
      return res.status(413).json({
        message: "Chỉnh sửa Avatar thất bại",
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
      if (!error) {
        return res.status(200).json({ message })
      }
      throw error
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
      
      return res.status(413).json({
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
      return res.status(413).json({
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
        return res.status(413).json({
          message:"Lỗi j nhỉ?",
          error
        })
    }
  }

  //checkLogin
  @Post("check-login")
  async checkLoginFn(@Body() body:{token:string}, @Res() res:Response){
    try {
      let loginUser = await this.tokenServ.verify(body.token)
      if (!loginUser) {
        res.status(413)
      }
      let {data} = await this.usersService.checkLoginFn(loginUser)
      
      if (data) {
        return res.status(200).json({
          data
        })
      }else{
        return res.status(214)
      }
    } catch (error) {
      return res.status(413)
    }
  }

  @Post('login-google')
  async loginWithGoogle(@Body() body:createUserDto, @Res() res:Response){
    try {
      const {message,info, error} = await this.usersService.loginWithGoogle(body)
      if (error) {
        throw error
      }
      if (info) {
        return res.status(200).json({
          message,
          token:this.tokenServ.createToken(info,"1d")
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

  @Patch('update-password')
  async updatePassword(@Body() body:{userId:number,old:string,new:string}, @Res() res:Response){
    try {
      const {message , result , data , error} = await this.usersService.updatePassword(body)
      if (result) {
        return res.status(200).json({
          message,
          data
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
}
