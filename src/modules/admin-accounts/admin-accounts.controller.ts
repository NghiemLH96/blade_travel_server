import { Body, Controller, Patch, Post, Res } from '@nestjs/common';
import { AdminAccountsService } from './admin-accounts.service';
import { Response } from 'express';
import { adminDep } from '@prisma/client';

@Controller('admin-accounts')
export class AdminAccountsController {
  constructor(private readonly adminAccountsService: AdminAccountsService) { }

  @Post('search')
  async search(@Body() seachOption: { status: boolean | null, username: string, currentPage:number , pageSize:number}, @Res() res: Response) {
    try {
      const {message , data , count , error} = await this.adminAccountsService.search(seachOption)
      if (!error) {
        return res.status(200).json({
          message,
          data,
          count
        })
      }
    } catch (error) {
      return res.status(500).json({
        message:'lấy dữ liệu thất bại',
        error
      })
    }
  }

  @Patch('status')
  async changeStatus(@Body() adminDetail:{id:number,status:boolean},@Res() res:Response){
    try {
      const {message,error} = await this.adminAccountsService.changeStatus(adminDetail)
      if (error) {
        throw error
      }
      return res.status(200).json({
        message
      })
    } catch (error) {
      return res.status(500).json({
        error
      })
    }
  }

  @Patch('department')
  async changeDepartment(@Body() editDetail:{id:number,department:adminDep},@Res() res:Response){
    try {
      const {message,error} = await this.adminAccountsService.changeDepartment(editDetail)
      if (error) {
        throw error
      }
      return res.status(200).json({
        message
      })
    } catch (error) {
      return res.status(500).json({
        error
      })
    }
  }
}
