import { Test, TestingModule } from '@nestjs/testing';
import { AdminAccountsService } from './admin-accounts.service';

describe('AdminAccountsService', () => {
  let service: AdminAccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminAccountsService],
    }).compile();

    service = module.get<AdminAccountsService>(AdminAccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
