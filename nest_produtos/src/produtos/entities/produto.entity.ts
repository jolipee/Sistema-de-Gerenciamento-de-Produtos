import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn 
} from 'typeorm';
import { Categoria } from '../../categorias/entities/categoria.entity';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column('decimal', { precision: 10, scale: 2 })
  preco: number;

  @Column()
  emailEmpresa: string;

  @Column()
  dataValidade: Date;

  @Column({ nullable: true })
  imagemUrl: string;

  @ManyToOne(() => Categoria, categoria => categoria.produtos)
  @JoinColumn({ name: 'categoriaId' })
  categoria: Categoria;

  @Column()
  categoriaId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}