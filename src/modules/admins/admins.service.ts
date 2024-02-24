import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import PrismaService from '../prisma/prisma.service';
import { loginAdminDto } from './dto/login-admin.dto';
import { compareSync, hashSync } from 'bcrypt';

@Injectable()
export class AdminsService {
  constructor(private readonly prisma: PrismaService) { }
  async adminLogin(loginDetail: loginAdminDto) {
    try {
      const adminDetail = await this.prisma.admins.findFirst({
        where: {
          username: loginDetail.username
        }
      })

      if (!adminDetail) {
        return {
          message: "Tài khoản quản trị viên không tồn tại!",
          data: null
        }
      } else {
        if (compareSync(loginDetail.password, adminDetail.password)) {
          return {
            message: "Đăng nhập thành công",
            data: adminDetail
          }
        } else {
          return {
            message: "Mật khẩu không chính xác",
            data: null
          }
        }
      }
    } catch (error) {
      return error
    }
  }

  async checkLogin(tokenDetail: loginAdminDto) {
    try {
      const result = this.prisma.admins.findFirst({
        where: {
          AND: [{
            username: tokenDetail.username
          },
          {
            password: tokenDetail.password
          }]
        }
      })
      if (result) {
        return true
      } else {
        throw false
      }
    } catch (error) {
      return false
    }
  }
}
