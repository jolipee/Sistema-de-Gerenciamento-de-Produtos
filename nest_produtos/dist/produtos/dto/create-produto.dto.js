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
exports.CreateProdutoDto = void 0;
const class_validator_1 = require("class-validator");
const class_sanitizer_1 = require("class-sanitizer");
const class_validator_2 = require("class-validator");
class CreateProdutoDto {
    nome;
    preco;
    emailEmpresa;
    dataValidade;
    categoriaId;
}
exports.CreateProdutoDto = CreateProdutoDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_sanitizer_1.Trim)(),
    (0, class_validator_2.Length)(3, 100),
    __metadata("design:type", String)
], CreateProdutoDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.01),
    __metadata("design:type", Number)
], CreateProdutoDto.prototype, "preco", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateProdutoDto.prototype, "emailEmpresa", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateProdutoDto.prototype, "dataValidade", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateProdutoDto.prototype, "categoriaId", void 0);
//# sourceMappingURL=create-produto.dto.js.map