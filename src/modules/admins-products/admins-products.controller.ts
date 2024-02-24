import { Controller } from '@nestjs/common';
import { AdminsProductsService } from './admins-products.service';

@Controller('admins-products')
export class AdminsProductsController {
  constructor(private readonly adminsProductsService: AdminsProductsService) {}
}
