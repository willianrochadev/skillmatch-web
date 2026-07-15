const CAMINHO_VAGAS = "./assets/dados/vagas.json";

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
