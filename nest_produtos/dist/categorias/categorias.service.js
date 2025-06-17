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
exports.CategoriasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const categoria_entity_1 = require("./entities/categoria.entity");
let CategoriasService = class CategoriasService {
    categoriaRepository;
    constructor(categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }
    async create(createCategoriaDto) {
        const { nome } = createCategoriaDto;
        const categoriaExistente = await this.categoriaRepository.findOne({ where: { nome } });
        if (categoriaExistente) {
            throw new common_1.ConflictException(`Categoria com nome "${nome}" já existe`);
        }
        const categoria = this.categoriaRepository.create({
            ...createCategoriaDto,
            ativa: createCategoriaDto.ativa ?? true,
        });
        return this.categoriaRepository.save(categoria);
    }
    async findAll() {
        return this.categoriaRepository.find({
            relations: ['produtos'],
        });
    }
    async findOne(id) {
        const categoria = await this.categoriaRepository.findOne({
            where: { id },
            relations: ['produtos'],
        });
        if (!categoria) {
            throw new common_1.NotFoundException(`Categoria com ID ${id} não encontrada`);
        }
        return categoria;
    }
    async update(id, updateCategoriaDto) {
        const categoria = await this.findOne(id);
        if (updateCategoriaDto.nome && updateCategoriaDto.nome !== categoria.nome) {
            const categoriaExistente = await this.categoriaRepository.findOne({ where: { nome: updateCategoriaDto.nome },
            });
            if (categoriaExistente) {
                throw new common_1.ConflictException(`Categoria com nome "${updateCategoriaDto.nome}"já existe`);
            }
        }
        Object.assign(categoria, updateCategoriaDto);
        return this.categoriaRepository.save(categoria);
    }
    async remove(id) {
        const categoria = await this.findOne(id);
        if (categoria.produtos && categoria.produtos.length > 0) {
            throw new common_1.ConflictException('Não é possível excluir uma categoria com produtos associados');
        }
        await this.categoriaRepository.delete(id);
    }
};
exports.CategoriasService = CategoriasService;
exports.CategoriasService = CategoriasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(categoria_entity_1.Categoria)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriasService);
//# sourceMappingURL=categorias.service.js.map