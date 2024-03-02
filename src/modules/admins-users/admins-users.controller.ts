import { Controller, Post, Body, Res, Patch } from '@nestjs/common';
import { Response } from 'express';
import { mailService, resetPWTemplate } from '../mailer/mailer.service';
import { AdminsUsersService } from './admins-users.service';
import { AdminsService } from '../admins/admins.service';

@Controller('admins-users')
export class AdminsUsersController {
  constructor(private readonly adminsUsersService: AdminsUsersService, private mailerSvc: mailService) { }


  @Post('get-users')
  async getUsers(@Body() body: { currentPage: number, pageSize: number }, @Res() res: Response) {
    try {
      const result = await this.adminsUsersService.getUsers(body.currentPage, body.pageSize)
      return res.status(200).json({
        data: result
      })
    } catch (error) {
      return res.status(413).json({
        data: error
      })
    }
  }

  @Patch('user-status')
  async changeUserStatus(@Body() user: { userId: number, userStatus: boolean }, @Res() res: Response) {
    try {
      const result = await this.adminsUsersService.updateUserStatus(user)
      return res.status(200).json({
        message: 'Cập nhật trạng thái thành công'
      })
    } catch (error) {
      return res.status(214).json({
        message: 'Cập nhật trạng thái thất bại'
      })
    }
  }

  @Patch('reset-pass')
  async resetPW(@Body() body: { userId: number }, @Res() res: Response) {
    try {
      const result = await this.adminsUsersService.resetPW(body.userId)
      if (result.data) {
        this.mailerSvc.sendMail(result.data.email, 'Khôi phục mật khẩu', resetPWTemplate.resetPWNotify(result.data.email, result.newPasswords))
        return res.status(200).json({
          message: 'Mật khẩu khôi phục thành công',
          data: result.data
        })
      } else {
        return res.status(214).json({
          message: 'Mật khẩu khôi phục thất bại',
        })
      }
    } catch (error) {
      console.log(error);
      return res.status(413).json({
        message: 'Lỗi mạng'
      })
    }
  }

  @Patch('update-phone')
  async updatePhoneNo(@Body() body: { userId: number, newPhoneNo: string }, @Res() res: Response) {
    try {
      const result = await this.adminsUsersService.updatePhoneNo(body)
      if (!result.error) {
        if (result.result) {
          return res.status(200).json({
            message: result.message
          })
        } else {
          return res.status(214).json({
            message: result.message
          })
        }
      } else {
        res.status(214).json({
          message: 'Cập nhật thất bại'
        })
      }
    } catch (error) {
      console.log(error);
      res.status(413).json({
        message: 'Lỗi gì đó'
      })
    }
  }

  @Post('users-search')
  async searchByOption(@Body() body: { status: boolean | null, email: string, phone: string, currentPage: number, pageSize: number }, @Res() res: Response) {
    try {
      const result = await this.adminsUsersService.search(body)
      if (!result.error) {
        return res.status(200).json({
          message: result.message,
          data: result.data,
          total: result.totalItem
        })
      }
    } catch (error) {
      console.log(error);

      return res.status(413).json({
        message: 'Lỗi tìm kiếm',
        error
      })
    }
  }
}
