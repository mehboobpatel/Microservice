import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user-dto';  // Import LoginUserDto
import { AuthService } from './auth.service';  // Import AuthService

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,  // Inject AuthService
  ) {}

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);  // Use AuthService for login
  }

  @Get('verify/:token')
  async verify(@Param('token') token: string) {
    return await this.userService.verifyUser(token);
  }
}
