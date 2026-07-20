import {
  analisarVagas,
  criarContadorAnalises,
  criarVagas,
  encontrarMelhorVaga,
  gerarRecomendacao,
} from "./motor.js";
import { carregarPerfil, carregarVagas, salvarPerfil } from "./dados.js";
import {
  atualizarEstadoResultados,
  configurarFormulario,
  preencherFormulario,
  renderizarResumo,
  renderizarVagas,
} from "./ui.js";

const contarAnalise = criarContadorAnalises();

async function iniciarSistema() {
  const perfilSalvo = carregarPerfil();
  preencherFormulario(perfilSalvo);

  atualizarEstadoResultados("Carregando vagas...");

  const dadosVagas = await carregarVagas();

  if (dadosVagas === null) {
    atualizarEstadoResultados(
      "Não foi possível carregar as vagas. Tente novamente mais tarde.",
    );
    console.error("[Main] A análise não pôde ser iniciada.");
    return;
  }

  if (dadosVagas.length === 0) {
    atualizarEstadoResultados("Nada encontrado.");
    console.log("[Main] Nada encontrado.");
    return;
  }

  // Os objetos do JSON viram instâncias da classe VagaFrontEnd.
  const vagas = criarVagas(dadosVagas);

  configurarFormulario((candidato) => {
    // O callback recebe o perfil validado pela interface e inicia a análise.
    salvarPerfil(candidato);

    const resultados = analisarVagas(candidato, vagas);
    const melhorVaga = encontrarMelhorVaga(resultados);
    const recomendacao = gerarRecomendacao(resultados);
    const totalAnalises = contarAnalise();

    renderizarVagas(resultados);
    renderizarResumo(melhorVaga, recomendacao);

    console.log("[Main] Melhor vaga:", melhorVaga);
    console.log("[Main] Recomendação:", recomendacao);
    console.log("[Main] Total de análises na sessão:", totalAnalises);
  });

  atualizarEstadoResultados("Vagas carregadas. Preencha seu perfil.");
  console.log("[Main] Formulário pronto para análise.");
}

iniciarSistema();
