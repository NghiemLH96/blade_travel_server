import { Injectable } from '@nestjs/common';
import PrismaService from '../prisma/prisma.service';
import { hashSync } from 'bcrypt';

@Injectable()
export class AdminsUsersService {
    constructor(private readonly prisma: PrismaService) { }

  async getUsers(currentPage:number,pageSize:number) {
    try {
      const skipItem = (currentPage-1)*pageSize
      const takeItem = pageSize
      const count = await this.prisma.users.count({})
      const result = await this.prisma.users.findMany({
        skip:skipItem,
        take:takeItem
      })
      return {
        data:result,
        totalItem:count
      }
    } catch (error) {
      return error
    }
  }

  async updateUserStatus(user: { userId: number, userStatus: boolean }) {
    try {
      const result = await this.prisma.users.update({
        where: {
          id: Number(user.userId)
        },
        data: {
          status: !user.userStatus,
          updateAt: String(Date.now())
        }
      })
      return true
    } catch (error) {
      console.log(error);
      return false
    }
  }

  async resetPW(userId: number) {
    try {
      const newPasswords = String(Math.ceil(Math.random() * Date.now()));
      const result = await this.prisma.users.update({
        where: {
          id: userId
        },
        data: {
          password: hashSync(newPasswords, 2),
          updateAt: String(Date.now())
        }
      })

      return {
        data: result,
        newPasswords
      }
    } catch (error) {
      console.log(error);
      return { error }
    }
  }

  async updatePhoneNo(user: { userId: number, newPhoneNo: string }) {
    try {
      const checkExist = await this.prisma.users.findFirst({
        where: {
          phone: user.newPhoneNo
        }
      })
      if (checkExist) {
        return {
          result: false,
          message: 'Số điện thoại đã tồn tại!'
        }
      } else {
        const result = await this.prisma.users.update({
          where: {
            id: user.userId
          },
          data: {
            phone: user.newPhoneNo,
            updateAt: String(Date.now())
          }
        })
        return {
          result: true,
          message: 'Cập nhật số điện thoại thành công'
        }
      }
    } catch (error) {
      console.log(error);
      return { error }
    }
  }

  //Tìm kiếm theo chỉ định
  async search(searchOption:{status: boolean | null, email: string, phone: string, currentPage: number, pageSize: number} ){
    try {
      const result = await this.prisma.users.findMany({
        skip:(searchOption.currentPage-1)*searchOption.pageSize,
        take:searchOption.pageSize,
        where:{
          AND:[
            {status:searchOption.status == null ? {} : searchOption.status},
            {email:{
              contains:searchOption.email
            }},
            {phone:{
              contains:searchOption.phone
            }}
          ]
        }
      })
      const count = await this.prisma.users.count({
        where:{
          AND:[
            {status:searchOption.status == null ? {} : searchOption.status},
            {email:{
              contains:searchOption.email
            }},
            {phone:{
              contains:searchOption.phone
            }}
          ]
        }
      })
      return {
        message:'Tìm kiếm thành công',
        data:result,
        totalItem:count
      }
    } catch (error) {
      console.log("tìm kiếm theo trạng thái lỗi"), error;
      return {error}
    }
  }
}
