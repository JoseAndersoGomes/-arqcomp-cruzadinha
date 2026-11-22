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
