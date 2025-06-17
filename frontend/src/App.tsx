import React from 'react';
import ProdutosList from './components/ProdutosList';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Meu Sistema de Produtos</h1>
      </header>
      <main>
        <ProdutosList />
      </main>
    </div>
  );
}

export default App;