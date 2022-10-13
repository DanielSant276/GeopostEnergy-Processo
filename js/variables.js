// divide as equipes em 8 grupos
let teams;

// nome dos grupos
let groupsName = ["a", "b", "c", "d", "e", "f", "g", "h"]

// controle de tempo
const timer = ms => new Promise(res => setTimeout(res, ms));
const msTimer = 10;

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