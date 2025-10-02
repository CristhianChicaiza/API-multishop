import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ required: true })
  codigo: string;
  @ApiProperty({ required: true })
  prenda: string;
  @ApiProperty({ required: true })
  marca: string;
  @ApiProperty({ required: true })
  genero: string;
  @ApiProperty({ required: true })
  precio: number;
  np;
  @ApiProperty({ required: true })
  cantidad: number;
}
