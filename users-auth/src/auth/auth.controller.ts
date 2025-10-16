import {
  Body,
  Controller,
  HttpStatus,
  HttpException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    try {
      const { token, user } = await this.authService.validateUser(data);
      return { success: true, token, user };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      console.error('Error interno en login1:', error.message, error.stack);

      console.error('Error interno en login:', error);
      throw new HttpException('Error interno en login', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}