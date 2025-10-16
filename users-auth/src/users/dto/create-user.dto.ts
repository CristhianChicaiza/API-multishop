import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  firstName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  surName?: string;

  @ApiProperty({ required: true })
  @IsString()
  @MinLength(6)
  password: string;

@ApiProperty({ required: false, enum: Role, default: Role.user })
@IsOptional()
@Transform(({ value }) => value?.toLowerCase())
@IsEnum(Role)
role?: Role;

}