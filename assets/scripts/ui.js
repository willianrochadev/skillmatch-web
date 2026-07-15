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
