#  NYT Books Explorer

Aplicação desenvolvida para explorar dados da API pública do New York Times (Books API). A interface permite visualizar e interagir com listas de gêneros literários e livros mais vendidos, com funcionalidades de busca, paginação, exibição em diferentes layouts e gerenciamento de favoritos. O layout foi seguido conforme o protótipo fornecido no Figma.

## Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [React Router DOM](https://reactrouter.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/) (para o setup do projeto)
- [Vercel](https://vercel.com/) (para deploy)

##  Link para o projeto

👉 [Acesse a aplicação aqui](https://nyt-books-alpha.vercel.app) <!-- substitua pelo seu link do Vercel -->

## Funcionalidades Implementadas

### Página Principal (Listas de Gêneros)
- Integração com o endpoint [`/lists/names.json`](https://api.nytimes.com/svc/books/v3/lists/names.json)
- Paginação dinâmica (5 itens por página)
- Filtro por nome em tempo real
- Alternância entre exibição em cards ou lista
- Cada item exibe:
  - Nome da lista
  - Frequência de atualização
  - Data da primeira e última publicação
  - Link para visualização dos livros daquele gênero

### Página Interna de Gênero (Listagem de Livros)
- Integração com o endpoint [`/lists.json`](https://api.nytimes.com/svc/books/v3/lists.json)
- Paginação dinâmica (5 livros por página)
- Filtro por nome dos livros em tempo real
- Alternância entre exibição em cards ou lista
- Cada item exibe:
  - Título do livro
  - Descrição
  - Autor
  - Editora
  - Rank
  - Preço
  - Link para compra
  - Ícone de favorito (com persistência entre páginas)

### Aba de Favoritos
- Visualização de todos os livros marcados como favoritos
 - O estado de favoritos é compartilhado entre as páginas utilizando **Context API** 
 - Os dados são mantidos na memória da aplicação durante a sessão (não persistem após o reload)

## Como executar o projeto localmente

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```
2. Instale as dependências:
```bash
npm install
```

3. Crie `.env` na raiz com sua chave da NYT API:
```bash
VITE_NYT_API_KEY=sua_chave_aqui
```

4. Execute o projeto
```bash
npm run dev
```

## Observações
- O layout foi seguido conforme o protótipo no Figma fornecido;
- Toda a lógica de filtros, favoritos e paginação é feita no client-side conforme especificado.
- O estado dos livros favoritos é persistido e sincronizado entre as páginas.
- O projeto é responsivo e adaptado para diferentes tamanhos de tela.

*Desenvolvido por Giselle Schwab*  
*Email: giselleschwab@gmail.com*