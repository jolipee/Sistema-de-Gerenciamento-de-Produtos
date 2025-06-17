import { useEffect, useState } from 'react';
import { getProdutos } from '../api/api';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  categoria: {
    nome: string;
  };
}

function ProdutosList() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        setLoading(true);
        const response = await getProdutos();
        
        if (!Array.isArray(response.data)) {
          throw new Error('Formato de dados inválido');
        }
        
        setProdutos(response.data);
        setError(null);
      } catch (err: unknown) { // Tipo explícito como unknown
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Ocorreu um erro desconhecido');
        }
        console.error('Erro:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (produtos.length === 0) return <div>Nenhum produto encontrado</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Produtos</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {produtos.map((produto) => (
          <li key={produto.id} style={{
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}>
            <strong>{produto.nome}</strong>
            <div>Preço: R$ {produto.preco.toFixed(2)}</div>
            <div>Categoria: {produto.categoria?.nome || 'Sem categoria'}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProdutosList;