import { Repository } from 'typeorm';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';
import { Categoria } from '../categorias/entities/categoria.entity';
import { PaginateDto } from './dto/paginate.dto';
import { PaginatedResult } from './interfaces/paginated-result.interface';
export declare class ProdutosService {
    private produtoRepository;
    private categoriaRepository;
    constructor(produtoRepository: Repository<Produto>, categoriaRepository: Repository<Categoria>);
    create(createProdutoDto: CreateProdutoDto): Promise<Produto>;
    findAll(): Promise<Produto[]>;
    paginate(options: PaginateDto, nome?: string): Promise<PaginatedResult<Produto>>;
    findOne(id: number): Promise<Produto>;
    update(id: number, updateProdutoDto: UpdateProdutoDto): Promise<Produto>;
    remove(id: number): Promise<void>;
    uploadImagem(id: number, file: Express.Multer.File): Promise<Produto>;
}
