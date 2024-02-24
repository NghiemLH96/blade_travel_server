import { Test, TestingModule } from '@nestjs/testing';
import { AdminsProductsService } from './admins-products.service';

describe('AdminsProductsService', () => {
  let service: AdminsProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminsProductsService],
    }).compile();

    service = module.get<AdminsProductsService>(AdminsProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
