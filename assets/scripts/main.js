import {
  analisarVagas,
  criarContadorAnalises,
  criarVagas,
  encontrarMelhorVaga,
  gerarRecomendacao,
} from "./motor.js";
import { carregarVagas } from "./dados.js";

// O candidato continuará temporário até o formulário de perfil ser implementado.
const candidatoTeste = {
  nome: "Willian",
  area: "Front-End",
  habilidades: ["JavaScript", "HTML"],
  experienciaMeses: 3,
};

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

  // Depois o motor compara o candidato com cada vaga criada.
  const resultados = analisarVagas(candidatoTeste, vagas);
  const melhorVaga = encontrarMelhorVaga(resultados);
  const recomendacao = gerarRecomendacao(resultados);
  const totalAnalises = contarAnalise();

  console.log("[Main] Melhor vaga:", melhorVaga);
  console.log("[Main] Recomendação:", recomendacao);
  console.log("[Main] Total de análises na sessão:", totalAnalises);
}

iniciarSistema();
