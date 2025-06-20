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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categoria = void 0;
const produto_entity_1 = require("../../produtos/entities/produto.entity");
const typeorm_1 = require("typeorm");
let Categoria = class Categoria {
    id;
    nome;
    ativa;
    produtos;
};
exports.Categoria = Categoria;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Categoria.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Categoria.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Categoria.prototype, "ativa", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => produto_entity_1.Produto, (produto) => produto.categoria),
    __metadata("design:type", Array)
], Categoria.prototype, "produtos", void 0);
exports.Categoria = Categoria = __decorate([
    (0, typeorm_1.Entity)()
], Categoria);
//# sourceMappingURL=categoria.entity.js.map