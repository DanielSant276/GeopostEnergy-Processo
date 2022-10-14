// monta a tabela da fase de grupos
function roundPhase(teams, divClass, matchs) {
  // jogo o foco da visualização para a próxima parte
  document.getElementsByClassName("start-button-on")[0].style.display = "none";
  document.getElementsByClassName("round-phase")[0].scrollIntoView({ behavior: "smooth" });

  // posiciona as equipes nas posições específicas
  var div = document.getElementsByClassName(divClass)[0];
  for (let i = 0; i < matchs; i++) {
    // seleciona a caixa
    var box = div.getElementsByClassName("round-boxes")[i];

    // arruma os valores da primeira seleção
    box.getElementsByClassName("round-team-flag")[0].classList.remove("round-image-placeholher");
    box.getElementsByClassName("round-team-flag")[0].src = `./img/${teams[i][0].Name}.svg`;
    box.getElementsByClassName("round-team-name")[0].innerHTML = teams[i][0].Name;
    box.getElementsByClassName("round-team-goals")[0].innerHTML = 0;

    // arruma os valores da segunda seleção
    box.getElementsByClassName("round-team-flag")[1].classList.remove("round-image-placeholher");
    box.getElementsByClassName("round-team-flag")[1].src = `./img/${teams[i][1].Name}.svg`;
    box.getElementsByClassName("round-team-name")[1].innerHTML = teams[i][1].Name;
    box.getElementsByClassName("round-team-goals")[1].innerHTML = 0;
  }

  if (matchs == 8) {
    // inicia as oitavas de finais
    roundPoints(teams, divClass, 8);
  }
  else if (matchs == 4) {
    // inicia as quartas de finais
    roundPoints(teams, divClass, 4);
  }
  else if (matchs == 2) {
    // inicia as semifinais
    roundPoints(teams, divClass, 2);
  }
  else {
    // inicia a final
    roundPoints(teams, divClass, 1);
  }
}

// essa função faz sempre a computação das partidas, onde cada dois times se enfrentam e um deles é eliminado
// parte de penaltis também foi implementada
async function roundPoints(teams, divClass, matchs) {
  for (let i = 0; i < matchs; i++) {
    // os gols serão de 0 a 3 porém, é gerado um valor de 0 a 100, e caso seja sorteado um dos valores presentes nos
    // ifs abaixo, é adicionado determinada de quantia ao valor final, como se fosse uma sorte ou desempenho extra
    // da equipe;
    let teamAGoals = Math.floor(Math.random() * 4);
    let teamAModifier = Math.floor(Math.random() * 100);
    if (teamAModifier == 69) {
      teamAGoals += 3;
    }
    else if (teamAModifier == 38) {
      teamAGoals += 2;
    }
    else if (teamAModifier == 16) {
      teamAGoals += 1;
    }

    let teamBGoals = Math.floor(Math.random() * 4);
    let teamBModifier = Math.floor(Math.random() * 100);
    if (teamBModifier == 35) {
      teamBGoals += 3;
    }
    else if (teamBModifier == 58) {
      teamBGoals += 2;
    }
    else if (teamBModifier == 15) {
      teamBGoals += 1;
    }

    // Easter egg Brasil X Alemanha
    if (teams[i][0].Name == "Brasil" && teams[i][1].Name == "Alemanha") {
      teamAGoals = 7;
      teamBGoals = 1;
    }
    else if (teams[i][0].Name == "Alemanha" && teams[i][1].Name == "Brasil") {
      teamAGoals = 1;
      teamBGoals = 7;
    }

    // inicializa variável para penalts caso necessário
    let teamAPenalts = 0;
    let teamBPenalts = 0;
    if (teamAGoals == teamBGoals) {
      let result = penalts();
      teamAPenalts = result[0];
      teamBPenalts = result[1];

      if (matchs == 1 && teamAPenalts > teamBPenalts) {
        teamAFinalPenalts = teamAPenalts;
        teamBFinalPenalts = teamBPenalts;
      }
      else if (matchs == 1 && teamBPenalts > teamAPenalts) {
        teamAFinalPenalts = teamBPenalts;
        teamBFinalPenalts = teamAPenalts;
      }
    }

    // determina quem ganhou a partida
    if (teamAGoals > teamBGoals || teamAPenalts > teamBPenalts) {
      if (matchs == 1) {
        fillDataObject(teams[i][0].Token, teams[i][1].Token, teamAGoals, teamBGoals);
      }
      teams[i].splice(1, 1);
    }
    else {
      if (matchs == 1) {
        fillDataObject(teams[i][1].Token, teams[i][0].Token, teamBGoals, teamAGoals);
      }
      teams[i].splice(0, 1);
    }

    // espera 5 segundos para o resultado do próximo jogo
    await timer(msTimer);

    // reajusta o placar
    adjustTable(i, divClass, teamAGoals, teamBGoals, teamAPenalts, teamBPenalts);
  }

  nextphase(teams, matchs);
}

// função geradora de pênaltis, é gerado um valor de 0 a 5
function penalts() {
  console.log("ocorreu pênalti");
  let teamAGoals = 0;
  let teamBGoals = 0;

  // enquanto os valores forem iguais, é gerado novamente uma pontuação
  for (let i = 0; i < 5; i++) {
    // gera um chance de acerto para a e para b
    let goalChanceA = Math.floor(Math.random() * 100) + 1
    let goalChanceB = Math.floor(Math.random() * 100) + 1

    // se o valor gerado para A for maior que 50 A marca gol
    if (goalChanceA > 51) {
      teamAGoals++;
    }

    // se caso a seleção A não tiver marcado e a seleção B possuir mais gols, a seleção B não precisa jogar novamente
    if (teamAGoals < teamBGoals && i == 4) {
      console.log("terminado antes");
      break;
    }
    else {
      // se o valor gerado para B for maior que 50 B marca gol
      if (goalChanceB > 51) {
        teamBGoals++;
      }
    }

    // Se a diferença entre os dois time for maior que 3 o loop acaba
    if (teamAGoals - teamBGoals == 3 || teamBGoals - teamAGoals == 3) {
      console.log("diferença de 3");

      break;
    }

    // Se os dois times empatarem no final, é gerado mais um loop para desempate
    if (i == 4 && teamAGoals == teamBGoals) {
      i--;
    }
  }

  return [teamAGoals, teamBGoals]
}

// Ajusta as pontuações na tabela
function adjustTable(i, divClass, teamAGoals, teamBGoals, teamAPenalts, teamBPenalts) {
  // posiciona as equipes nas posições específicas
  var div = document.getElementsByClassName(divClass)[0];
  var box = div.getElementsByClassName("round-boxes")[i];

  // insere o resultado dos gols
  if (teamAPenalts != 0 || teamBPenalts != 0) {
    box.getElementsByClassName("round-team-goals")[0].innerHTML = `${teamAGoals} (${teamAPenalts})`;
    box.getElementsByClassName("round-team-goals")[1].innerHTML = `${teamBGoals} (${teamBPenalts})`;
  }
  else {
    box.getElementsByClassName("round-team-goals")[0].innerHTML = teamAGoals;
    box.getElementsByClassName("round-team-goals")[1].innerHTML = teamBGoals;
  }
}

// essa funcão identifica as fases e determina qual será a próxima
function nextphase(teams, matchs) {
  if (matchs == 8) {
    roundPhase(adjustTeams(teams, matchs), "quarter-round", 4);
  }
  else if (matchs == 4) {
    roundPhase(adjustTeams(teams, matchs), "semifinal-round ", 2);
  }
  else if (matchs == 2) {
    roundPhase(adjustTeams(teams, matchs), "final-round", 1);
  }
  else {
    finishCup(teams);
  }
}

// configura os times com base no round atual
function adjustTeams(teams, matchs) {
  console.log(teams);
  let nextPhaseTeams = [];

  for (let i = 0; i < matchs / 2; i++) {
    nextPhaseTeams.push([teams[i * 2][0], teams[(i * 2) + 1][0]]);
  }

  console.log(nextPhaseTeams);
  return nextPhaseTeams
}

// finaliza a competição
function finishCup(teams) {
  // posiciona as equipes nas posições específicas
  var championBox = document.getElementsByClassName("champion-box")[0];

  // arruma os valores da primeira seleção
  championBox.getElementsByClassName("round-team-flag")[0].classList.remove("round-image-placeholher");
  championBox.getElementsByClassName("round-team-flag")[0].src = `./img/${teams[0][0].Name}.svg`;
  championBox.getElementsByClassName("round-team-name")[0].innerHTML = teams[0][0].Name;

  post(data);
}

// preenche com os vencedores da última rodada
function fillDataObject(teamA, teamB, teamAGoals, teamBGoals) {
  data["equipeA"] = teamA;
  data["equipeB"] = teamB;
  data["golsEquipeA"] = teamAGoals;
  data["golsEquipeB"] = teamBGoals;
  data["golsPenaltyTimeA"] = teamAFinalPenalts;
  data["golsPenaltyTimeB"] = teamBFinalPenalts;
}