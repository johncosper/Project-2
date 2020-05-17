/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */


const player = {
  health: 10,
  power: 20,
  weapon: 10,
};
const pAttack = player.power + player.weapon;

const potions = {
  count: 2,
  recovery: 10,
};

const opponent = {
  health: 100,
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
        map[coord.y][coord.x] = 0;
        enemyCoords.splice(i, 1);
        map[hero.y][hero.x] = 2;
      }
    });
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
      map[hero.x][hero.y] = 0;
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
  const attackButton = document.getElementById('attack-button');
  player.health = 100;
  opponent.health = 100;
  document.getElementById('game-message').innerText = '';
  attackButton.disabled = false;
  attackButton.hidden = false;
  document.getElementById('restart-button').hidden = true;
  document.getElementById('battle-log').innerText ='';
  printToScreen(); 
  isTimerPaused = false;
  hideShow();
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
