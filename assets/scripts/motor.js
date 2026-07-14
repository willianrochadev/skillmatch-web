// Ative durante o desenvolvimento para acompanhar os resultados no console.
// Antes da entrega final, altere o valor para false.
const MODO_DEBUG = true;

function exibirDebug(etapa, valor) {
  if (MODO_DEBUG) {
    console.log(`[Motor] ${etapa}:`, valor);
  }
}

export class Vaga {
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

  analisarCompatibilidade(candidato) {
    // Mantém apenas os requisitos que também aparecem nas habilidades do candidato.
    const habilidadesEncontradas = this.requisitos.filter((requisito) => {
      return candidato.habilidades.includes(requisito);
    });

    // O sinal de negação (!) inverte o resultado e encontra o que ainda falta estudar.
    const habilidadesFaltantes = this.requisitos.filter((requisito) => {
      return !candidato.habilidades.includes(requisito);
    });

    const compatibilidade =
      (habilidadesEncontradas.length / this.requisitos.length) * 100;

    const resultado = {
      resumo: this.exibirResumo(),
      empresa: this.empresa,
      cargo: this.cargo,
      nivel: this.nivel,
      modalidade: this.modalidade,
      salario: this.salario,
      compatibilidade: Math.round(compatibilidade),
      classificacao: classificarCompatibilidade(compatibilidade),
      habilidadesEncontradas,
      habilidadesFaltantes,
    };

    exibirDebug(`resultado da vaga ${this.id}`, resultado);

    return resultado;
  }
}

export class VagaFrontEnd extends Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade, nivel) {
    super(id, empresa, cargo, requisitos, salario, modalidade);
    this.nivel = nivel;
  }

  // A sobrescrita acrescenta o nível da vaga ao resumo criado pela classe principal.
  exibirResumo() {
    return `${super.exibirResumo()} - Nível ${this.nivel}`;
  }
}

export function criarVagas(dadosVagas) {
  // Converte cada objeto simples do JSON em uma instância com os métodos da classe.
  const vagas = dadosVagas.map((vaga) => {
    return new VagaFrontEnd(
      vaga.id,
      vaga.empresa,
      vaga.cargo,
      vaga.requisitos,
      vaga.salario,
      vaga.modalidade,
      vaga.nivel,
    );
  });

  exibirDebug("quantidade de vagas criadas", vagas.length);

  return vagas;
}

export function analisarVagas(candidato, vagas) {
  return vagas.map((vaga) => {
    return vaga.analisarCompatibilidade(candidato);
  });
}

export function classificarCompatibilidade(compatibilidade) {
  if (compatibilidade >= 80) {
    return "Alta compatibilidade";
  } else if (compatibilidade >= 50) {
    return "Média compatibilidade";
  } else {
    return "Baixa compatibilidade";
  }
}

export function encontrarMelhorVaga(resultados) {
  // Evita executar o reduce quando não existem resultados.
  if (resultados.length === 0) {
    return null;
  }

  return resultados.reduce((melhor, resultado) => {
    return resultado.compatibilidade > melhor.compatibilidade
      ? resultado
      : melhor;
  }, resultados[0]);
}

export function gerarRecomendacao(resultados) {
  const frequenciaHabilidades = {};

  // Conta quantas vezes cada habilidade aparece entre os requisitos faltantes.
  for (let i = 0; i < resultados.length; i++) {
    const habilidadesFaltantes = resultados[i].habilidadesFaltantes;

    for (let j = 0; j < habilidadesFaltantes.length; j++) {
      const habilidade = habilidadesFaltantes[j];

      if (frequenciaHabilidades[habilidade]) {
        frequenciaHabilidades[habilidade] += 1;
      } else {
        frequenciaHabilidades[habilidade] = 1;
      }
    }
  }

  const habilidades = Object.keys(frequenciaHabilidades);

  if (habilidades.length === 0) {
    return "Você já atende todos os requisitos das vagas analisadas.";
  }

  const maiorFrequencia = habilidades.reduce((maior, habilidade) => {
    return frequenciaHabilidades[habilidade] > maior
      ? frequenciaHabilidades[habilidade]
      : maior;
  }, 0);

  const habilidadesPrioritarias = habilidades.filter((habilidade) => {
    return frequenciaHabilidades[habilidade] === maiorFrequencia;
  });

  return `Priorize estudar ${habilidadesPrioritarias.join(", ")}.`;
}

export function criarContadorAnalises() {
  let quantidadeAnalises = 0;

  // A função retornada mantém acesso à variável acima: esse comportamento é a closure.
  return () => {
    quantidadeAnalises += 1;
    exibirDebug("análises realizadas nesta sessão", quantidadeAnalises);
    return quantidadeAnalises;
  };
}
