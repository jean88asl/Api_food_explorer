# API Food Explorer

API Food Explorer é uma aplicação backend baseada em Node.js, que permite os restaurantes explorem pratos e gerenciam pedidos. Esta API foi criada usando Express, autenticação via JWT; gerenciamento de arquivos com Multer; e bancos de dados SQLite e MySQL usando Knex.

## Índice

- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Licença](#licença)


## Instalação

1. Você pode baixar o projeto o cloná-lo utilizando o seguinte comando:

```bash
    git clone https://github.com/jean88asl/Api_food_explorer.git
```

2. Vá até o diretório do projeto utilizando o comando:

```bash
    cd api_food_explorer
```

3. Por fim instale as dependências com comando:

```bash
    npm install
```

## Configuração

- O SQLite é usado como banco de dados local e a MySQL é usada na produção.

### Banco de dados

- O projeto 

### Migrações

Para executar as migrações utilize o comando:

```bash
    npm run migrate
```

### Variáveis de ambiente

Na raiz do projeto crie um arquivo ".env" e defina as variáveis abaixo:

 ```cl
AUTH_SECRET=4e5d3e09cb06e31f4050b0cc3e9b9c6e
SERVER_PORT=3000
```

## Uso

Após seguir os passos supracitados abra um terminal na raiz do projeto e execute o seguinte comando:

```bash
    npm run dev
```

Depois de rodar o comando a API está disponível utilizando a URL `http://localhost:PORT`.

## Tecnologias Utilizadas

- Node.js: Ambiente para execução de JavaScript.
- Express: Framework para criação de APIs.
- Knex: Query builder de interação com os bancos de dados.
- SQLite e MySQL: Bancos de dados utilizados.
- JWT: Autenticação e controle de sessões.
- Bcryptjs: Hash de senhas.
- Multer: Upload de arquivos.

### Arquivos para teste

## Licença

Este projeto utiliza a licença ISC.