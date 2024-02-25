import { Injectable } from '@nestjs/common';
import PrismaService from '../prisma/prisma.service';
import { adminDep } from '@prisma/client';

enum departmentInterface{
    specialist,
    manager,
    director
}

@Injectable()
export class AdminAccountsService {
    constructor(private readonly prisma:PrismaService){}
    async search(searchOption:{status:boolean|null,username:string, currentPage:number , pageSize:number}){
        try {
            const count = await this.prisma.admins.count({
                where:{
                    AND:[
                        {username:{
                            contains:searchOption.username
                        }},
                        {status:searchOption.status == null ? {} : searchOption.status}
                    ]
                },
                skip:(searchOption.currentPage-1)*searchOption.pageSize,
                take:searchOption.pageSize
            })
            const result = await this.prisma.admins.findMany({
                where:{
                    AND:[
                        {username:{
                            contains:searchOption.username
                        }},
                        {status:searchOption.status == null ? {} : searchOption.status}
                    ]
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
            return {error}
        }
    }

    async changeStatus(adminDetail:{id:number,status:boolean}){
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
            return {
                message:'Thay đổi trạng thái thất bại',
                error
            }
        }
    }

    async changeDepartment(editDetail:{id:number,department:adminDep}){
        try {
            const result = await this.prisma.admins.update({
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
}
