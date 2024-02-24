import { Controller, Post, Body, Res, Patch } from '@nestjs/common';
import { Response } from 'express';
import { mailService, resetPWTemplate } from '../mailer/mailer.service';
import { AdminsUsersService } from './admins-users.service';
import { AdminsService } from '../admins/admins.service';

@Controller('admins-users')
export class AdminsUsersController {
  constructor(private readonly adminsUsersService: AdminsUsersService , private mailerSvc:mailService) {}


  @Post('get-users')
  async getUsers(@Body() body:{currentPage:number,pageSize:number},@Res() res: Response) {
    try {
      const result = await this.adminsUsersService.getUsers(body.currentPage,body.pageSize)
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
      return res.status(500).json({
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
      res.status(500).json({
        message: 'Lỗi gì đó'
      })
    }
  }

  @Post('users-search')
  async searchByOption(@Body() body: { status: boolean | null, email: string | null, phone: string | null, currentPage: number, pageSize: number }, @Res() res: Response) {
    const handleCommand = () => {
      console.log('body',body);
      
          //Tìm kiếm tất cả
          if (body.status == null && body.email == null && body.phone == null) {
            return 1;
          } else {
            //Tìm kiếm bằng 3 điều kiện
            if (body.status != null && body.email != null && body.phone != null) {
              return 2;
            } else {
              //status 0
              if (body.status == null) {
                //email 1 phone 1
                if (body.email != null && body.phone != null) {
                  return 7;
                }else{
                  //status 0 email 0
                  if (body.email == null) {
                    return 3;
                  }
                  //status 0 phone 0
                  if (body.phone == null) {
                    return 4;
                  }
                }
              } else {
                //status 1
                if (body.email == null && body.phone == null) {
                  return 5;
                } else {
                  //status 1 email 1
                  if (body.phone == null) {
                    return 6;
                  }
                  //status 1 phone 1
                  if (body.email == null) {
                    return 8;
                  }
                }
              }
            }
          }
        }
        let result: any;
        let commandKey: number = handleCommand();
        console.log('commandKey',commandKey);
        
        try {
        switch (commandKey) {
          case 1:
            result = await this.adminsUsersService.getUsers(body.currentPage,body.pageSize)
            break;
          case 2:
            result = await this.adminsUsersService.searchByStatusPhoneEmail(body.status, body.email, body.phone, body.currentPage, body.pageSize)
            break;
          case 3:
            result = await this.adminsUsersService.searchByPhone(body.phone, body.currentPage, body.pageSize)
            break;
          case 4:
            result = await this.adminsUsersService.searchByEmail(body.email, body.currentPage, body.pageSize)
            break;
          case 5:
            result = await this.adminsUsersService.searchByStatus(body.status, body.currentPage, body.pageSize)
            break;
          case 6:
            result = await this.adminsUsersService.searchByStatusEmail(body.status, body.email, body.currentPage, body.pageSize)
            break;
          case 7:
            result = await this.adminsUsersService.searchByPhoneEmail(body.email, body.phone, body.currentPage, body.pageSize)
            break;
          case 8:
            result = await this.adminsUsersService.searchByStatusPhone(body.status, body.phone, body.currentPage, body.pageSize)
            break;
          default:
            break;
        }
        console.log(result);
        
        if (!result.error) {
          return res.status(200).json({
            message: result.message,
            data: result.data,
            total: result.totalItem
          })
        } else {
          throw result.error
        }
      } catch (error) {
        console.log(error);
        
        return res.status(500).json({
          message: 'Lỗi tìm kiếm',
          error
        })
      }
    }
}
