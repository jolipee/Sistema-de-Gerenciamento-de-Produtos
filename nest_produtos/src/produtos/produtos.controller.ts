import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  DefaultValuePipe,
  HttpStatus,
  HttpException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  async create(@Body() createProdutoDto: CreateProdutoDto) {
    try {
      return await this.produtosService.create(createProdutoDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao criar produto',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = file.originalname.split('.').pop();
        cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
      }
    })
  }))
  async uploadFile(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File
  ) {
    try {
      return await this.produtosService.uploadImagem(id, file);
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao fazer upload da imagem',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('nome') nome?: string
  ) {
    try {
      return await this.produtosService.paginate({ page, limit }, nome);
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar produtos',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const produto = await this.produtosService.findOne(id);
      if (!produto) {
        throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
      }
      return produto;
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao buscar produto',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProdutoDto: UpdateProdutoDto
  ) {
    try {
      return await this.produtosService.update(id, updateProdutoDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao atualizar produto',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.produtosService.remove(id);
      return { message: 'Produto removido com sucesso' };
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao remover produto',
        HttpStatus.BAD_REQUEST
      );
    }
  }
}