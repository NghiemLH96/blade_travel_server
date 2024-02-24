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
      console.log('id', userId);

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
  async searchByStatus(status:boolean,currentPage:number,pageSize:number){
    try {
      const result = await this.prisma.users.findMany({
        skip:(currentPage-1)*pageSize,
        take:pageSize,
        where:{
          status:status
        }
      })
      const count = await this.prisma.users.count({
        where:{
          status:status
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

  async searchByEmail(email:string,currentPage:number,pageSize:number){
    try {
      const result = await this.prisma.users.findMany({
        where:{
          email:{contains:email}
        },
        skip:(currentPage-1)*pageSize,
        take:pageSize
      })
      const count = await this.prisma.users.count({
        where:{
          email:{contains:email}
        }
      })
      return {
        message:'Tìm kiếm thành công',
        data:result,
        totalItem:count
      }
    } catch (error) {
      console.log("tìm kiếm theo hộp thư lỗi"), error;
      return {error}
    }
  }

  async searchByPhone(phone:string,currentPage:number,pageSize:number){
    try {
      const result = await this.prisma.users.findMany({
        skip:(currentPage-1)*pageSize,
        take:pageSize,
        where:{
          phone:{contains:phone}
        }
      })
      const count = await this.prisma.users.count({
        where:{
          phone:{contains:phone}
        }
      })
      return {
        message:'Tìm kiếm thành công',
        data:result,
        totalItem:count
      }
    } catch (error) {
      console.log("tìm kiếm theo số điện thoại lỗi"), error;
      return {error}
    }
  }

  async searchByStatusEmail(status:boolean,email:string,currentPage:number,pageSize:number){
    try {
      const result = await this.prisma.users.findMany({
        skip:(currentPage-1)*pageSize,
        take:pageSize,
        where:{
          status:status,
          email:{contains:email}
      }
      })
      const count = await this.prisma.users.count({
        where:{
            status:status,
            email:{contains:email}
        }
      })
      return {
        message:'Tìm kiếm thành công',
        data:result,
        totalItem:count
      }
    } catch (error) {
      console.log("tìm kiếm theo trạng thái vào hộp thư lỗi"), error;
      return {error}
    }
  }

  async searchByStatusPhone(status:boolean,phone:string,currentPage:number,pageSize:number){
    try {
      const result = await this.prisma.users.findMany({
        skip:(currentPage-1)*pageSize,
        take:pageSize,
        where:{
          status:status,
          phone:{contains:phone}
      }
      })
      const count = await this.prisma.users.count({
        where:{
            status:status,
            phone:{contains:phone}
        }
      })
      return {
        message:'Tìm kiếm thành công',
        data:result,
        totalItem:count
      }
    } catch (error) {
      console.log("tìm kiếm theo trạng thái và số điện thoại lỗi"), error;
      return {error}
    }
  }

  async searchByPhoneEmail(email:string,phone:string,currentPage:number,pageSize:number){
    try {
      const result = await this.prisma.users.findMany({
        skip:(currentPage-1)*pageSize,
        take:pageSize,
        where:{
            email:{
              contains:email
            },
            phone:{
              contains:phone
            }
        }
      })
      const count = await this.prisma.users.count({
        where:{
          email:{
            contains:email
          },
          phone:{
            contains:phone
          }
      }
      })
      return {
        message:'Tìm kiếm thành công',
        data:result,
        totalItem:count
      }
    } catch (error) {
      console.log("tìm kiếm theo hộp thư và số điện thoại lỗi"), error;
      return {error}
    }
  }
  
  async searchByStatusPhoneEmail(status:boolean,email:string,phone:string,currentPage:number,pageSize:number){
    try {
      console.log(email);
      
      const result = await this.prisma.users.findMany({
        skip:(currentPage-1)*pageSize,
        take:pageSize,
        where:{
          status:status,
          email:{
            contains:email
          },
          phone:{
            contains:phone
          }
      }
      })

      const count = await this.prisma.users.count({
        where:{
            status:status,
            email:{
              contains:email
            },
            phone:{
              contains:phone
            }
        }
      })
      console.log('result' , result);
      
      return {
        message:'Tìm kiếm thành công',
        data:result,
        totalItem:count
      }
    } catch (error) {
      console.log("tìm kiếm theo tất cả lỗi"), error;
      return {error}
    }
  }
}
