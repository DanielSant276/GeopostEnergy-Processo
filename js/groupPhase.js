// debug para ver os times
function seeTeams() {
  console.log(teams);
}

// inicio dos jogos fase de grupos
function startGP(teams) {
  // desativa o botão enquanto os resultados estiverem sendo gerados
  document.getElementsByClassName("start-button-on")[0].style.display = "none";

  generatePoints(teams)
}

// gera os resultados dos jogos
async function generatePoints(teams) {
  // grupo
  for (let j = 0; j < 8; j++) {
    // jogos do grupo
    for (let k = 0; k < 2; k++) {
      // os gols serão de 0 a 3 porém, é gerado um valor de 0 a 100, e caso seja sorteado um dos valores presentes nos
      // ifs abaixo, é adicionado determinada de quantia ao valor final, como se fosse uma sorte ou desempenho extra
      // da equipe;
      let teamAGoals = Math.floor(Math.random() * 4);
      let teamAModifier = Math.floor(Math.random() * 100);
      if (teamAModifier == 35) {
        teamAGoals += 3;
      }
      else if (teamAModifier == 58) {
        teamAGoals += 2;
      }
      else if (teamAModifier == 15) {
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

      // essa parte pode ter ficado um pouco confusa mas foi a forma mais simples que eu pensei de separar os valores
      // j será o valor da equipe, i é a rodada e k é qual das duas partidas da rodada
      // groups eu predefini a ordem que os times irão se enfrentar, como tem 2 jogos por grupo, as 6 partidas estão 
      // já predefinidas
      let teamA = teams[j][groups[round][k][0]];
      let teamB = teams[j][groups[round][k][1]];

      if (teamA.Name == "Brasil") {
        teamAGoals = 20;
      }
      else if (teamB.Name == "Brasil") {
        teamBGoals = 20;
      }

      // console.log("Gols da " + teamA.Name + ": " + teamAGoals);
      // console.log("Modificador da " + teamA.Name + ": " + teamAModifier);
      // console.log("Gols da " + teamB.Name + ": " + teamBGoals);
      // console.log("Modificador da " + teamB.Name + ": " + teamBModifier);

      // determina os pontos de cada time
      if (teamAGoals > teamBGoals) {
        teamA.Points += 3;
      }
      else if (teamAGoals == teamBGoals) {
        teamA.Points += 1;
        teamB.Points += 1;
      }
      else {
        teamB.Points += 3;
      }

      // adiciona as quantidade de gols nos históricos
      teamA.Goals += teamAGoals - teamBGoals;
      teamB.Goals += teamBGoals - teamAGoals;

      // chama a função para atualizar o placar
      rewriteValuesGroupsPoints(teams[j], j, k);
      // atualiza o placar da partida
      rewriteValuesGroupsGames(teamA.Name, teamAGoals, teamB.Name, teamBGoals, groupsName[j], (round*2 + k + 1));
      // espera 5 segundos para o resultado do próximo jogo
      await timer(msTimer);
      console.log("");
    }
  }

  if (round < 2) {
    nextRound();
  }
  else {
    nextPhase();
  }
}

// escreve na tela os acontecimentos
function rewriteValuesGroupsGames(teamAName, teamAGoals, teamBName, teamBGoals, groupLetter, gameNumber) {
  let game = document.getElementById(`${groupLetter}-match`).getElementsByClassName(`game-${gameNumber}`)[0];
  
  // escreve as informações para o time A
  game.getElementsByClassName("team-goals")[0].innerHTML = teamAGoals;

  // escreve as informações para o time B
  game.getElementsByClassName("team-goals")[1].innerHTML = teamBGoals;
}

// reescreve os valores no placar dos grupos
function rewriteValuesGroupsPoints(teams, j, k) {
  let orderedValues = sortValues(teams, k);

  for (let i = 0; i < 4; i++) {
    let element = document.getElementById(`${groupsName[j]}-group`).getElementsByClassName("team row")[i];
    element.getElementsByClassName("team-image")[0].src = `./img/${orderedValues[i].Name}.svg`;
    element.getElementsByClassName("team-name")[0].innerHTML = orderedValues[i].Name;
    element.getElementsByClassName("team-points")[0].innerHTML = orderedValues[i].Points;
    element.getElementsByClassName("team-goals")[0].innerHTML = orderedValues[i].Goals;
  }
}

// reorganiza as arrays por ordem de pontos, gols, aleatório
function sortValues(teams, k) {
  // é necessário utilizar o slice(0) para que não modifique a array principal
  let sortValues = teams.slice(0);

  for (let i = 0; i < sortValues.length; i++) {
    sortValues.sort(function (a, b) {
      if (a.Points == b.Points) {
        if (a.Goals == b.Goals) {
          console.log("Necessário escolher aleatóriamente");
          // caso empate em número de gols organiza aleatoriamente
          return Math.random() - 0.5;
        }
        // caso empate organizar por gols
        return b.Goals - a.Goals;
      }
      // organiza por pontos
      return b.Points - a.Points;
    });
  }

  // salva a ordenação final
  if (round == 2 && k == 1) {
    orderedTeams.push(sortValues)
  }

  return sortValues
}

// habilita o botão para iniciar o próximo round
function nextRound() {
  // soma mais um no round
  round++;
  // reabilita o botão e troca seu texto
  document.getElementsByClassName("start-button-on")[0].style.display = "flex";
  document.getElementsByClassName("start-button-text")[0].innerHTML = "Iniciar rodada " + (round + 1);
}

// gera os classificados e inicia o próximo round 
function nextPhase() {
  // aparece o botão para ir pra próxima parte
  document.getElementsByClassName("start-button-on")[0].style.display = "flex";
  document.getElementsByClassName("start-button-text")[0].innerHTML = "Finalizar fase<br/>de grupos";
  document.getElementsByClassName("start-button-on")[0].onclick = function () { newTable(nextPhaseTeams) };

  let nextPhaseTeams = [];

  // configura os times para as oitavas
  for (let i = 0; i < 4; i++) {
    nextPhaseTeams.push([orderedTeams[i * 2][0], orderedTeams[(i * 2) + 1][1]]);
    nextPhaseTeams.push([orderedTeams[i * 2][1], orderedTeams[(i * 2) + 1][0]]);
  }

  // reorganiza a ordem das equipes na array para ordenar a formação dos times
  let nextPhaseTeamsOrganized = []
  let temp = []
  for (let i = 0; i < nextPhaseTeams.length; i += 2) {
    nextPhaseTeamsOrganized.push(nextPhaseTeams[i]);
    temp.push(nextPhaseTeams[i + 1]);
  }
  nextPhaseTeams = nextPhaseTeamsOrganized.concat(temp);

  console.log(nextPhaseTeams);
}