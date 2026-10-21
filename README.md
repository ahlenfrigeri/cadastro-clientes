# Cadastro de Clientes (CrudCrud)

Aplicação em **HTML, CSS e JavaScript** que **cadastra (POST), lista (GET) e exclui (DELETE)** clientes usando a API REST do **[CrudCrud](https://crudcrud.com)**. Exercício do Módulo 9 (Fundamentos de HTTP) do curso de Front-End da EBAC.

## Funcionalidades

- Cadastro de cliente com nome e e-mail (com validação)
- Listagem de todos os clientes salvos na API
- Botão de exclusão em cada cliente
- Mensagens de sucesso e de erro, contador e botão para atualizar a lista

## Requisições

| Ação | Método | Rota |
|---|---|---|
| Listar | `GET` | `/clientes` |
| Cadastrar | `POST` | `/clientes` (JSON: `nome`, `email`) |
| Excluir | `DELETE` | `/clientes/{_id}` |

## Como usar

Abra o `index.html` no navegador. Para acompanhar as requisições: **F12 → Network**.

> ⚠️ **Os endpoints gratuitos do CrudCrud expiram** (cerca de 24 horas ou 100 requisições). Se a lista não carregar, gere um novo endpoint em [crudcrud.com](https://crudcrud.com) e troque a constante `ENDPOINT_CRUDCRUD` no início do `scripts.js`.

## Tecnologias

HTML5 · CSS3 · JavaScript (Fetch API, async/await, HTTP: GET/POST/DELETE)
