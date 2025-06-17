import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between } from 'typeorm';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';
import { Categoria } from '../categorias/entities/categoria.entity';
import { PaginateDto } from './dto/paginate.dto';
import { PaginatedResult } from './interfaces/paginated-result.interface';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id: createProdutoDto.categoriaId },
    });

    if (!categoria) {
      throw new NotFoundException(`Categoria com id ${createProdutoDto.categoriaId} não encontrada`);
    }

    const produto = this.produtoRepository.create({
      ...createProdutoDto,
      categoria,
    });

    return this.produtoRepository.save(produto);
  }

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({ relations: ['categoria'] });
  }

  async paginate(options: PaginateDto, nome?: string): Promise<PaginatedResult<Produto>> {
    const { page, limit } = options;
    const where = nome ? { nome: Like(`%${nome}%`) } : {};
    
    const [result, total] = await this.produtoRepository.findAndCount({
      where,
      relations: ['categoria'],
      take: limit,
      skip: (page - 1) * limit,
      order: { id: 'ASC' }
    });

    return {
      data: result,
      totalItems: total,
      itemsPerPage: limit,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({ 
      where: { id },
      relations: ['categoria']
    });
    
    if (!produto) {
      throw new NotFoundException(`Produto com id: ${id} não encontrado`);
    }
    return produto;
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto): Promise<Produto> {
    const produto = await this.findOne(id);
    
    if (updateProdutoDto.categoriaId) {
      const categoria = await this.categoriaRepository.findOne({
        where: { id: updateProdutoDto.categoriaId },
      });
      
      if (!categoria) {
        throw new NotFoundException(`Categoria com id ${updateProdutoDto.categoriaId} não encontrada`);
      }
      produto.categoria = categoria;
    }

    Object.assign(produto, updateProdutoDto);
    return this.produtoRepository.save(produto);
  }

  async remove(id: number): Promise<void> {
    const result = await this.produtoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Produto com id: ${id} não encontrado`);
    }
  }

  async uploadImagem(id: number, file: Express.Multer.File): Promise<Produto> {
    const produto = await this.findOne(id);
    produto.imagemUrl = `/uploads/${file.filename}`;
    return this.produtoRepository.save(produto);
  }
}