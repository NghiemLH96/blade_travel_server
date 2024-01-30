import { Injectable } from '@nestjs/common';
import PrismaService from '../prisma/prisma.service';
import createUserDto from './dto/create_user.dto';
import checkExistUserDto from './dto/checkExist_uset.dto';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private readonly prisma:PrismaService){}
    async createNewUser(newUserDetail:createUserDto){
        try {
            let createResult = await this.prisma.users.create({
                data:{
                    email:newUserDetail.email,
                    password:hashSync(newUserDetail.password,5),
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
                message:"Đăng ký thành công",
                data: createResult
            }
        } catch (error) {
            return {error}
        }
    }

    async check_Exist_Fn(check_Exist:checkExistUserDto){
        try {
            let checkExist = await this.prisma.users.findFirst({
                where:{
                    OR:[
                        {email: check_Exist.email},
                        {phone: check_Exist.phone}
                    ]
                },
            });
            if (checkExist) {
                if(checkExist.email == check_Exist.email){
                    return {
                        message:"email đã tồn tại!",
                        data:checkExist
                    }
                }
    
                if(checkExist.phone == check_Exist.phone){
                    return {
                        message:"số điện thoại đã được đăng ký!",
                        data:checkExist
                    }
                }
            }else{
                return {
                    message:"Thông tin không trùng , có thể sử dụng.",
                    data:checkExist
                }
            }
        } catch (error) {
            console.log(error);
            
            return {error}
        }
    }

    async uploadAvatar( updateData:{id:string, avatar:string} ){
        try {
            console.log(typeof updateData.id);
            await this.prisma.users.update({
                where:{
                    id:Number(updateData.id)
                },
                data:{
                    avatar:updateData.avatar
                }
            })
            return {
                message:"updata avatar successed"
            }
        } catch (error) {
            return {
                error
            }
        }
    }

    async confirmEmail(userEmail:string):Promise<boolean>{
        try {
            await this.prisma.users.update({
                where:{
                    email:userEmail
                },
                data:{
                    email_verify:true
                }
            })
            return true
        } catch (error) {
            return false
        }
    }
}
