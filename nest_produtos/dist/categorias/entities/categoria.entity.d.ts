import { Produto } from 'src/produtos/entities/produto.entity';
export declare class Categoria {
    id: number;
    nome: string;
    ativa: boolean;
    produtos: Produto[];
}
