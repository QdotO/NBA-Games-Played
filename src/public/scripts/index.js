/******************************************************************************
 *                          Fetch and display Games Played Data
 ******************************************************************************/

displayGamesPlayedData();

function displayGamesPlayedData(firstName = 'Lebron', lastName = 'James') {
  httpGet(
    `/api/players/games-played?firstName=${firstName}&lastName=${lastName}`
  )
    .then((response) => response.json())
    .then((response) => {
      // Empty the anchor
      var anchor = document.getElementById('games-played-anchor');
      anchor.innerHTML = '';
      // Append data to anchor
      anchor.innerHTML = getGamesPlayedEle(response);
    });
}

function getGamesPlayedEle(response) {
  const {
    PlayerName,
    GamesPlayed: { Below50, Above50 },
  } = response;
  return `<div class="player-display-ele">
            <hr/>
            <div>Name: ${PlayerName}</div>
            <div class="player-data">
              Games Played: <br/>
              Above 50: ${Above50} Below 50: ${Below50}
            </div>
        </div>
    </div>`;
}

/******************************************************************************
 *                       Submit Player Details
 ******************************************************************************/

document.addEventListener(
  'click',
  function (event) {
    event.preventDefault();
    var ele = event.target;
    if (ele.matches('#submit-btn')) {
      submitPlayer();
    }
  },
  false
);

function submitPlayer() {
  let firstNameInput = document.getElementById('first-name-input');
  let lastNameInput = document.getElementById('last-name-input');
  displayGamesPlayedData(firstNameInput.value, lastNameInput.value);
}

function httpGet(path) {
  return fetch(path, getOptions('GET'));
}

function getOptions(verb, data) {
  var options = {
    dataType: 'json',
    method: verb,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  return options;
}
