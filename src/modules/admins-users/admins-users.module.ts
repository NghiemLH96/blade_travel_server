import { Module } from '@nestjs/common';
import { AdminsUsersService } from './admins-users.service';
import { AdminsUsersController } from './admins-users.controller';

@Module({
  controllers: [AdminsUsersController],
  providers: [AdminsUsersService],
})
export class AdminsUsersModule {}
