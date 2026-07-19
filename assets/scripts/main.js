import {
  analisarVagas,
  criarContadorAnalises,
  criarVagas,
  encontrarMelhorVaga,
  gerarRecomendacao,
} from "./motor.js";
import { carregarVagas } from "./dados.js";
import {
  configurarFormulario,
  renderizarResumo,
  renderizarVagas,
} from "./ui.js";

const contarAnalise = criarContadorAnalises();

async function iniciarSistema() {
  const dadosVagas = await carregarVagas();

  if (dadosVagas === null) {
    console.error("[Main] A análise não pôde ser iniciada.");
    return;
  }

  if (dadosVagas.length === 0) {
    console.log("[Main] Nada encontrado.");
    return;
  }

  // Os objetos do JSON viram instâncias da classe VagaFrontEnd.
  const vagas = criarVagas(dadosVagas);

  configurarFormulario((candidato) => {
    // O callback recebe o perfil validado pela interface e inicia a análise.
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

  console.log("[Main] Formulário pronto para análise.");
}

iniciarSistema();
