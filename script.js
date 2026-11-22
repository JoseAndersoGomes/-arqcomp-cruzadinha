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

document.addEventListener("DOMContentLoaded", () => {
  renderizarTabuleiro();
  renderizarPistas();
});
