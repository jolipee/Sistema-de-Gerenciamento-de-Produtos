import { IsNotEmpty, IsNumber, IsEmail, IsDateString, IsOptional, Min, Max } from 'class-validator';
import { Trim } from 'class-sanitizer';
import {Length} from "class-validator"

export class CreateProdutoDto {
  @IsNotEmpty()
  @Trim()
 @Length(3, 100)
  nome: string;

  @IsNumber()
  @Min(0.01)
  preco: number;

  @IsEmail()
  emailEmpresa: string;

  @IsDateString()
  dataValidade: string;

  @IsNumber()
  @IsOptional()
  categoriaId?: number;
}