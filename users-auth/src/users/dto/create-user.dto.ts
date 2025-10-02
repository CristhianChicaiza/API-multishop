import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
export class CreateUserDto {
  @ApiProperty({ required: true })
  email: string;
  @ApiProperty({ required: true })
  firstName: string;
  @ApiProperty({ required: false })
  surName: string;
  @ApiProperty({ required: true })
  password: string;
  @ApiProperty({ required: false, default: 'USER' })
  role?: Role = 'USER';
}
