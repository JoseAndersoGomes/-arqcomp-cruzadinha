const tabuleiro = [
  ["", "", "", "", "", "", "", "", "", "R", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "A", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "R", "O", "M", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "E", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "G", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "I", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "S", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "U", "C", "", "T", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "P", "", "R", "", "", "", "", "", "", "", "F", "", "D"],
  ["", "", "", "", "", "U", "L", "A", "", "", "", "", "", "", "", "L", "", "A"],
  ["", "", "", "", "", "", "", "D", "", "", "C", "", "", "D", "", "A", "", "T"],
  ["", "", "", "", "M", "E", "M", "O", "R", "I", "A", "D", "E", "M", "A", "S", "S", "A"],
  ["", "", "", "", "", "", "", "R", "", "", "C", "", "", "A", "", "H", "", "B"],
  ["Q", "U", "A", "D", "C", "O", "R", "E", "", "", "H", "", "", "", "", "", "", "U"],
  ["", "", "", "", "", "", "", "S", "", "", "E", "", "", "", "", "", "", "S"]
];

const palavras = [
  {
    numero: 1,
    palavra: "CPU",
    direcao: "vertical",
    linhaInicial: 7,
    colunaInicial: 5,
    pista: "Núcleo que busca, decodifica e executa instruções; o cérebro do Omnitrix."
  },
  {
    numero: 2,
    palavra: "ULA",
    direcao: "horizontal",
    linhaInicial: 9,
    colunaInicial: 5,
    pista: "Circuito que soma, subtrai e compara dados; a força bruta do DNA alienígena."
  },
  {
    numero: 3,
    palavra: "UC",
    direcao: "horizontal",
    linhaInicial: 7,
    colunaInicial: 4,
    pista: "Massa Cinzenta que sincroniza e comanda os sinais; o pulso do núcleo do relógio."
  },
  {
    numero: 4,
    palavra: "REGISTRADORES",
    direcao: "vertical",
    linhaInicial: 2,
    colunaInicial: 7,
    pista: "Posições ultrarrápidas dentro do chip, como aliens no banco do Omnitrix."
  },
  {
    numero: 5,
    palavra: "RAM",
    direcao: "vertical",
    linhaInicial: 0,
    colunaInicial: 9,
    pista: "Área volátil de trabalho lida e escrita pelo processador; perde tudo ao desligar."
  },
  {
    numero: 6,
    palavra: "ROM",
    direcao: "horizontal",
    linhaInicial: 2,
    colunaInicial: 7,
    pista: "Chip fixo que guarda instruções iniciais; o DNA original gravado pelo criador."
  },
  {
    numero: 7,
    palavra: "FLASH",
    direcao: "vertical",
    linhaInicial: 8,
    colunaInicial: 15,
    pista: "Armazenamento não volátil, apagável e regravável; o banco de DNA do Omnitrix."
  },
  {
    numero: 8,
    palavra: "CACHE",
    direcao: "vertical",
    linhaInicial: 10,
    colunaInicial: 10,
    pista: "Pequena memória veloz que copia dados usados com frequência; o atalho do Omnitrix."
  },
  {
    numero: 9,
    palavra: "MEMORIADEMASSA",
    direcao: "horizontal",
    linhaInicial: 11,
    colunaInicial: 4,
    pista: "Armazenamento secundário permanente, como discos e fitas; o cofre galáctico de DNA."
  },
  {
    numero: 10,
    palavra: "DMA",
    direcao: "vertical",
    linhaInicial: 10,
    colunaInicial: 13,
    pista: "Transferência entre periféricos e memória sem passar pelo núcleo; teletransporte de DNA."
  },
  {
    numero: 11,
    palavra: "DATABUS",
    direcao: "vertical",
    linhaInicial: 8,
    colunaInicial: 17,
    pista: "Canal compartilhado que transporta bits entre componentes; a corrente sanguínea do Omnitrix."
  },
  {
    numero: 12,
    palavra: "QUADCORE",
    direcao: "horizontal",
    linhaInicial: 13,
    colunaInicial: 0,
    pista: "Processador com várias unidades de execução no mesmo encapsulamento; time alienígena em um só corpo."
  }
];

let direcaoAtual = "horizontal";
let ultimaCelulaClicada = null;

function embaralhar(lista) {
  const copia = [...lista];

  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }

  return copia;
}

function pertenceAPalavra(palavra, linha, coluna) {
  const passoLinha = palavra.direcao === "vertical" ? 1 : 0;
  const passoColuna = palavra.direcao === "horizontal" ? 1 : 0;

  for (let i = 0; i < palavra.palavra.length; i++) {
    if (
      palavra.linhaInicial + passoLinha * i === linha &&
      palavra.colunaInicial + passoColuna * i === coluna
    ) {
      return true;
    }
  }

  return false;
}

function obterInput(linha, coluna) {
  return document.querySelector(
    `input[data-linha="${linha}"][data-coluna="${coluna}"]`
  );
}

function direcoesDaCelula(linha, coluna) {
  const direcoes = [];

  if (
    palavras.some(
      (item) =>
        item.direcao === "horizontal" &&
        pertenceAPalavra(item, linha, coluna)
    )
  ) {
    direcoes.push("horizontal");
  }

  if (
    palavras.some(
      (item) =>
        item.direcao === "vertical" &&
        pertenceAPalavra(item, linha, coluna)
    )
  ) {
    direcoes.push("vertical");
  }

  return direcoes;
}

function atualizarDirecao(input) {
  const linha = Number(input.dataset.linha);
  const coluna = Number(input.dataset.coluna);
  const direcoes = direcoesDaCelula(linha, coluna);

  if (!direcoes.includes(direcaoAtual)) {
    direcaoAtual = direcoes[0] || direcaoAtual;
  }
}

function moverFoco(input, passo) {
  const linha = Number(input.dataset.linha);
  const coluna = Number(input.dataset.coluna);
  const palavra = palavras.find(
    (item) =>
      item.direcao === direcaoAtual &&
      pertenceAPalavra(item, linha, coluna)
  );

  if (!palavra) {
    return;
  }

  const passoLinha = direcaoAtual === "vertical" ? 1 : 0;
  const passoColuna = direcaoAtual === "horizontal" ? 1 : 0;
  const novaLinha = linha + passoLinha * passo;
  const novaColuna = coluna + passoColuna * passo;

  if (!pertenceAPalavra(palavra, novaLinha, novaColuna)) {
    return;
  }

  const proximoInput = obterInput(novaLinha, novaColuna);

  if (proximoInput) {
    ultimaCelulaClicada = null;
    proximoInput.focus();
  }
}

function configurarCelula(input) {
  input.addEventListener("focus", () => {
    atualizarDirecao(input);
    input.select();
  });

  input.addEventListener("click", () => {
    input.select();

    const linha = Number(input.dataset.linha);
    const coluna = Number(input.dataset.coluna);
    const direcoes = direcoesDaCelula(linha, coluna);

    if (direcoes.length === 2 && ultimaCelulaClicada === input) {
      direcaoAtual = direcaoAtual === "horizontal" ? "vertical" : "horizontal";
    }

    ultimaCelulaClicada = input;
  });

  input.addEventListener("input", () => {
    const letra = input.value
      .replace(/[^a-zA-Z]/g, "")
      .toUpperCase()
      .slice(0, 1);

    input.value = letra;

    if (letra) {
      moverFoco(input, 1);
    }
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Backspace" && input.value === "") {
      event.preventDefault();
      moverFoco(input, -1);
    }
  });
}

function renderizarTabuleiro() {
  const tabuleiroElemento = document.getElementById("tabuleiro");
  const numerosPorCelula = new Map();

  ultimaCelulaClicada = null;

  palavras.forEach((item) => {
    const chave = `${item.linhaInicial},${item.colunaInicial}`;
    const numeros = numerosPorCelula.get(chave) || [];

    numeros.push(item.numero);
    numerosPorCelula.set(chave, numeros);
  });

  tabuleiroElemento.innerHTML = "";
  tabuleiroElemento.style.setProperty("--colunas", tabuleiro[0].length);

  tabuleiro.forEach((linha, indiceLinha) => {
    linha.forEach((letra, indiceColuna) => {
      if (letra === "") {
        const vazia = document.createElement("div");
        vazia.className = "vazia";
        tabuleiroElemento.appendChild(vazia);
        return;
      }

      const celula = document.createElement("div");
      celula.className = "celula";

      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = 1;
      input.dataset.linha = indiceLinha;
      input.dataset.coluna = indiceColuna;

      celula.appendChild(input);

      const numeros = numerosPorCelula.get(
        `${indiceLinha},${indiceColuna}`
      );

      if (numeros) {
        const numeroDica = document.createElement("span");
        numeroDica.className = "numero-dica";
        numeroDica.textContent = numeros.join("/");
        celula.appendChild(numeroDica);
      }

      configurarCelula(input);
      tabuleiroElemento.appendChild(celula);
    });
  });
}

function renderizarPistas() {
  const listaHorizontais = document.getElementById("lista-horizontais");
  const listaVerticais = document.getElementById("lista-verticais");

  listaHorizontais.innerHTML = "";
  listaVerticais.innerHTML = "";

  palavras.forEach((item) => {
    const li = document.createElement("li");
    li.value = item.numero;
    li.textContent = item.pista;

    if (item.direcao === "horizontal") {
      listaHorizontais.appendChild(li);
    } else {
      listaVerticais.appendChild(li);
    }
  });
}

function obterInputsDaPalavra(item) {
  const passoLinha = item.direcao === "vertical" ? 1 : 0;
  const passoColuna = item.direcao === "horizontal" ? 1 : 0;
  const inputs = [];

  for (let i = 0; i < item.palavra.length; i++) {
    const input = obterInput(
      item.linhaInicial + passoLinha * i,
      item.colunaInicial + passoColuna * i
    );

    if (input) {
      inputs.push(input);
    }
  }

  return inputs;
}

function limparValidacao() {
  document.querySelectorAll("#tabuleiro input").forEach((input) => {
    input.classList.remove("certa", "errada");
  });
}

function conferir() {
  limparValidacao();

  let acertos = 0;

  palavras.forEach((item) => {
    const inputs = obterInputsDaPalavra(item);
    const digitado = inputs
      .map((input) => input.value.toUpperCase())
      .join("");
    const correta = digitado === item.palavra;

    if (correta) {
      acertos++;

      inputs.forEach((input) => {
        input.classList.remove("errada");
        input.classList.add("certa");
      });
    } else {
      inputs.forEach((input) => {
        if (!input.classList.contains("certa")) {
          input.classList.add("errada");
        }
      });
    }
  });

  document.getElementById("contador").textContent =
    `${acertos} de ${palavras.length} palavras`;

  document.getElementById("mensagem-vitoria").textContent =
    acertos === palavras.length
      ? "SISTEMA SINCRONIZADO! Controle Mestre do Omnitrix desbloqueado."
      : "";
}

function reiniciar() {
  document.querySelectorAll("#tabuleiro input").forEach((input) => {
    input.value = "";
    input.classList.remove("certa", "errada");
  });

  document.getElementById("contador").textContent =
    `0 de ${palavras.length} palavras`;

  document.getElementById("mensagem-vitoria").textContent = "";
}

let quizOrdem = [];
let quizIndice = 0;
let quizAcertos = 0;
let quizRespondida = false;

function iniciarQuiz() {
  quizOrdem = embaralhar(palavras.map((_, indice) => indice));
  quizIndice = 0;
  quizAcertos = 0;
  mostrarPistaQuiz();
}

function mostrarPistaQuiz() {
  quizRespondida = false;

  const item = palavras[quizOrdem[quizIndice]];
  const feedback = document.getElementById("quiz-feedback");

  document.getElementById("quiz-pista").textContent = `${item.numero}. ${item.pista}`;
  feedback.textContent = "";
  feedback.className = "feedback";
  document.getElementById("quiz-placar").textContent =
    `${quizAcertos} de ${palavras.length} acertos`;

  const opcoes = document.getElementById("quiz-opcoes");
  opcoes.innerHTML = "";

  const alternativas = embaralhar([
    item,
    ...embaralhar(palavras.filter((palavra) => palavra !== item)).slice(0, 3)
  ]);

  alternativas.forEach((alternativa) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = alternativa.palavra;
    botao.addEventListener("click", () => responderQuiz(alternativa, botao));
    opcoes.appendChild(botao);
  });
}

function responderQuiz(alternativa, botao) {
  if (quizRespondida) {
    return;
  }

  quizRespondida = true;

  const item = palavras[quizOrdem[quizIndice]];
  const correto = alternativa === item;
  const feedback = document.getElementById("quiz-feedback");

  if (correto) {
    quizAcertos++;
  }

  feedback.textContent = correto
    ? "Correto! DNA estabilizado."
    : `Errado. A resposta é ${item.palavra}.`;
  feedback.className = `feedback ${correto ? "acertou" : "errou"}`;

  document.querySelectorAll("#quiz-opcoes button").forEach((opcao) => {
    opcao.disabled = true;

    if (opcao.textContent === item.palavra) {
      opcao.classList.add("acertou");
    }
  });

  if (!correto) {
    botao.classList.add("errou");
  }

  document.getElementById("quiz-placar").textContent =
    `${quizAcertos} de ${palavras.length} acertos`;
}

function avancarQuiz() {
  quizIndice++;

  if (quizIndice >= quizOrdem.length) {
    const acertos = quizAcertos;
    iniciarQuiz();
    document.getElementById("quiz-feedback").textContent =
      `Rodada concluída: ${acertos} de ${palavras.length} acertos. Nova rodada iniciada.`;
    return;
  }

  mostrarPistaQuiz();
}

let anagramaOrdem = [];
let anagramaIndice = 0;
let anagramaAcertos = 0;
let anagramaRespondido = false;
let letrasDisponiveis = [];
let letrasEscolhidas = [];

function iniciarAnagrama() {
  anagramaOrdem = embaralhar(palavras.map((_, indice) => indice));
  anagramaIndice = 0;
  anagramaAcertos = 0;
  mostrarAnagrama();
}

function mostrarAnagrama() {
  anagramaRespondido = false;

  const item = palavras[anagramaOrdem[anagramaIndice]];

  letrasDisponiveis = embaralhar(item.palavra.split(""));
  letrasEscolhidas = [];

  document.getElementById("anagrama-pista").textContent =
    `${item.numero}. ${item.pista}`;
  document.getElementById("anagrama-placar").textContent =
    `${anagramaAcertos} de ${palavras.length} montagens`;

  const feedback = document.getElementById("anagrama-feedback");
  feedback.textContent = "";
  feedback.className = "feedback";

  renderizarLetrasAnagrama();
  atualizarRespostaAnagrama();
}

function renderizarLetrasAnagrama() {
  const container = document.getElementById("anagrama-letras");
  container.innerHTML = "";

  letrasDisponiveis.forEach((letra, indice) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = letra;
    botao.addEventListener("click", () => escolherLetraAnagrama(indice));
    container.appendChild(botao);
  });
}

function escolherLetraAnagrama(indice) {
  if (anagramaRespondido) {
    return;
  }

  letrasEscolhidas.push(letrasDisponiveis.splice(indice, 1)[0]);

  renderizarLetrasAnagrama();
  atualizarRespostaAnagrama();
}

function desfazerLetraAnagrama() {
  if (anagramaRespondido || letrasEscolhidas.length === 0) {
    return;
  }

  letrasDisponiveis.push(letrasEscolhidas.pop());

  renderizarLetrasAnagrama();
  atualizarRespostaAnagrama();
}

function atualizarRespostaAnagrama() {
  document.getElementById("anagrama-resposta").textContent =
    letrasEscolhidas.join("") || "—";
}

function conferirAnagrama() {
  if (anagramaRespondido) {
    return;
  }

  const item = palavras[anagramaOrdem[anagramaIndice]];
  const correto = letrasEscolhidas.join("") === item.palavra;
  const feedback = document.getElementById("anagrama-feedback");

  if (correto) {
    anagramaAcertos++;
    anagramaRespondido = true;
  }

  feedback.textContent = correto
    ? "Montagem correta! Sequência desbloqueada."
    : `Ainda não. A palavra correta é ${item.palavra}.`;
  feedback.className = `feedback ${correto ? "acertou" : "errou"}`;

  document.getElementById("anagrama-placar").textContent =
    `${anagramaAcertos} de ${palavras.length} montagens`;
}

function avancarAnagrama() {
  anagramaIndice++;

  if (anagramaIndice >= anagramaOrdem.length) {
    const acertos = anagramaAcertos;
    iniciarAnagrama();
    document.getElementById("anagrama-feedback").textContent =
      `Rodada concluída: ${acertos} de ${palavras.length} montagens. Nova rodada iniciada.`;
    return;
  }

  mostrarAnagrama();
}

let fotosGaleria = [];
let indiceLightbox = 0;
let elementoFocoAnterior = null;

function atualizarLightbox() {
  const foto = fotosGaleria[indiceLightbox];
  const imagem = document.getElementById("lightbox-imagem");
  imagem.src = foto.imagem;
  imagem.alt = foto.titulo;
  document.getElementById("lightbox-titulo").textContent = foto.titulo;
}

function abrirLightbox(indice) {
  elementoFocoAnterior = document.activeElement;
  indiceLightbox = indice;
  atualizarLightbox();
  document.getElementById("lightbox").hidden = false;
  document.getElementById("lightbox-fechar").focus();
}

function fecharLightbox() {
  document.getElementById("lightbox").hidden = true;
  if (elementoFocoAnterior && typeof elementoFocoAnterior.focus === "function") {
    elementoFocoAnterior.focus();
  }
}

function navegarLightbox(passo) {
  indiceLightbox =
    (indiceLightbox + passo + fotosGaleria.length) % fotosGaleria.length;
  atualizarLightbox();
}

function configurarGaleria() {
  const cards = document.querySelectorAll(".foto-card");

  fotosGaleria = Array.from(cards, (card) => ({
    imagem: card.dataset.imagem,
    titulo: card.dataset.titulo,
  }));

  if (!fotosGaleria.length) {
    return;
  }

  cards.forEach((card, indice) => {
    card.addEventListener("click", () => abrirLightbox(indice));
  });

  document
    .getElementById("lightbox-fechar")
    .addEventListener("click", fecharLightbox);
  document
    .getElementById("lightbox-anterior")
    .addEventListener("click", () => navegarLightbox(-1));
  document
    .getElementById("lightbox-proxima")
    .addEventListener("click", () => navegarLightbox(1));

  document
    .getElementById("lightbox")
    .addEventListener("click", (event) => {
      if (event.target.id === "lightbox") {
        fecharLightbox();
      }
    });

  document.addEventListener("keydown", (event) => {
    const lightbox = document.getElementById("lightbox");
    if (lightbox.hidden) {
      return;
    }

    if (event.key === "Escape") {
      fecharLightbox();
    } else if (event.key === "ArrowLeft") {
      navegarLightbox(-1);
    } else if (event.key === "ArrowRight") {
      navegarLightbox(1);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarTabuleiro();
  renderizarPistas();
  iniciarQuiz();
  iniciarAnagrama();
  configurarGaleria();

  document.getElementById("btn-conferir").addEventListener("click", conferir);
  document.getElementById("btn-reiniciar").addEventListener("click", reiniciar);
  document.getElementById("btn-quiz-proxima").addEventListener("click", avancarQuiz);
  document.getElementById("btn-anagrama-conferir").addEventListener("click", conferirAnagrama);
  document.getElementById("btn-anagrama-desfazer").addEventListener("click", desfazerLetraAnagrama);
  document.getElementById("btn-anagrama-nova").addEventListener("click", avancarAnagrama);
});
