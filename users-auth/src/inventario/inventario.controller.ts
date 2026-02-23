import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import csv from 'csv-parser';
import { ProductService } from './../product/product.service';
import { Readable } from 'stream';

interface ProductCSV {
  codigo: string;
  image: string;
  prenda: string;
  marca: string;
  categoria: string;
  precio: string;
  cantidad: string;
}

@Controller('prendas')
export class InventarioController {
  constructor(private readonly productService: ProductService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCSV(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No se recibió ningún archivo');
    }

    console.log('🧩 Archivo recibido:', file.originalname);

    const results: ProductCSV[] = [];
    const stream = Readable.from(file.buffer.toString('utf8'));

    return new Promise((resolve, reject) => {
      stream
        .pipe(
          csv({ separator: ';', mapHeaders: ({ header }) => header.trim() }) // limpiar espacios en los headers
        )
        .on('data', (row) => {
          // Limpiar campos y asegurar que codigo tenga valor
          const cleanedRow: ProductCSV = {
            codigo:
              row['codigo']?.trim().replace(/^\uFEFF/, '') ||
              `auto-${Date.now()}-${Math.random()}`,
            image: row['image']?.trim(),
            prenda: row['prenda']?.trim(),
            marca: row['marca']?.trim(),
            categoria: row['categoria']?.trim(),
            precio: row['precio']?.trim(),
            cantidad: row['cantidad']?.trim(),
          };
          console.log('🧾 Fila CSV limpia:', cleanedRow);
          results.push(cleanedRow);
        })
        .on('end', async () => {
          try {
            const productosGuardados = await this.productService.saveProducts(
              results.map((p) => ({
                ...p,
                precio: parseInt(p.precio),
                cantidad: parseInt(p.cantidad),
              })),
            );

            resolve({
              message: '✅ CSV procesado correctamente',
              total: productosGuardados.length,
            });
          } catch (error) {
            console.error('❌ Error al guardar productos:', error);
            reject(error);
          }
        })
        .on('error', (error) => {
          console.error('❌ Error al leer CSV:', error);
          reject(error);
        });
    });
  }
}
