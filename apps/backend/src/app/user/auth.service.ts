import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { LoginUserDto } from '../user/dto/login-user-dto'; // Import LoginUserDto
import { ConfigService } from '@nestjs/config';  // Import ConfigService

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,  // Inject JwtService for token generation
    private configService: ConfigService,  // Inject ConfigService to access environment variables
  ) {}

  // Method to verify user login credentials
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  
    if (!user.verified) {
      throw new HttpException('User is not verified. Please verify your email first.', HttpStatus.FORBIDDEN);
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }
  
    return user;
  }

  // Method to log in and return a JWT token
  async login(loginUserDto: LoginUserDto): Promise<{ access_token: string,user:string }> {
    const user = await this.validateUser(loginUserDto.email, loginUserDto.password);

    const payload = { email: user.email, sub: user.id };  // JWT payload
    const secretKey = this.configService.get<string>('JWT_SECRET');  // Get the JWT_SECRET from environment variables

    if (!secretKey) {
      throw new Error('JWT_SECRET is not defined');
    }

    const access_token = this.jwtService.sign(payload, { secret: secretKey });  // Generate JWT token with secret

    return { access_token:access_token,user:user.name  };
  }
}
