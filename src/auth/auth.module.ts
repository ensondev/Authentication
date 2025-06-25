import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseService } from 'src/database/database.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [AuthController],
  providers: [AuthService, DatabaseService, AuthGuard, {provide: APP_GUARD, useClass: AuthGuard}],
  imports: [
    ConfigModule.forRoot({
          isGlobal: true,
        }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ]
})
export class AuthModule {}
