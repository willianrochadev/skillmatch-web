const formulario = document.querySelector("#formulario-perfil");
const campoNome = document.querySelector("#nome");
const campoArea = document.querySelector("#area");
const campoHabilidades = document.querySelector("#habilidades");
const campoExperiencia = document.querySelector("#experiencia-meses");
const mensagemFormulario = document.querySelector("#mensagem-formulario");
const estadoResultados = document.querySelector("#estado-resultados");
const resumoAnalise = document.querySelector("#resumo-analise");
const melhorVagaElemento = document.querySelector("#melhor-vaga");
const recomendacaoEstudo = document.querySelector("#recomendacao-estudo");
const listaVagas = document.querySelector("#lista-vagas");

const camposFormulario = [
  campoNome,
  campoArea,
  campoHabilidades,
  campoExperiencia,
];

function obterDadosFormulario() {
  // Transforma o texto separado por vírgulas em uma lista de habilidades.
  const habilidades = campoHabilidades.value
    .split(",")
    .map((habilidade) => habilidade.trim())
    .filter((habilidade) => habilidade !== "");

  return {
    nome: campoNome.value.trim(),
    area: campoArea.value.trim(),
    habilidades,
    experienciaMeses: Number(campoExperiencia.value),
  };
}

function validarFormulario(candidato) {
  if (candidato.nome === "") {
    return { mensagem: "Informe seu nome.", campo: campoNome };
  }

  if (candidato.area === "") {
    return { mensagem: "Informe sua área de atuação.", campo: campoArea };
  }

  if (candidato.habilidades.length === 0) {
    return {
      mensagem: "Informe pelo menos uma habilidade.",
      campo: campoHabilidades,
    };
  }

  if (
    campoExperiencia.value === "" ||
    candidato.experienciaMeses < 0 ||
    !Number.isInteger(candidato.experienciaMeses)
  ) {
    return {
      mensagem: "Informe um tempo de experiência válido.",
      campo: campoExperiencia,
    };
  }

  return null;
}

function limparErros() {
  mensagemFormulario.textContent = "";

  camposFormulario.forEach((campo) => {
    campo.removeAttribute("aria-invalid");
    campo.classList.remove("campo-invalido");
  });
}

function exibirErro(erro) {
  mensagemFormulario.textContent = erro.mensagem;
  erro.campo.setAttribute("aria-invalid", "true");
  erro.campo.classList.add("campo-invalido");
  erro.campo.focus();
}

// Cria uma lista HTML a partir do array de habilidades recebido do motor.
function criarListaHabilidades(titulo, habilidades) {
  const conteudo = document.createElement("div");
  const subtitulo = document.createElement("h4");
  const lista = document.createElement("ul");

  subtitulo.textContent = titulo;

  if (habilidades.length === 0) {
    const item = document.createElement("li");
    item.textContent = "Nenhuma";
    lista.appendChild(item);
  } else {
    habilidades.forEach((habilidade) => {
      const item = document.createElement("li");
      item.textContent = habilidade;
      lista.appendChild(item);
    });
  }

  conteudo.appendChild(subtitulo);
  conteudo.appendChild(lista);

  return conteudo;
}

// Cria o elemento que representa uma vaga e devolve o card pronto.
export function criarCardVaga(resultado) {
  const card = document.createElement("article");
  const titulo = document.createElement("h3");
  const empresa = document.createElement("p");
  const detalhes = document.createElement("p");
  const compatibilidade = document.createElement("p");

  card.classList.add("card-vaga");

  // O CSS usará esta classe para diferenciar o nível de compatibilidade.
  if (resultado.classificacao === "Alta compatibilidade") {
    card.classList.add("compatibilidade-alta");
  } else if (resultado.classificacao === "Média compatibilidade") {
    card.classList.add("compatibilidade-media");
  } else {
    card.classList.add("compatibilidade-baixa");
  }

  titulo.textContent = resultado.cargo;
  empresa.textContent = resultado.empresa;
  detalhes.textContent = `${resultado.nivel} | ${resultado.modalidade} | R$ ${resultado.salario}`;
  compatibilidade.textContent = `${resultado.compatibilidade}% - ${resultado.classificacao}`;

  card.appendChild(titulo);
  card.appendChild(empresa);
  card.appendChild(detalhes);
  card.appendChild(compatibilidade);
  card.appendChild(
    criarListaHabilidades(
      "Habilidades encontradas",
      resultado.habilidadesEncontradas,
    ),
  );
  card.appendChild(
    criarListaHabilidades(
      "Habilidades faltantes",
      resultado.habilidadesFaltantes,
    ),
  );

  return card;
}

export function renderizarVagas(resultados) {
  // Limpa os cards anteriores antes de mostrar uma nova análise.
  listaVagas.textContent = "";

  if (resultados.length === 0) {
    estadoResultados.textContent = "Nada encontrado.";
    return;
  }

  // Percorre os resultados e adiciona um novo card para cada vaga.
  resultados.forEach((resultado) => {
    const card = criarCardVaga(resultado);
    listaVagas.appendChild(card);
  });

  estadoResultados.textContent = `${resultados.length} vagas analisadas.`;
}

export function renderizarResumo(melhorVaga, recomendacao) {
  // Limpa o resumo anterior para evitar informações repetidas em uma nova análise.
  melhorVagaElemento.textContent = "";

  if (melhorVaga === null) {
    resumoAnalise.hidden = true;
    return;
  }

  const identificacao = document.createElement("p");
  const compatibilidade = document.createElement("p");
  const classificacao = document.createElement("p");

  identificacao.textContent = `${melhorVaga.cargo} - ${melhorVaga.empresa}`;
  compatibilidade.textContent = `Compatibilidade: ${melhorVaga.compatibilidade}%`;
  classificacao.textContent = melhorVaga.classificacao;

  melhorVagaElemento.appendChild(identificacao);
  melhorVagaElemento.appendChild(compatibilidade);
  melhorVagaElemento.appendChild(classificacao);
  recomendacaoEstudo.textContent = recomendacao;

  // O resumo começa oculto no HTML e aparece somente depois da análise.
  resumoAnalise.hidden = false;
}

export function configurarFormulario(aoEnviar) {
  // O envio do formulário é tratado pelo JavaScript sem recarregar a página.
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    limparErros();

    const candidato = obterDadosFormulario();
    const erro = validarFormulario(candidato);

    if (erro) {
      exibirErro(erro);
      return;
    }

    console.log("[UI] Candidato válido:", candidato);

    // O callback recebe o candidato somente depois da validação.
    aoEnviar(candidato);
  });
}
