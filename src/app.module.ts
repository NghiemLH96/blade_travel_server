import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import PrismaModule from './modules/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { mailModule } from './modules/mailer/mailer.module';
import { tokenModule } from './utils/token/token.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AdminsModule } from './modules/admins/admins.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: 'public',
    }),
    PrismaModule,
    UsersModule,
    mailModule,
    tokenModule,
    AdminsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
