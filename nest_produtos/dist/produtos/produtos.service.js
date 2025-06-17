"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const produto_entity_1 = require("./entities/produto.entity");
const categoria_entity_1 = require("../categorias/entities/categoria.entity");
let ProdutosService = class ProdutosService {
    produtoRepository;
    categoriaRepository;
    constructor(produtoRepository, categoriaRepository) {
        this.produtoRepository = produtoRepository;
        this.categoriaRepository = categoriaRepository;
    }
    async create(createProdutoDto) {
        const categoria = await this.categoriaRepository.findOne({
            where: { id: createProdutoDto.categoriaId },
        });
        if (!categoria) {
            throw new common_1.NotFoundException(`Categoria com id ${createProdutoDto.categoriaId} não encontrada`);
        }
        const produto = this.produtoRepository.create({
            ...createProdutoDto,
            categoria,
        });
        return this.produtoRepository.save(produto);
    }
    async findAll() {
        return await this.produtoRepository.find({ relations: ['categoria'] });
    }
    async paginate(options, nome) {
        const { page, limit } = options;
        const where = nome ? { nome: (0, typeorm_2.Like)(`%${nome}%`) } : {};
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
    async findOne(id) {
        const produto = await this.produtoRepository.findOne({
            where: { id },
            relations: ['categoria']
        });
        if (!produto) {
            throw new common_1.NotFoundException(`Produto com id: ${id} não encontrado`);
        }
        return produto;
    }
    async update(id, updateProdutoDto) {
        const produto = await this.findOne(id);
        if (updateProdutoDto.categoriaId) {
            const categoria = await this.categoriaRepository.findOne({
                where: { id: updateProdutoDto.categoriaId },
            });
            if (!categoria) {
                throw new common_1.NotFoundException(`Categoria com id ${updateProdutoDto.categoriaId} não encontrada`);
            }
            produto.categoria = categoria;
        }
        Object.assign(produto, updateProdutoDto);
        return this.produtoRepository.save(produto);
    }
    async remove(id) {
        const result = await this.produtoRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Produto com id: ${id} não encontrado`);
        }
    }
    async uploadImagem(id, file) {
        const produto = await this.findOne(id);
        produto.imagemUrl = `/uploads/${file.filename}`;
        return this.produtoRepository.save(produto);
    }
};
exports.ProdutosService = ProdutosService;
exports.ProdutosService = ProdutosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(produto_entity_1.Produto)),
    __param(1, (0, typeorm_1.InjectRepository)(categoria_entity_1.Categoria)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProdutosService);
//# sourceMappingURL=produtos.service.js.map