import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';  // Import ConfigModule

import { UserController } from './user.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  ConfigModule.forRoot(),

  JwtModule.register({
    secret: process.env.JWT_SECRET,  // Ensure you have a JWT secret in your environment
    signOptions: { expiresIn: '1h' },  // Optional expiration time for the JWT token
  })],
  controllers: [UserController],
  providers: [UserService,AuthService]
})
export class UserModule {}
