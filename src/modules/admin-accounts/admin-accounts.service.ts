import { Injectable } from '@nestjs/common';
import PrismaService from '../prisma/prisma.service';
import { hashSync } from 'bcrypt';

@Injectable()
export class AdminAccountsService {
    constructor(private readonly prisma:PrismaService){}
    async search(searchOption:{department:number|null , status:boolean|null,username:string, currentPage:number , pageSize:number}){
        try {
            const count = await this.prisma.admins.count({
                where:{
                    AND:[
                        {username:{
                            contains:searchOption.username
                        }},
                        {status:searchOption.status == null ? {} : searchOption.status},
                        {department:searchOption.department == null ? {not:1} : searchOption.department}
                    ]
                }
            })
            const result = await this.prisma.admins.findMany({
                where:{
                    AND:[
                        {username:{
                            contains:searchOption.username
                        }},
                        {status:searchOption.status == null ? {} : searchOption.status},
                        {department:searchOption.department == null ? {not:1} : searchOption.department}
                    ]
                },
                include:{
                    FK_admins_departments:true
                },
                skip:(searchOption.currentPage-1)*searchOption.pageSize,
                take:searchOption.pageSize
            })
              return {
                message:'lấy dữ liệu thành công',
                data:result,
                count
              }
        } catch (error) {
            console.log("err2",error);
            
            return {error}
        }
    }

    async changeStatus(adminDetail:{id:number,status:boolean}){
        console.log(adminDetail);
        
        try {
            const result = await this.prisma.admins.update({
                where:{
                    id:adminDetail.id
                },
                data:{
                    status:!adminDetail.status,
                    updateAt:String(Date.now())
                }
            })
            return {
                message:'Thay đổi trạng thái thành công'
            }
        } catch (error) {
            console.log(error);
            
            return {
                message:'Thay đổi trạng thái thất bại',
                error
            }
        }
    }

    async changeDepartment(editDetail:{id:number,department:number}){
        try {
                await this.prisma.admins.update({
                where:{
                    id:editDetail.id
                },
                data:{
                    department:editDetail.department,
                    updateAt:String(Date.now())
                }
            })
            return {
                message:'Thay đổi chức vụ thành công'
            }
        } catch (error) {
            return {
                message:'Thay đổi chức vụ thất bại',
                error
            }
        }
    }

    async getDepartment(){
        try {
            const result = await this.prisma.departments.findMany({
                where:{
                    NOT:{
                        id:1
                    }
                }
            })
            return {
                message:'Lấy dữ liệu thành công',
                data:result
            }
        } catch (error) {
            return {error}
        }
    }

    async createAdmin(newAdminDetail:{username:string,passwords:string,department:number}){
        try {
            const checkExist = await this.prisma.admins.findFirst({
                where:{
                    username:newAdminDetail.username
                }
            })
            
            if (checkExist) {
                return {
                    success:false,
                    message:"Tài khoản admin đã tồn tại"
                }
            }else{
                
                const result = await this.prisma.admins.create({
                    data:{
                        username:newAdminDetail.username,
                        password:hashSync(newAdminDetail.passwords,3),
                        department:newAdminDetail.department,
                        createAt:String(Date.now()),
                        updateAt:String(Date.now())
                    }
                })
                return {
                    success:true,
                    message:"Khởi tạo tài khoản admin thành công"
                }
            }
        } catch (error) {
            console.log(error);
            
            return {error}
        }
    }
}
