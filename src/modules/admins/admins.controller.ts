import { Controller, Post, Body, Res, Patch, Get, Query } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { loginAdminDto } from './dto/login-admin.dto';
import { Response } from 'express';
import { tokenService } from 'src/utils/token/token.service';
import { mailService, resetPWTemplate } from '../mailer/mailer.service';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService, private tokenSrc: tokenService, private mailerSvc: mailService) { }
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
        } else {
          return res.status(200).json({
            message,
            data,
            token: this.tokenSrc.createToken(data, "1d")
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
  async checkLogin(@Body() body: { token: string }, @Res() res: Response) {
    const loginDetail = this.tokenSrc.verify(body.token)
    try {
      const {result , data , error} = await this.adminsService.checkLogin(loginDetail)
      if (!error) {
        if (result) {
          return res.status(200).json({
            message:"Tài khoản đã đang nhập!",
            result,
            data
          })
        } else {
          return res.status(213).json({
            result: false
          })
        }
      }else{
        throw error
      }
    } catch (error) {
      return res.status(214).json({
        result: false
      })
    }
  }

  @Post('record')
  async record(@Body() body:{id:number,content:string,operator:string},@Res() res:Response){
    try {
      const {message,error} = await this.adminsService.record(body)
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
  
  @Get('record')
  async getRecord(@Query() query:{operator:string,current:number,size:number},@Res() res: Response){
    try {
      console.log(query);
      
      const {message , data ,total , error} = await this.adminsService.getRecord(query)
      if (error) {
        throw error
      }else{
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
  }
