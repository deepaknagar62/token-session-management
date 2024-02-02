/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UserModule ,
    JwtModule.register({
      global: true,
      secret: 'thisisthejwtkey9977',
      signOptions: { expiresIn: '60s' },
    }),],
})
export class AuthModule {}
