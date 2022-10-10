async function divideTeams() {
  // recebe as informações das equipes
  let allTeams = await get();
  console.log(allTeams)
  // nome dos grupos
  const groupsArr = ["A", "B", "C", "D", "E", "F", "G", "H"];

  // cria os grupos
  let groups = {};
  for (let i = 0; i < groupsArr.length; i++) {
    let newGroup = [];

    for (let j = 0; j < 4; j++) {
      let teamsRange = allTeams.length;
      let selectTeam = Math.floor(Math.random() * teamsRange);

      newGroup.push(allTeams[selectTeam]);

      allTeams.splice(selectTeam, 1)
    }
    
    groups[groupsArr[i]] = newGroup
  }

  console.log(groups)
}

divideTeams()

