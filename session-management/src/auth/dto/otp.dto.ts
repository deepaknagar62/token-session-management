/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyOtpDto {
    @IsNotEmpty()
    @IsString()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    otp: string;
  }