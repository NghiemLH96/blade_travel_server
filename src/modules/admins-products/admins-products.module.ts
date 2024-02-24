import { Module } from '@nestjs/common';
import { AdminsProductsService } from './admins-products.service';
import { AdminsProductsController } from './admins-products.controller';

@Module({
  controllers: [AdminsProductsController],
  providers: [AdminsProductsService],
})
export class AdminsProductsModule {}
