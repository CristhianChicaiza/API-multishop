import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(user: LoginDto): Promise<{
    token: string;
    user: {
      email: string;
      role: Role;
      firstName: string;
      surName: string;
    };
  }> {
 const foundUser = await this.prisma.user.findUnique({
  where: { email: user.email },
});
if (!foundUser || !foundUser.password) {
  throw new UnauthorizedException('Credenciales inválidas');
}


let isPasswordValid = false;
try {
  isPasswordValid = await bcrypt.compare(user.password, foundUser.password);
} catch (err) {
  console.error('Error al comparar contraseñas:', err.message);
  throw new HttpException('Error interno en login', HttpStatus.INTERNAL_SERVER_ERROR);
}

if (!isPasswordValid) {
  throw new UnauthorizedException('Credenciales inválidas');
}


    const token = this.jwtService.sign({
      sub: foundUser.id,
      email: foundUser.email,
      role: foundUser.role,
    });

    return {
      token,
      user: {
        email: foundUser.email,
        role: foundUser.role,
        firstName: foundUser.firstName ?? '',
        surName: foundUser.surName ?? '',
      },
    };
  }
}