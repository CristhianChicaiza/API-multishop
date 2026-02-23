import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ required: true })
  codigo: string;
  @ApiProperty({ required: true })
  image: string;
  @ApiProperty({ required: true })
  prenda: string;
  @ApiProperty({ required: true })
  marca: string;
  @ApiProperty({ required: true })
  categoria: string;
  @ApiProperty({ required: true })
  precio: number;
  @ApiProperty({ required: true })
  cantidad: number;
}
