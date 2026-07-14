// Motor original do SkillMatch JS. Ele será adaptado para módulos ES nas próximas etapas.
const candidato = {
  nome: "Willian",
  area: "Front-End",
  habilidades: ["JavaScript", "GitHub", "Lógica de Programação", "Kanban"],
  experienciaMeses: 3,
};

class Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade) {
    this.id = id;
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
    this.salario = salario;
    this.modalidade = modalidade;
  }

  exibirResumo() {
    return `${this.cargo} na empresa ${this.empresa}`;
  }
}

class VagaFrontEnd extends Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade, nivel) {
    super(id, empresa, cargo, requisitos, salario, modalidade);
    this.nivel = nivel;
  }
}

const vagas = [
  new VagaFrontEnd(
    1,
    "TechStart",
    "Desenvolvedor Front-End Júnior",
    ["JavaScript", "GitHub", "Lógica de Programação"],
    2800,
    "Remoto",
    "Júnior",
  ),
  new VagaFrontEnd(
    2,
    "CodeLab",
    "Estágio Front-End",
    ["JavaScript", "Kanban", "GitHub"],
    1800,
    "Híbrido",
    "Estágio",
  ),
  new VagaFrontEnd(
    3,
    "WebSolutions",
    "Programador JavaScript Júnior",
    ["JavaScript", "Arrays", "Objetos", "Funções"],
    3000,
    "Presencial",
    "Júnior",
  ),
];

function analisarVagas(candidato, vaga) {
  const habilidadesEncontradas = vaga.requisitos.filter((requisito) => {
    return candidato.habilidades.includes(requisito);
  });
  const habilidadesFaltantes = vaga.requisitos.filter((requisito) => {
    return !candidato.habilidades.includes(requisito);
  });

  const compatibilidade =
    (habilidadesEncontradas.length / vaga.requisitos.length) * 100;

  return {
    resumo: vaga.exibirResumo(),
    empresa: vaga.empresa,
    cargo: vaga.cargo,
    nivel: vaga.nivel,
    modalidade: vaga.modalidade,
    salario: vaga.salario,
    compatibilidade: Math.round(compatibilidade),
    classificacao: classificarCompatibilidade(compatibilidade),
    habilidadesEncontradas: habilidadesEncontradas,
    habilidadesFaltantes: habilidadesFaltantes,
  };
}

function classificarCompatibilidade(compatibilidade) {
  if (compatibilidade >= 80) {
    return "Alta compatibilidade";
  } else if (compatibilidade >= 50) {
    return "Média compatibilidade";
  } else {
    return "Baixa compatibilidade";
  }
}

function encontrarMelhorVaga(resultados) {
  const melhorVaga = resultados.reduce((melhor, resultado) => {
    return resultado.compatibilidade > melhor.compatibilidade
      ? resultado
      : melhor;
  }, resultados[0]);

  return melhorVaga;
}

function gerarRecomendacao(resultados) {
  const habilidadesParaEstudar = [];

  for (let i = 0; i < resultados.length; i++) {
    const faltantes = resultados[i].habilidadesFaltantes;

    for (let j = 0; j < faltantes.length; j++) {
      const habilidade = faltantes[j];

      if (!habilidadesParaEstudar.includes(habilidade)) {
        habilidadesParaEstudar.push(habilidade);
      }
    }
  }

  if (habilidadesParaEstudar.length === 0) {
    return "Você já atende todos os requisitos das vagas analisadas.";
  }

  return `Priorize estudar ${habilidadesParaEstudar.join(", ")}.`;
}

const criarMensagemFinal = (nome) => {
  return () => {
    return `${nome}, revise suas habilidades faltantes e atualize seu plano de estudos.`;
  };
};

function finalizarAnalise(nomeCandidato, callback) {
  console.log(" ");
  console.log("Análise finalizada.");
  console.log(" ");
  callback(nomeCandidato);
}

const carregarVagas = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(vagas);
    }, 2000);
  });
};

const iniciarSistema = async () => {
  console.log("Sistema SkillMatch JS iniciado...");

  const vagasCarregadas = await carregarVagas();

  console.log("Vagas carregadas com sucesso.");
  console.log(" ");

  const resultados = vagasCarregadas.map((vaga) =>
    analisarVagas(candidato, vaga),
  );

  console.log("Resultados da Análise de Vagas para o Candidato:");
  resultados.forEach(function (resultado) {
    console.log(`Resumo: ${resultado.resumo}`);
    console.log(`Empresa: ${resultado.empresa}`);
    console.log(`Cargo: ${resultado.cargo}`);
    console.log(`Nível: ${resultado.nivel}`);
    console.log(`Modalidade: ${resultado.modalidade}`);
    console.log(`Salário: R$ ${resultado.salario}`);
    console.log(`Compatibilidade: ${resultado.compatibilidade}%`);
    console.log(`Classificação: ${resultado.classificacao}`);
    console.log(
      `Habilidades Encontradas: ${resultado.habilidadesEncontradas.join(", ")}`,
    );
    if (resultado.habilidadesFaltantes.length === 0) {
      console.log("Habilidades Faltantes: Nenhuma");
    } else {
      console.log(
        `Habilidades Faltantes: ${resultado.habilidadesFaltantes.join(", ")}`,
      );
    }
    console.log(" ");
  });

  const melhorVaga = encontrarMelhorVaga(resultados);

  console.log("Melhor Vaga para o Candidato:");
  console.log(`Empresa: ${melhorVaga.empresa}`);
  console.log(`Cargo: ${melhorVaga.cargo}`);
  console.log(`Compatibilidade: ${melhorVaga.compatibilidade}%`);

  const recomendacao = gerarRecomendacao(resultados);

  console.log("Recomendação de estudo:");
  console.log(recomendacao);

  const mensagemFinal = criarMensagemFinal(candidato.nome);
  finalizarAnalise(candidato.nome, () => {
    console.log(mensagemFinal());
  });
};

iniciarSistema();
