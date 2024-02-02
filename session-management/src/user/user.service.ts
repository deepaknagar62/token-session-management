/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}


  async register(user: User): Promise<string> {
    const u = await this.usersRepository.save(user);
    if(u){
      return "User registered successfully...."
    }else{
      return "Failed to register...."
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async storeOTP(email: string, otp: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (user) {
      user.otp = otp;
      await this.usersRepository.save(user);
    } else {
      throw new NotFoundException(`User with email ${email} not found`);
    }
  }


  async getOTP(email: string): Promise<string | undefined> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (user) {
      return user.otp;
    } else {
      throw new NotFoundException(`User with email ${email} not found`);
    }
  }

  
}
