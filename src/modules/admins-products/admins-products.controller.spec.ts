import { Test, TestingModule } from '@nestjs/testing';
import { AdminsProductsController } from './admins-products.controller';
import { AdminsProductsService } from './admins-products.service';

describe('AdminsProductsController', () => {
  let controller: AdminsProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminsProductsController],
      providers: [AdminsProductsService],
    }).compile();

    controller = module.get<AdminsProductsController>(AdminsProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
