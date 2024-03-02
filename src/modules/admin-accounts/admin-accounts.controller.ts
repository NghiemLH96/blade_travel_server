import { Body, Controller, Get, Patch, Post, Res } from '@nestjs/common';
import { AdminAccountsService } from './admin-accounts.service';
import { Response } from 'express';

@Controller('admin-accounts')
export class AdminAccountsController {
  constructor(private readonly adminAccountsService: AdminAccountsService) { }

  @Post('search')
  async search(@Body() seachOption: {department:number|null, status: boolean | null, username: string, currentPage:number , pageSize:number}, @Res() res: Response) {
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
      console.log("error",error);
      
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
  async changeDepartment(@Body() editDetail:{id:number,department:number},@Res() res:Response){
    try {
      const {message,error} = await this.adminAccountsService.changeDepartment(editDetail)
      return res.status(200).json({
        message
      })
    } catch (error) {
      return res.status(500).json({
        error
      })
    }
  }

  @Get('department')
  async getDepartment(@Res() res:Response){
    try {
      const {message, data , error} = await this.adminAccountsService.getDepartment()
      return res.status(200).json({
        message,
        data
      })
    } catch (error) {
      return res.status(500).json({
        error
      })
    }
  }

  @Post('admin-new')
  async createNewAdmin(@Body() newAdminDetail:{username:string,passwords:string,department:number},@Res() res:Response){
    try {
      const { message, success , error } = await this.adminAccountsService.createAdmin(newAdminDetail)
      if (!success) {
        return res.status(214).json({
          message
        })
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
