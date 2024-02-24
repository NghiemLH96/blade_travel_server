import { Test, TestingModule } from '@nestjs/testing';
import { AdminsUsersService } from './admins-users.service';

describe('AdminsUsersService', () => {
  let service: AdminsUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminsUsersService],
    }).compile();

    service = module.get<AdminsUsersService>(AdminsUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
