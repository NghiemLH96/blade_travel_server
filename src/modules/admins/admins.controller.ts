import { Controller, Post, Body, Res, Patch } from '@nestjs/common';
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
    console.log("loginDetail", loginDetail);
    try {
      const result: Boolean = await this.adminsService.checkLogin(loginDetail)
      if (result) {
        return res.status(200).json({
          result: true
        })
      } else {
        throw result
      }
    } catch (error) {
      return res.status(214).json({
        result: false
      })
    }
  }
  }
