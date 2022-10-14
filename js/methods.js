// Faz uma requisição HTTP GET para a API e recebe os nomes das seleções e seus tokens
async function get() {
  let url = "https://estagio.geopostenergy.com/WorldCup/GetAllTeams";
  let gitUser = "DanielSant276";
  let teams;

  await $.ajax({
    url: url,
    method: "GET",
    headers: { "git-user": gitUser },
    success: function (data) {
      teams = data;
    },
    error: function (error) {
      console.log(error);
    }
  });

  return teams.Result
}

// Faz uma requisição HTTP POST
async function post(data) {
  let url = "https://estagio.geopostenergy.com/WorldCup/InsertFinalResult";
  let gitUser = "DanielSant276";
  let response = data;

  console.log(response);

  await $.ajax({
    url: url,
    method: "POST",
    headers: { "git-user": gitUser },
    data: JSON.stringify(data),
    success: function (data) {
      console.log(data);
    },
    error: function (error) {
      console.log(error);
    },
    contentType: "application/json",
    dataType: 'json'
  });
}