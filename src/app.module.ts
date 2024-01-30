import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import PrismaModule from './modules/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { mailModule } from './modules/mailer/mailer.module';
import { tokenModule } from './utils/token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    UsersModule,
    mailModule,
    tokenModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
