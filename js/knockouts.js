// variável para guardar valores de pênaltis nas finais
let teamAPenalts = 0;
let teamBPenalts = 0;

// nextPhaseTeams
function newTable(teams) {
  // modifica a tabela para mostrar os jogos para a próxima etapa
  let groupsName = ["A", "B", "C", "D", "E", "F", "G", "H"];
  for (let i = 0; i < 8; i++) {
    var table = document.getElementsByClassName(groupsName[i])[0]
    for (let j = 0; j < 2; j++) {
      table.getElementsByTagName("th")[0].innerHTML = ""
      table.getElementsByTagName("tr")[j + 1].getElementsByTagName("td")[0].innerHTML = teams[i][j].Name
      table.getElementsByTagName("tr")[3].remove()
    }
  }

  // modifica o texto do log
  let roundText = document.getElementsByClassName("match-header")[0];
  roundText.innerHTML = "Oitavas";

  document.getElementsByClassName("teamA-name")[0].innerHTML = "";
  document.getElementsByClassName("teamA-goals")[0].innerHTML = "";
  document.getElementsByClassName("teamB-name")[0].innerHTML = "";
  document.getElementsByClassName("teamB-goals")[0].innerHTML = "";
  document.getElementsByClassName("team-x")[0].style.display = "none";
  document.getElementsByClassName("team-x")[1].style.display = "none";
  document.getElementsByClassName("result")[0].innerHTML = "";

  // iniciar oitavas
  document.getElementsByClassName("start-button")[0].innerHTML = "Iniciar oitavas";
  document.getElementsByClassName("start-button")[0].onclick = function () { firstRound(teams) };
}

// inicia as oitavas de finais
function firstRound(teams) {
  document.getElementsByClassName("start-button")[0].style.display = "none";
  document.getElementsByClassName("team-x")[0].style.display = "flex";
  document.getElementsByClassName("team-x")[1].style.display = "flex";

  roundPoints(teams, 8)
}

// inicia as quartas de finais
function secondRound(teams) {
  document.getElementsByClassName("start-button")[0].style.display = "none";
  document.getElementsByClassName("team-x")[0].style.display = "flex";
  document.getElementsByClassName("team-x")[1].style.display = "flex";

  roundPoints(teams, 4)
}

// inicia as semifinais
function semifinalRound(teams) {
  document.getElementsByClassName("start-button")[0].style.display = "none";
  document.getElementsByClassName("team-x")[0].style.display = "flex";
  document.getElementsByClassName("team-x")[1].style.display = "flex";

  roundPoints(teams, 2)
}

// inicia a final
function finalRound(teams) {
  document.getElementsByClassName("start-button")[0].style.display = "none";
  document.getElementsByClassName("team-x")[0].style.display = "flex";
  document.getElementsByClassName("team-x")[1].style.display = "flex";

  roundPoints(teams, 1)
}

// essa função faz sempre a computação das partidas, onde cada dois times se enfrentam e um deles é eliminado
// parte de penaltis também foi implementada
async function roundPoints(teams, matchs) {
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

    let teamA = teams[i][0];
    let teamB = teams[i][1];

    console.log("Gols da " + teamA.Name + ": " + teamAGoals);
    console.log("Modificador da " + teamA.Name + ": " + teamAModifier);
    console.log("Gols da " + teamB.Name + ": " + teamBGoals);
    console.log("Modificador da " + teamB.Name + ": " + teamBModifier);

    // determina os pontos de cada time
    let result;
    if (teamAGoals > teamBGoals) {
      teams[i].splice(1, 1);
      result = teamA.Name;
    }
    else if (teamAGoals == teamBGoals) {
      result = "drawn";
    }
    else {
      teams[i].splice(0, 1);
      result = teamB.Name;
    }

    // atualiza o log da partida
    log(teamA.Name, teamAGoals, teamB.Name, teamBGoals, result);
    // espera 5 segundos para o resultado do próximo jogo
    await timer(msTimer);
    // caso tenha dado empate, ocorre os penalts
    if (result == "drawn") {
      penalts(teams[i], teamA.Name, teamB.Name, matchs);
      await timer(msTimer);
    }

    // reajusta a indicação da rodada que está acontecendo
    let roundText = document.getElementsByClassName("match-header")[0];
    if (matchs == 8) {
      roundText.innerHTML = "Oitavas";
    }
    else if (matchs == 4) {
      roundText.innerHTML = "Quartas";
    }
    else if (matchs == 2) {
      roundText.innerHTML = "Semifinais";
    }
    else {
      roundText.innerHTML = "Final";
    }
    console.log("");
  }
  // inicia a próxima fase
  nextphase(teams, matchs);
}

// essa funcão identifica as fases e determina qual será a próxima
function nextphase(teams, matchs) {
  if (matchs == 8) {
    adjustForSecondRound(adjustTeams(teams, matchs));
  }
  else if (matchs == 4) {
    adjustForSemiFinals(adjustTeams(teams, matchs));
  }
  else if (matchs == 2) {
    adjustForFinal(adjustTeams(teams, matchs));
  }
  else {
    finishCup(teams);
  }
}

// função geradora de pênaltis, é gerado um valor de 0 a 5
function penalts(teams, teamA, teamB, matchs) {
  console.log("ocorreu pênalti");
  let teamAGoals = 0;
  let teamBGoals = 0;

  while (teamAGoals != teamBGoals) {
    teamAGoals = Math.floor(Math.random() * 6);
    teamBGoals = Math.floor(Math.random() * 6);
  }

  // dependendo de quem fez mais pontos é gerado um vencedor
  let winner;
  if (teamAGoals > teamBGoals) {
    winner = teamA;
    teams.splice(1, 1);
  }
  else {
    winner = teamB;
    teams.splice(0, 1);
  }

  // reorganiza o header do round para exibir que ocorreu um pênalti
  let roundText = document.getElementsByClassName("match-header")[0];
  if (matchs == 8) {
    roundText.innerHTML = "Oitavas - Pênalti";
  }
  else if (matchs == 4) {
    roundText.innerHTML = "Quartas - Pênalti";
  }
  else if (matchs == 2) {
    roundText.innerHTML = "Semifinais - Pênalti";
  }
  else {
    roundText.innerHTML = "final - Pênalti";
    teamAPenalts = teamAGoals;
    teamBPenalts = teamBGoals;
  }

  // chama o log para demonstrar o balor dos pênaltis
  log(teamA, teamAGoals, teamB, teamBGoals, winner);
}

// ajusta as informações da tela para as quartas de finais
function adjustForSecondRound(teams) {
  // modifica o texto do log
  let roundText = document.getElementsByClassName("match-header")[0];
  roundText.innerHTML = "Quartas";

  document.getElementsByClassName("teamA-name")[0].innerHTML = "";
  document.getElementsByClassName("teamA-goals")[0].innerHTML = "";
  document.getElementsByClassName("teamB-name")[0].innerHTML = "";
  document.getElementsByClassName("teamB-goals")[0].innerHTML = "";
  document.getElementsByClassName("team-x")[0].style.display = "none";
  document.getElementsByClassName("team-x")[1].style.display = "none";
  document.getElementsByClassName("result")[0].innerHTML = "";
  document.getElementsByClassName("start-button")[0].style.display = "flex";

  // iniciar quartas
  document.getElementsByClassName("start-button")[0].innerHTML = "Iniciar quartas";
  document.getElementsByClassName("start-button")[0].onclick = function () { secondRound(teams) };
}

// ajusta as informações da tela para as semifinais
function adjustForSemiFinals(teams) {
  // modifica o texto do log
  let roundText = document.getElementsByClassName("match-header")[0];
  roundText.innerHTML = "Semifinais";

  document.getElementsByClassName("teamA-name")[0].innerHTML = "";
  document.getElementsByClassName("teamA-goals")[0].innerHTML = "";
  document.getElementsByClassName("teamB-name")[0].innerHTML = "";
  document.getElementsByClassName("teamB-goals")[0].innerHTML = "";
  document.getElementsByClassName("team-x")[0].style.display = "none";
  document.getElementsByClassName("team-x")[1].style.display = "none";
  document.getElementsByClassName("result")[0].innerHTML = "";
  document.getElementsByClassName("start-button")[0].style.display = "flex";

  // iniciar quartas
  document.getElementsByClassName("start-button")[0].innerHTML = "Iniciar Semifinais";
  document.getElementsByClassName("start-button")[0].onclick = function () { semifinalRound(teams) };
}

// ajusta as informações da tela para a final
function adjustForFinal(teams) {
  // modifica o texto do log
  let roundText = document.getElementsByClassName("match-header")[0];
  roundText.innerHTML = "Final";

  document.getElementsByClassName("teamA-name")[0].innerHTML = "";
  document.getElementsByClassName("teamA-goals")[0].innerHTML = "";
  document.getElementsByClassName("teamB-name")[0].innerHTML = "";
  document.getElementsByClassName("teamB-goals")[0].innerHTML = "";
  document.getElementsByClassName("team-x")[0].style.display = "none";
  document.getElementsByClassName("team-x")[1].style.display = "none";
  document.getElementsByClassName("result")[0].innerHTML = "";
  document.getElementsByClassName("start-button")[0].style.display = "flex";

  // iniciar quartas
  document.getElementsByClassName("start-button")[0].innerHTML = "Iniciar Final";
  document.getElementsByClassName("start-button")[0].onclick = function () { finalRound(teams) };
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
  console.log(teams);
  // modifica o texto do log
  let roundText = document.getElementsByClassName("match-header")[0];
  roundText.innerHTML = "A campeão da Copa do mundo de 2022 é " + teams[0][0].Name;

  document.getElementsByClassName("teamA-name")[0].innerHTML = "";
  document.getElementsByClassName("teamA-goals")[0].innerHTML = "";
  document.getElementsByClassName("teamB-name")[0].innerHTML = "";
  document.getElementsByClassName("teamB-goals")[0].innerHTML = "";
  document.getElementsByClassName("team-x")[0].style.display = "none";
  document.getElementsByClassName("team-x")[1].style.display = "none";
  document.getElementsByClassName("result")[0].innerHTML = "";
}