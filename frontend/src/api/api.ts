import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Mude para a URL direta do seu backend
  timeout: 5000,
});

export const getProdutos = async () => {
  try {
    const response = await api.get('/produtos'); // Corrigido para o endpoint correto
    return response.data;
  } catch (error) {
    console.error('Erro na API:', error);
    throw error; // Propague o erro para tratamento no componente
  }
};