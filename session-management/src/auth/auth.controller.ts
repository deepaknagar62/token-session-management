/* eslint-disable prettier/prettier */
import { Body, Controller, HttpException, HttpStatus, NotFoundException, Post } from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import * as nodemailer from 'nodemailer';
import * as randomstring from 'randomstring'
import { JwtService } from '@nestjs/jwt';
import { VerifyOtpDto } from './dto/otp.dto';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dhakaddeepak6261@gmail.com',
    pass: 'You dont need to know',
  },
});

const generateOTP = () => {
  return randomstring.generate({
    length: 6,
    charset: 'numeric',
  });
};  

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService, private jwtService: JwtService) {}
  
  @Post('/register')
  async registerUser(@Body() user: User){
    const usr = await this.userService.register(user);
    if(usr){
      return {message:"User rigistered successfully..."}
    }else{
      return {message:"Failed to register..."}
    }
  }


  @Post('/send-otp')
  async getUserByEmail(@Body('email') email: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
        const otp = generateOTP();
    
        
        const mailOptions = {
          from: 'dhakaddeepak6261@gmail.com',
          to: email,
          subject: 'Your OTP for Authantication to login',
          text: `Your OTP is : ${otp}`,
        };
    
        await transporter.sendMail(mailOptions);
    
        
        await this.userService.storeOTP(email, otp);
    
        return { success: true, message: 'OTP sent successfully' };
      } else {
        throw new NotFoundException(`User with email ${email} not found`);
      }
  }


  @Post('/sign')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto): Promise<{ token: string }> {
    const { email, otp } = verifyOtpDto;

    
    const storedOtp = await this.userService.getOTP(email);

   
    if (otp === storedOtp) {
     
      const payload = { email };
      const token = this.jwtService.sign(payload);

      return { token };
    } else {
      throw new HttpException('Incorrect OTP', HttpStatus.BAD_REQUEST);
    }
  }

 

}
