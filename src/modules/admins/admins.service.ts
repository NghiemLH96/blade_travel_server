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
      const result = await this.prisma.admins.findFirst({
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
        return {
          result:true,
          data:result
        }
      } else {
        return {
          result:false,
        }
      }
    } catch (error) {
      return {
        result:false,
        error
      }
    }
  }

  async record(info:{id:number,content:string,operator:string}){
    try {
      await this.prisma.record.create({
        data:{
          operatorId:info.id,
          operator:info.operator,
          operateAt:String(Date.now()),
          operateContent:info.content
        }
      })
      return {
        message:'Tạo ghi nhớ thành công'
      }
    } catch (error) {
      return {
        error
      }
    }
  }

  async getRecord(query:{operator:string,current:number,size:number}){
    try {
      const count = await this.prisma.record.count({
        where:{
          operator:{
            contains:query.operator
          }
        }
      })

      const result = await this.prisma.record.findMany({
        where:{
          operator:{
            contains:query.operator
          }
        },
        skip:(Number(query.current)-1)*Number(query.size),
        take:Number(query.size)
      })
      return {
        message:"Lấy dữ liệu thành công",
        total:count,
        data:result
      }
    } catch (error) {
      return {error}
    }
  }
}
