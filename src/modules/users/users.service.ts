import { Injectable } from '@nestjs/common';
import PrismaService from '../prisma/prisma.service';
import createUserDto from './dto/create_user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma:PrismaService){}
    async createNewUser(newUserDetail:createUserDto){
        try {
            let createResult = await this.prisma.users.create({
                data:{
                    email:newUserDetail.email,
                    password:newUserDetail.password,
                    phone:newUserDetail.phone,
                    createAt:String(Date.now()),
                    updateAt:String(Date.now()),
                    avatar:newUserDetail.avatar
                }
            })
            if (createResult) {
                let createIpResult = await this.prisma.user_IPs.create({
                    data:{
                        userID:createResult.id,
                        ip:newUserDetail.ip
                    }
                })
            }
            return {
                message:"Đăng ký thành công"
            }
        } catch (error) {
            return {error}
        }
    }

    async check_Exist_Fn(check_Exist:{email:string , phone:string}){
        try {
            let checkEmail = await this.prisma.users.findUnique({
                where:{
                    email:check_Exist.email
                }
            })
            if (checkEmail) {
                return {data : checkEmail}
            }else{
                let checkPhone = await this.prisma.users.findUnique({
                    where:{
                        phone:check_Exist.phone
                    }
                })
                if (checkPhone) {
                    return {data : checkPhone}
                }
            }
            return {data:null}
        } catch (error) {
            return error
        }
    }
}
