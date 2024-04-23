import { Controller, Post, Body, UnauthorizedException, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Response, response } from 'express';

// added swagger, new endpoints and http cookies response

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({ status: 201, description: 'User has been successfully registered' })
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 201, description: 'User has been successfully logged in' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBody({ type: LoginUserDto })
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) response: Response) {
    const user = await this.userService.validateUser(loginUserDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);
    response.cookie('access_token', access_token, { httpOnly: true });
    return { status: 'success' };
  }
}
