# Sobre a API

Está é uma API para testes, como a proposta inicial diz para ter uma rota de dashboard, uma para criar o produtor rural, uma para atualizar e uma para excluir esse produtor.

O software para quem está usando parece que utiliza um objeto único salvando todas as informações na mesma tabela, porém foi utilizado mais de uma tabela, relacionadas entre si, utilizando assim um dos benefícios de um banco relacional.

Para demonstração dos conhecimentos na linguagem procedural do PostgreSQL, o PG/PlSQL, optei por trazer as informações do dashboard direto de uma função que criei no banco de dados.

# Instruções

## Instalação

Utilizando Node 18+, instale rodando o comando no terminal:

```
npm install
```

Após a instalação, ligue o serviço do docker, e execute esse comando para copiar o arquivo de variáveis de ambiente (.env). Ele já vem por padrão com os mesmos dados do arquivo do docker compose

```
npm run prerun
```

Com o serviço do docker ligado, você pode subir o container com o banco PostgreSQL executando:

```
docker compose up -d
```

Feito isso, para montar as tabelas com as migrations e alimentar o banco com dados de teste, execute:

```
npm run db:rebuild
```

Agora é só ligar a API, executando:

```
npm run start
```

### Observações

Para facilitar os testes e demonstração da API, eu deixei o arquivo da collection e do enviroment na pasta 'postman_files'.

```
postman_files/
```

Foram feitos alguns testes unitários para demonstração, para rodar com informações de coverage, execute:

```
npm run test:cov
```

# Proposta Inicial

## Teste - Brain Agriculture

O teste tem como objetivo acurar as habilidades do candidato em resolver alguns problemas relacionados à lógica de programação, regra de negócio e orientação à objetos.

O mesmo consiste em um cadastro de produtor rural com os seguintes dados:

1. CPF ou CNPJ
2. Nome do produtor
3. Nome da Fazenda
4. Cidade
5. Estado
6. Área total em hectares da fazenda
7. Área agricultável em hectares
8. Área de vegetação em hectares
9. Culturas plantadas (Soja, Milho, Algodão, Café, Cana de Açucar)

## Requisitos de negócio

- O usuário deverá ter a possibilidade de cadastrar, editar, e excluir produtores rurais.
- O sistema deverá validar CPF e CNPJ digitados incorretamente.
- A soma de área agrícultável e vegetação, não deverá ser maior que a área total da fazenda
- Cada produtor pode plantar mais de uma cultura em sua Fazenda.
- A plataforma deverá ter um Dashboard que exiba:
  - Total de fazendas em quantidade
  - Total de fazendas em hectares (área total)
  - Gráfico de pizza por estado.
  - Gráfico de pizza por cultura.
  - Gráfico de pizza por uso de solo (Área agricultável e vegetação)

## Requisitos técnicos

- O desenvolvedor back-end deve:
  - Salvar os dados em um banco de dados Postgres usando o NodeJS como layer de Backend, e entregar os endpoints para cadastrar, editar, e excluir produtores rurais, além do endpoint que retorne os totais para o dashboard.
  - A criação das estruturas de dados "mockados" faz parte da avaliação.
