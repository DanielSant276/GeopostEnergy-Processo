

async function divideTeams() {
  // recebe as informações das equipes
  let allTeams = await get();

  // cria os grupos
  let groupsLength = 8;
  let groups = [];
  for (let i = 0; i < groupsLength; i++) {
    let newGroup = [];

    for (let j = 0; j < 4; j++) {
      let teamsRange = allTeams.length;
      let selectTeam = Math.floor(Math.random() * teamsRange);

      newGroup.push(allTeams[selectTeam]);

      allTeams.splice(selectTeam, 1)
    }

    groups.push(newGroup)
  }

  teams = insertProperty(groups);
  fillTableStart(groups);

  return groups
}

// cria duas novas propriedades para cada um dos times
function insertProperty(teams) {
  let teamsPoints = teams;

  for (let i = 0; i < teams.length; i++) {
    for (let j = 0; j < teams[i].length; j++) {
      teamsPoints[i][j] = { ...teamsPoints[i][j], "Points": 0, "Goals": 0 }
    }
  }

  return teamsPoints;
}

// preenche os espaços na tabela com os nomes das equipes
function fillTableStart(groups) {
  for (let i = 0; i < groups.length; i++) {
    let row = document.getElementById(groupsName[i] + "-group");
    for (let j = 0; j < groups[i].length; j++) {
      createTeamInTable(groups[i][j], row);
    }
  }

  createMatchInTable(groups);
}

// cria no html os espaços das equipes
function createTeamInTable(team, row) {
  // div das equipes
  let teamDiv = document.createElement("div");
  teamDiv.classList.add("team");
  teamDiv.classList.add("row");

  // div da imagem
  let imageDiv = document.createElement("div");
  imageDiv.classList.add("team-flag-box");
  // tag da imagem
  let imgTag = document.createElement("img");
  imgTag.classList.add("team-image");
  // src da imagem
  imgTag.src = `./img/${team.Name}.svg`;
  // adicionando a imagem a div
  imageDiv.appendChild(imgTag);
  // adicionando a div da imagem a div da equipe
  teamDiv.appendChild(imageDiv);

  let classP = ["team-name", "team-points", "team-goals"];
  let textP = [team.Name, team.Points, team.Goals]

  for (let j = 0; j < classP.length; j++) {
    let p = document.createElement("p");
    p.classList.add(classP[j]);
    p.innerHTML = textP[j];
    teamDiv.appendChild(p);
  }

  // adiciona a div da equipe na div do grupo
  row.appendChild(teamDiv);
}

function createMatchInTable(team) {
  let groups = [
    [[0, 1], [2, 3]],
    [[0, 2], [1, 3]],
    [[0, 3], [1, 2]]
  ]

  // grupo
  for (let i = 0; i < 8; i++) {
    // rodada
    let row = document.getElementById(groupsName[i] + "-match");
    for (let j = 0; j < 3; j++) {
      // jogos
      for (let k = 0; k < 2; k++) {
        let teamA = team[i][groups[j][k][0]];
        let teamB = team[i][groups[j][k][1]];

        // div das partidas
        let teamDiv = document.createElement("div");
        teamDiv.classList.add("game-" + ((j * 2) + k + 1));
        teamDiv.classList.add("team");
        teamDiv.classList.add("row");

        // div da imagem do time A
        let imageDivA = document.createElement("div");
        imageDivA.classList.add("team-flag-box");
        // tag da imagem
        let imgTagA = document.createElement("img");
        imgTagA.classList.add("team-image");
        // src da imagem
        imgTagA.src = `./img/${teamA.Name}.svg`;
        // adicionando a imagem a div
        imageDivA.appendChild(imgTagA);
        // adiciona na div da partida
        teamDiv.appendChild(imageDivA);

        // tag da quantidade de gols da equipe
        let pA = document.createElement("p");
        pA.classList.add("team-goals");
        // adicionado gols da equipe A
        pA.innerHTML = teamA.Goals;
        // adiciona na div da partida
        teamDiv.appendChild(pA);

        // tag da quantidade de gols da equipeB
        let pB = document.createElement("p");
        pB.classList.add("team-goals");
        // adicionado gols da equipe A
        pB.innerHTML = teamB.Goals;
        // adiciona na div da partida
        teamDiv.appendChild(pB);
        

        // div da imagem do time B
        let imageDivB = document.createElement("div");
        imageDivB.classList.add("team-flag-box");
        // tag da imagem
        let imgTagB = document.createElement("img");
        imgTagB.classList.add("team-image");
        // src da imagem
        imgTagB.src = `./img/${teamB.Name}.svg`;
        // adicionando a imagem a div
        imageDivB.appendChild(imgTagB);
        
        // adicionando a div da imagem a div da partida
        teamDiv.appendChild(imageDivB);

        // adiciona a div da partida na div do grupo
        row.appendChild(teamDiv);
      }
    }
  }
}

divideTeams()