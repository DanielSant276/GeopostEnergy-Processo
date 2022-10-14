// divide as equipes em 8 grupos
let teams;

// nome dos grupos
let groupsName = ["a", "b", "c", "d", "e", "f", "g", "h"]

// controle de tempo
const timer = ms => new Promise(res => setTimeout(res, ms));
const msTimer = 2000;

// controle de rodada
let round = 0;

// controle das equipes 
let groups = [
  [[0, 1], [2, 3]],
  [[0, 2], [1, 3]],
  [[0, 3], [1, 2]]
]

// times ordenados
let orderedTeams = [];

// variável para guardar valores de pênaltis na final
let teamAFinalPenalts = 0;
let teamBFinalPenalts = 0;

// objeto para enviar no final
let data = {
  "equipeA": "",
  "equipeB": "",
  "golsEquipeA": "",
  "golsEquipeB": "",
  "golsPenaltyTimeA": "",
  "golsPenaltyTimeB": ""
}