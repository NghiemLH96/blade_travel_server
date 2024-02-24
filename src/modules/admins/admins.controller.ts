import { Controller, Post, Body, Res, Param, Get, Patch } from '@nestjs/common';
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

  @Post('get-users')
  async getUsers(@Body() body:{currentPage:number,pageSize:number},@Res() res: Response) {
    try {
      const result = await this.adminsService.getUsers(body.currentPage,body.pageSize)
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
      const result = await this.adminsService.updateUserStatus(user)
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
      const result = await this.adminsService.resetPW(body.userId)
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
      const result = await this.adminsService.updatePhoneNo(body)
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
            result = await this.adminsService.getUsers(body.currentPage,body.pageSize)
            break;
          case 2:
            result = await this.adminsService.searchByStatusPhoneEmail(body.status, body.email, body.phone, body.currentPage, body.pageSize)
            break;
          case 3:
            result = await this.adminsService.searchByPhone(body.phone, body.currentPage, body.pageSize)
            break;
          case 4:
            result = await this.adminsService.searchByEmail(body.email, body.currentPage, body.pageSize)
            break;
          case 5:
            result = await this.adminsService.searchByStatus(body.status, body.currentPage, body.pageSize)
            break;
          case 6:
            result = await this.adminsService.searchByStatusEmail(body.status, body.email, body.currentPage, body.pageSize)
            break;
          case 7:
            result = await this.adminsService.searchByPhoneEmail(body.email, body.phone, body.currentPage, body.pageSize)
            break;
          case 8:
            result = await this.adminsService.searchByStatusPhone(body.status, body.phone, body.currentPage, body.pageSize)
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
