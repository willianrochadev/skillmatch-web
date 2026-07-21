const CAMINHO_VAGAS = "./assets/dados/vagas.json";
const CHAVE_PERFIL = "skillmatch-perfil";

export function salvarPerfil(perfil) {
  // O localStorage armazena textos, por isso o objeto é convertido para JSON.
  const perfilEmTexto = JSON.stringify(perfil);
  localStorage.setItem(CHAVE_PERFIL, perfilEmTexto);

  console.log("[Dados] Perfil salvo no navegador.");
}

export function carregarPerfil() {
  const perfilEmTexto = localStorage.getItem(CHAVE_PERFIL);

  // Na primeira visita ainda não existe um perfil salvo no navegador.
  if (perfilEmTexto === null) {
    console.log("[Dados] Nenhum perfil salvo.");
    return null;
  }

  const perfil = JSON.parse(perfilEmTexto);
  console.log("[Dados] Perfil recuperado do navegador.");

  return perfil;
}

export async function carregarVagas() {
  console.log("[Dados] Carregando vagas...");

  try {
    const resposta = await fetch(CAMINHO_VAGAS);

    // O fetch não considera respostas 404 ou 500 como erros automaticamente.
    if (!resposta.ok) {
      throw new Error(`Falha na resposta. Código: ${resposta.status}`);
    }

    const vagas = await resposta.json();

    // Confirma que o conteúdo do JSON possui o formato de uma lista.
    if (!Array.isArray(vagas)) {
      throw new Error("O catálogo de vagas possui um formato inválido.");
    }

    if (vagas.length === 0) {
      console.log("[Dados] Nenhuma vaga encontrada.");
    } else {
      console.log(`[Dados] Vagas carregadas com sucesso: ${vagas.length}.`);
    }

    return vagas;
  } catch (erro) {
    console.error("[Dados] Erro ao carregar vagas:", erro.message);
    return null;
  }
}
