import {
  analisarVagas,
  criarContadorAnalises,
  criarVagas,
  encontrarMelhorVaga,
  gerarRecomendacao,
} from "./motor.js";

// Estes dados são temporários e permitem testar o motor antes do formulário e do fetch.
const candidatoTeste = {
  nome: "Willian",
  area: "Front-End",
  habilidades: ["JavaScript", "HTML"],
  experienciaMeses: 3,
};

const dadosVagasTeste = [
  {
    id: 1,
    empresa: "TechStart",
    cargo: "Desenvolvedor Front-End Júnior",
    requisitos: ["JavaScript", "HTML", "GitHub"],
    salario: 2800,
    modalidade: "Remoto",
    nivel: "Júnior",
  },
  {
    id: 2,
    empresa: "CodeLab",
    cargo: "Estágio Front-End",
    requisitos: ["JavaScript", "HTML"],
    salario: 1800,
    modalidade: "Híbrido",
    nivel: "Estágio",
  },
  {
    id: 3,
    empresa: "WebSolutions",
    cargo: "Programador Web Júnior",
    requisitos: ["CSS", "React", "GitHub"],
    salario: 3000,
    modalidade: "Presencial",
    nivel: "Júnior",
  },
];

const contarAnalise = criarContadorAnalises();

function testarMotor() {
  // Primeiro os objetos simples viram instâncias da classe VagaFrontEnd.
  const vagas = criarVagas(dadosVagasTeste);

  // Depois o motor compara o candidato com cada vaga criada.
  const resultados = analisarVagas(candidatoTeste, vagas);
  const melhorVaga = encontrarMelhorVaga(resultados);
  const recomendacao = gerarRecomendacao(resultados);
  const totalAnalises = contarAnalise();

  console.log("[Main] Melhor vaga:", melhorVaga);
  console.log("[Main] Recomendação:", recomendacao);
  console.log("[Main] Total de análises na sessão:", totalAnalises);
}

testarMotor();
