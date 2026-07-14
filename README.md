# SkillMatch Web

## Sobre o projeto

O SkillMatch Web é a evolução do mini-projeto SkillMatch JS. A aplicação compara
as habilidades de um candidato com os requisitos de vagas fictícias de
Front-End Júnior e apresenta o percentual de compatibilidade.

O motor inicial em JavaScript puro foi reaproveitado do projeto anterior e será
adaptado gradualmente para funcionar em uma página web.

## Objetivo

Desenvolver uma aplicação de página única com HTML, CSS e JavaScript puro,
utilizando somente os conteúdos estudados no Módulo 1.

## Estrutura inicial

```text
skillmatch-web/
├── index.html
├── README.md
└── assets/
    ├── styles/
    │   └── index.style.css
    ├── scripts/
    │   ├── main.js
    │   ├── motor.js
    │   ├── ui.js
    │   └── dados.js
    ├── dados/
    │   └── vagas.json
    └── img/
        └── logo.svg
```

## Responsabilidade dos arquivos JavaScript

- `main.js`: organiza o fluxo da aplicação.
- `motor.js`: contém as regras de compatibilidade do SkillMatch.
- `ui.js`: manipula o formulário e os elementos da página.
- `dados.js`: carrega as vagas e salva o perfil do candidato.

## Tecnologias

- HTML
- CSS
- JavaScript
- Git e GitHub
- VS Code

## Como executar

Como o projeto utilizará módulos ES e `fetch`, ele deverá ser aberto com a
extensão Live Server do VS Code. Não abra o `index.html` diretamente pelo
endereço `file://`.

## Status

Estrutura inicial criada. As funcionalidades serão desenvolvidas em etapas e em
branches separadas.

## Autor

Willian
