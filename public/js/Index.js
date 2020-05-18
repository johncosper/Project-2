/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */

// Turn-Based Functionality
$(document).ready(function() {
  const data = $.get('/api/hero_data').then((data) => {
    console.log(data);
    render();
  });

  const player = {
    health: 100,
    power: 20,
    weapon: 10,
  };
  const pAttack = player.power + player.weapon;

  const potions = {
    count: 2,
    recovery: 10,
  };

  const opponent = {
    health: 10,
    power: 20,
    weapon: 10,
  };
  const oAttack = opponent.power + opponent.weapon;


  const attack = () => {
    const attackButton = document.getElementById('attack-button');
    const gameMessage = document.getElementById('game-message');

    // let playerAttack = determineAttack(player.power)
    const playerAttack = determineAttack(pAttack);
    opponent.health -= playerAttack;
    printToScreen();
    document.getElementById('battle-log').innerText =
  'You have delt ' + playerAttack + ' damage!';

    if (isGameOver(opponent.health)) {
      opponent.health = 0;
      printToScreen();
      endTurn('Congrats, you won son!');
      enemyCoords.forEach((coord, i, enemyCoords) => {
        if (coord.x - 1 <= hero.x && coord.x + 1 >= hero.x &&
           coord.y - 1 <= hero.y && coord.y + 1 >= hero.y ) {
          map[level][coord.y][coord.x] = 0;
          enemyCoords.splice(i, 1);
          map[level][hero.y][hero.x] = 2;
        }
      });
      if (enemyCoords.length === 0) {
        level++;
        console.log(level);
        enemyCoords = [
          {
            y: 13,
            x: 12,
          },
          {
            y: 7,
            x: 7,
          },
          {
            y: 8,
            x: 9,
          },
        ];
        hero = {
          x: 1,
          y: 1,
          isAlive: true,
        };
        render();
      }
      return;
    }

    attackButton.disabled = true;
    gameMessage.innerText = 'Its rumble time!';

    setTimeout(() =>{
    // let opponentAttack = determineAttack(opponent.power)
      const opponentAttack = determineAttack(oAttack);
      player.health -= opponentAttack;
      printToScreen();
      document.getElementById('battle-log').innerText =
    'Enemy has delt ' + opponentAttack + ' damage!';

      if (isGameOver(player.health)) {
        player.health = 0;
        printToScreen();
        endTurn('You are complete trash, how could you lose?');
        hero.isAlive = false;
        // Make pile of blood pixelart for Lada
        map[level][hero.x][hero.y] = 0;
        return;
      }
      attackButton.disabled = false;
    }, 500);

    console.log(playerAttack);
  };

  const health = () => {
    if (player.health <= 0 || opponent.health <= 0) {
      const potionButton = document.getElementById('health-button');
      potionButton.disabled = true;
      document.getElementById('game-message').innerText =
    'Potions are of no use now!';
    } else if (potions.count > 0) {
      potions.count -= 1;
      player.health += potions.recovery;
      printToScreen();
    } else {
      document.getElementById('game-message').innerText =
    'No more health potions!';
    }
  };


  const endTurn = (message) => {
    document.getElementById('game-message').innerText = message;
    document.getElementById('attack-button').hidden = true;
    document.getElementById('restart-button').hidden = false;
  };

  const determineAttack = (attack) => {
    return Math.floor(Math.random() * attack);
  // return Math.floor(Math.random() * power + weapon);
  };


  const isGameOver = (health) => {
    return health <= 0;
  };


  const restart = () => {
    isTimerPaused = false;
    hideShow();
    const attackButton = document.getElementById('attack-button');
    player.health = 100;
    opponent.health = 10;
    document.getElementById('game-message').innerText = '';
    attackButton.disabled = false;
    attackButton.hidden = false;
    document.getElementById('restart-button').hidden = true;
    document.getElementById('battle-log').innerText ='';
    printToScreen();
  };

  const printToScreen = () => {
    document.getElementById('opponent-health').innerText =
    opponent.health;

    document.getElementById('player-health').innerText =
    player.health;

    document.getElementById('player-attack').innerText =
    pAttack;

    document.getElementById('player-potions').innerText =
    potions.count;
  };

  printToScreen();

  function hideShow() {
    const map = document.getElementById('mapDiv');
    const turn = document.getElementById('turnDiv');
    const gameOver = document.getElementById('game-over');
    if (map.style.display === 'none') {
      map.style.display = 'block';
      turn.style.display = 'none';
      render();
      if (player.health <= 0) {
        gameOver.style.display = 'block';
      }
    } else {
      map.style.display = 'none';
      turn.style.display = 'block';
    }
  };

  // Map Functionality
  const container = document.getElementById('mapDiv');

  const level = 0;

  document.getElementById('level').innerText = level+1;

  const map = [[
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1],
    [1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1],
    [1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  ];

  const hero = {
    x: 1,
    y: 1,
    isAlive: true,
  };

  // const potion = [
  //   {
  //     y: 13,
  //     x: 3,
  //   },
  // ];

  // const weapon = [
  //   {
  //     y: 13,
  //     x: 5,
  //   },
  // ];

  const enemyCoords = [
    {
      y: 13,
      x: 12,
    },

    {
      y: 7,
      x: 7,
    },
  ];

  let isTimerPaused = false;

  function render() {
    container.innerHTML = '';
    for (let i = 0; i < map[level].length; i++) {
      for (let j = 0; j < map[level][i].length; j++) {
        let field = null;

        if (map[level][i][j] == 0) {
          field = document.createElement('div');
          field.setAttribute('id', 'green');
        } else if (map[level][i][j] == 1) {
          field = document.createElement('div');
          field.setAttribute('id', 'black');
        } else if (map[level][i][j] == 3) {
          field = document.createElement('div');
          field.setAttribute('id', 'enemy');
        } else {
          field = document.createElement('div');
          field.setAttribute('id', 'hero');
        }
        container.append(field);
      }
    }
  }

  document.addEventListener('keydown', (event) => {
    map[level][hero.y][hero.x] = 0;
    if (!isTimerPaused && hero.isAlive) {
      if (event.keyCode === 37 || event.keyCode === 65) { // left
        if (map[level][hero.y][hero.x - 1] === 3) {
        } else if (map[level][hero.y][hero.x - 1] !== 1) {
          hero.x--;
        }
      } else if (event.keyCode === 38 || event.keyCode === 87) { // up
        if (map[level][hero.y - 1][hero.x] === 3) {
        } else if (map[level][hero.y - 1][hero.x] !== 1) {
          hero.y--;
        }
      } else if (event.keyCode === 39 || event.keyCode === 68) { // right
        if (map[level][hero.y][hero.x + 1] === 3) {
        } else if (map[level][hero.y][hero.x + 1] !== 1) {
          hero.x++;
        }
      } else if (event.keyCode === 40 || event.keyCode === 83) { // down
        if (map[level][hero.y + 1][hero.x] === 3) {
        } else if (map[level][hero.y + 1][hero.x] !== 1) {
          hero.y++;
        }
      }

      map[level][hero.y][hero.x] = 2;

      render();
      checkBattle();
    }
  });
  function moveEnemy() {
    enemyCoords.forEach((coord, i) => {
      map[level][coord.y][coord.x] = 0;
      const randomMove = Math.floor(Math.random() * 4);
      if (randomMove === 0 && map[level][coord.y][coord.x - 1] !== 1) { // left
        enemyCoords[i].x--;
      } else if (randomMove === 1 && map[level][coord.y - 1][coord.x] !== 1) { // up
        enemyCoords[i].y--;
      } else if (randomMove === 2 && map[level][coord.y][coord.x + 1] !== 1) { // right
        enemyCoords[i].x++;
      } else if (randomMove === 3 && map[level][coord.y + 1][coord.x] !== 1) { // down
        enemyCoords[i].y++;
      }
      map[level][coord.y][coord.x] = 3;
    });
    render();
    checkBattle();
  }


  setInterval(() => {
    if (!isTimerPaused) {
      moveEnemy();
    }
  }, 500);


  function checkBattle() {
    let isBattle = false;
    isTimerPaused = true;
    enemyCoords.forEach((coord, i) => {
      if (coord.x - 1 <= hero.x && coord.x + 1 >= hero.x &&
         coord.y - 1 <= hero.y && coord.y + 1 >= hero.y ) {
        isBattle = true;
      }
    });

    if (isBattle && hero.isAlive) {
      hideShow();
    } else {
      isTimerPaused = false;
    }
  };
  // -------------------------------------------------------------------
  // -------------------------------------------------------------------
  // Canvas Chart
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
  // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      labels: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5'],
      datasets: [{
        label: 'Damage Dealt',
        // backgroundColor: 'rgb(100, 99, 132)',
        borderColor: 'rgb(90, 90, 250)',
        data: [0, 1, 2, 3, 4],
      }],
    },

    // Configuration options go here
    options: {},
  });
});
// -------------------------------------------------------------------
// -------------------------------------------------------------------
