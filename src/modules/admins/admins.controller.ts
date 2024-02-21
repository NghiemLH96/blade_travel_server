import { Controller, Post, Body, Res, Param, Get, Patch } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { loginAdminDto } from './dto/login-admin.dto';
import { Response } from 'express';
import { tokenService } from 'src/utils/token/token.service';
import { mailService, resetPWTemplate } from '../mailer/mailer.service';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService ,private tokenSrc: tokenService ,private mailerSvc:mailService) { }
  @Post()
  async adminLogin(@Body() body: loginAdminDto, @Res() res: Response) {
    try {
      const { message, data, error } = await this.adminsService.adminLogin(body)
      if (error) {
        throw error
      } else {
        if (!data) {
          return res.status(214).json({
            message,
            data
          })
        }else{
          return res.status(200).json({
            message,
            token:this.tokenSrc.createToken(data,"1d")
          })
        }
      }
    } catch (error) {
      return res.status(413).json({
        error
      })
    }
  }

  @Post('check-login')
  async checkLogin(@Body() body:{token:string}, @Res() res:Response){
    const loginDetail = this.tokenSrc.verify(body.token)
    console.log("loginDetail",loginDetail);
    try {
      const result:Boolean = await this.adminsService.checkLogin(loginDetail)
      if (result) {
        return res.status(200).json({
          result:true
        })
      }else{
        throw result
      }
    } catch (error) {
      return res.status(214).json({
        result:false
      })
    }
  }

  @Get('get-users')
  async getUsers(@Res() res:Response){
    try {
      const result = await this.adminsService.getUsers()
      return res.status(200).json({
        data:result
      })
    } catch (error) {
      return res.status(413).json({
        data:error
      })
    }
  }

  @Patch('user-status')
  async changeUserStatus(@Body() user:{userId:number,userStatus:boolean},@Res() res:Response){
    try {
      const result = await this.adminsService.updateUserStatus(user)
      return res.status(200).json({
        message:'Cập nhật trạng thái thành công'
      })
    } catch (error) {
      return res.status(214).json({
        message:'Cập nhật trạng thái thất bại'
      })
    }
  }
  
  @Patch('reset-pass')
  async resetPW(@Body() body:{userId:string}, @Res() res:Response){
    try {
      const result = await this.adminsService.resetPW(body.userId)
      if (result.data) {
        this.mailerSvc.sendMail(result.data.email,'Khôi phục mật khẩu',resetPWTemplate.resetPWNotify(result.data.email,result.newPasswords))
        return res.status(200).json({
          message:'Mật khẩu khôi phục thành công',
          data:result.data
        })
      }else{
        return res.status(214).json({
          message:'Mật khẩu khôi phục thất bại',
        })
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message:'Lỗi mạng'
      })
    }
  }
}
