# SkillMatch Web

![Logo do SkillMatch Web](./assets/img/logo.svg)

## Sobre o projeto

O SkillMatch Web é uma aplicação de página única que compara as habilidades de
um candidato com os requisitos de vagas fictícias de Front-End.

O projeto transforma o motor desenvolvido anteriormente em JavaScript em uma
aplicação web com formulário, resultados visuais, carregamento de dados e
persistência do perfil no navegador.

## Problema resolvido

Uma pessoa em início de carreira pode ter dificuldade para entender quais vagas
combinam com suas habilidades e quais assuntos ainda precisa estudar. O
SkillMatch apresenta a compatibilidade com cada vaga, identifica a melhor
oportunidade e gera uma recomendação de estudo.

## Funcionalidades

- Preenchimento e validação do perfil do candidato.
- Apresentação das habilidades consideradas pelo catálogo.
- Carregamento de dez vagas fictícias a partir de um arquivo JSON.
- Cálculo do percentual de compatibilidade com cada vaga.
- Classificação em compatibilidade alta, média ou baixa.
- Separação entre habilidades encontradas e habilidades faltantes.
- Destaque da vaga com maior compatibilidade.
- Recomendação das habilidades que precisam ser priorizadas nos estudos.
- Salvamento e restauração do perfil com `localStorage`.
- Mensagens para os estados de carregamento, catálogo vazio e erro.
- Layout responsivo para celular, tablet e computador.

## Como funciona

1. As vagas são carregadas do arquivo `vagas.json` utilizando `fetch`.
2. O usuário informa nome, área, habilidades e tempo de experiência.
3. O formulário valida os dados sem recarregar a página.
4. O motor compara as habilidades informadas com os requisitos das vagas.
5. A interface cria os cards e apresenta os resultados no navegador.
6. O perfil é salvo para ser recuperado na próxima visita.

## Tecnologias e conceitos utilizados

- HTML semântico e acessível.
- CSS externo, Flexbox e responsividade mobile-first.
- JavaScript puro.
- Manipulação do DOM e eventos.
- Arrays e métodos como `map`, `filter` e `reduce`.
- Programação orientada a objetos, classes e herança.
- Callback e closure.
- Módulos ES com `import` e `export`.
- `fetch`, Promise e `async/await`.
- `localStorage`, `JSON.stringify` e `JSON.parse`.
- Git, GitHub, branches e Pull Requests.

## Estrutura do projeto

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

## Responsabilidade dos módulos

- `main.js`: organiza o fluxo da aplicação e conecta os módulos.
- `motor.js`: contém as regras de compatibilidade e as classes das vagas.
- `ui.js`: controla o formulário e a renderização dos elementos no DOM.
- `dados.js`: carrega as vagas e controla a persistência do perfil.

## Como executar

O projeto utiliza módulos ES e `fetch`. Por isso, deve ser executado por um
servidor local e não diretamente pelo endereço `file://`.

1. Faça o download ou clone este repositório.
2. Abra a pasta do projeto no VS Code.
3. Instale a extensão Live Server, caso ainda não esteja instalada.
4. Abra o arquivo `index.html`.
5. Clique em **Open with Live Server**.

## Como utilizar

1. Consulte as habilidades presentes nas vagas.
2. Preencha os campos do perfil.
3. Informe as habilidades separadas por vírgula.
4. Clique em **Analisar compatibilidade**.
5. Consulte a melhor vaga, a recomendação e os demais resultados.

O perfil fica salvo somente no armazenamento local do navegador. Não devem ser
informados dados sensíveis.

## Acessibilidade e responsividade

A página utiliza landmarks semânticos, hierarquia de títulos, associação entre
`label` e campos, texto alternativo na logo, mensagens com `aria-live` e foco
visível para navegação pelo teclado.

O layout foi desenvolvido primeiro para telas pequenas. Media queries e
Flexbox reorganizam as listas e os cards em telas maiores.

## Organização do Git

- `main`: versão estável e final do projeto.
- `develop`: integração das funcionalidades durante o desenvolvimento.
- `feat/*`: desenvolvimento de novas funcionalidades.
- `fix/*`: correções identificadas durante os testes.
- `docs/*`: alterações de documentação.

As alterações foram separadas em commits descritivos e integradas por Pull
Requests.

## Uso de inteligência artificial

A inteligência artificial foi utilizada como ferramenta de apoio para
organizar etapas, sugerir melhorias e revisar trechos do projeto. As sugestões
foram adaptadas ao conteúdo estudado no Módulo 1, testadas no navegador e
revisadas antes de serem incorporadas.

## Melhorias futuras

- Transformar as habilidades disponíveis em opções selecionáveis.
- Adicionar filtros por modalidade, salário ou compatibilidade.
- Permitir a ordenação dos resultados.
- Criar um tema claro e escuro persistente.
- Utilizar uma API pública de vagas quando houver uma fonte compatível.

## Links do projeto

- Aplicação online: [SkillMatch Web](https://willianrochadev.github.io/skillmatch-web/)
- Quadro Kanban: [SkillMatch Web — Projeto Avaliativo](https://trello.com/b/oWkTWUCi/skillmatch-web-projeto-avaliativo).
- Vídeo de apresentação: [Google Drive](https://drive.google.com/drive/folders/1QbQVG2tgihBz435P85JjR1TKX2I0KV6C?usp=sharing).

## Autor

Willian
