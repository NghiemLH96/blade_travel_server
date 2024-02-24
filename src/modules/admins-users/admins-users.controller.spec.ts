import { Test, TestingModule } from '@nestjs/testing';
import { AdminsUsersController } from './admins-users.controller';
import { AdminsUsersService } from './admins-users.service';

describe('AdminsUsersController', () => {
  let controller: AdminsUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminsUsersController],
      providers: [AdminsUsersService],
    }).compile();

    controller = module.get<AdminsUsersController>(AdminsUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
