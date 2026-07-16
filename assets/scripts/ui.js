const formulario = document.querySelector("#formulario-perfil");
const campoNome = document.querySelector("#nome");
const campoArea = document.querySelector("#area");
const campoHabilidades = document.querySelector("#habilidades");
const campoExperiencia = document.querySelector("#experiencia-meses");
const mensagemFormulario = document.querySelector("#mensagem-formulario");

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

export function criarCardVaga(resultado) {
  const card = document.createElement("article");
  const titulo = document.createElement("h3");
  const empresa = document.createElement("p");
  const detalhes = document.createElement("p");
  const compatibilidade = document.createElement("p");

  card.classList.add("card-vaga");

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

export function configurarFormulario(aoEnviar) {
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
    aoEnviar(candidato);
  });
}
