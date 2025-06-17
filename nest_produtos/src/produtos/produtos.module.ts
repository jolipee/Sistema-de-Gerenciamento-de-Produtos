import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { Produto } from './entities/produto.entity';
import { CategoriasModule } from '../categorias/categorias.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Produto]),
    CategoriasModule, 
  ],
  controllers: [ProdutosController],
  providers: [ProdutosService],
})
export class ProdutosModule {}