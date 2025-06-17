import { Categoria } from '../../categorias/entities/categoria.entity';
export declare class Produto {
    id: number;
    nome: string;
    preco: number;
    emailEmpresa: string;
    dataValidade: Date;
    imagemUrl: string;
    categoria: Categoria;
    categoriaId: number;
    createdAt: Date;
    updatedAt: Date;
}
