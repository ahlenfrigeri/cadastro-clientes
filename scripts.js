// =====================================================================
// Cadastro de clientes com a API do CrudCrud
//   POST   /clientes        → cadastra
//   GET    /clientes        → lista todos
//   DELETE /clientes/:id    → exclui um
//
// ⚠️ Os endpoints gratuitos do CrudCrud expiram (cerca de 24 h ou 100 requisições).
//    Se a lista parar de carregar, gere um novo em https://crudcrud.com
//    e troque o código abaixo.
// =====================================================================

const ENDPOINT_CRUDCRUD = "https://crudcrud.com/api/9680fc7168d74d1fae56344732b7eb3d";
const API_CLIENTES = ENDPOINT_CRUDCRUD + "/clientes";

const formulario = document.getElementById("formulario");
const campoNome = document.getElementById("nome");
const campoEmail = document.getElementById("email");
const botaoSalvar = document.getElementById("botao-salvar");
const mensagem = document.getElementById("mensagem");
const lista = document.getElementById("lista-clientes");
const estadoLista = document.getElementById("estado-lista");
const contador = document.getElementById("contador");
const botaoAtualizar = document.getElementById("atualizar");

// ===================== Requisições à API =====================

// GET: busca todos os clientes
async function buscarClientes() {
  const resposta = await fetch(API_CLIENTES);
  if (!resposta.ok) throw new Error("GET falhou com status " + resposta.status);
  return resposta.json(); // array de clientes, cada um com _id, nome e email
}

// POST: cadastra um cliente
async function cadastrarCliente(cliente) {
  const resposta = await fetch(API_CLIENTES, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });
  if (!resposta.ok) throw new Error("POST falhou com status " + resposta.status);
  return resposta.json(); // o cliente criado, já com o _id gerado pela API
}

// DELETE: exclui pelo _id
async function excluirCliente(id) {
  const resposta = await fetch(API_CLIENTES + "/" + id, { method: "DELETE" });
  if (!resposta.ok) throw new Error("DELETE falhou com status " + resposta.status);
}

// ===================== Tela =====================

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = "mensagem " + tipo;
}

// Cria o <li> de um cliente, com o botão Excluir
function criarItemCliente(cliente) {
  const item = document.createElement("li");
  item.className = "cliente";

  const info = document.createElement("div");
  info.className = "info";

  const nome = document.createElement("strong");
  nome.textContent = cliente.nome; // textContent: nunca interpreta HTML vindo da API

  const email = document.createElement("span");
  email.textContent = cliente.email;

  info.append(nome, email);

  const botaoExcluir = document.createElement("button");
  botaoExcluir.type = "button";
  botaoExcluir.className = "excluir";
  botaoExcluir.textContent = "Excluir";
  botaoExcluir.setAttribute("aria-label", "Excluir " + cliente.nome);
  botaoExcluir.addEventListener("click", () => aoExcluir(cliente, botaoExcluir));

  item.append(info, botaoExcluir);
  return item;
}

function renderizarLista(clientes) {
  lista.innerHTML = "";
  contador.textContent = clientes.length;

  if (clientes.length === 0) {
    estadoLista.textContent = "Nenhum cliente cadastrado ainda.";
    estadoLista.hidden = false;
    return;
  }

  estadoLista.hidden = true;
  for (const cliente of clientes) {
    lista.appendChild(criarItemCliente(cliente));
  }
}

async function carregarLista() {
  estadoLista.textContent = "Carregando clientes…";
  estadoLista.hidden = false;
  try {
    const clientes = await buscarClientes();
    renderizarLista(clientes);
  } catch (erro) {
    console.error(erro);
    lista.innerHTML = "";
    estadoLista.textContent =
      "Não foi possível carregar os clientes. Verifique a conexão ou se o endpoint do CrudCrud expirou.";
    estadoLista.hidden = false;
  }
}

// ===================== Ações do usuário =====================

function emailValido(email) {
  // validação simples: algo@algo.algo
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function aoCadastrar(evento) {
  evento.preventDefault();

  const cliente = {
    nome: campoNome.value.trim(),
    email: campoEmail.value.trim(),
  };

  if (!cliente.nome) {
    mostrarMensagem("Informe o nome do cliente.", "erro");
    campoNome.focus();
    return;
  }
  if (!emailValido(cliente.email)) {
    mostrarMensagem("Informe um e-mail válido.", "erro");
    campoEmail.focus();
    return;
  }

  botaoSalvar.disabled = true;
  botaoSalvar.textContent = "Salvando…";

  try {
    await cadastrarCliente(cliente);
    formulario.reset();
    mostrarMensagem("Cliente " + cliente.nome + " cadastrado!", "sucesso");
    campoNome.focus();
    await carregarLista();
  } catch (erro) {
    console.error(erro);
    mostrarMensagem("Não foi possível cadastrar. Tente novamente.", "erro");
  } finally {
    botaoSalvar.disabled = false;
    botaoSalvar.textContent = "Cadastrar";
  }
}

async function aoExcluir(cliente, botao) {
  botao.disabled = true;
  botao.textContent = "Excluindo…";

  try {
    await excluirCliente(cliente._id);
    mostrarMensagem("Cliente " + cliente.nome + " excluído.", "info");
    await carregarLista();
  } catch (erro) {
    console.error(erro);
    mostrarMensagem("Não foi possível excluir. Tente novamente.", "erro");
    botao.disabled = false;
    botao.textContent = "Excluir";
  }
}

// ===================== Eventos =====================

formulario.addEventListener("submit", aoCadastrar);
botaoAtualizar.addEventListener("click", carregarLista);

// Ao abrir a página, lista o que já existe na API
carregarLista();
