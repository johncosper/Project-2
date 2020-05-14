
const player = {
  health: 100,
  power: 20,
  weapon: 10,
};
const pAttack = player.power + player.weapon;

const opponent = {
  health: 100,
  power: 20,
  weapon: 10,
};
const oAttack = opponent.power + opponent.weapon;


const attack = () => {
  const attackButton = document.getElementById('attack-button');
  const healthButton = document.getElementById('health-button');
  const restartButton = document.getElementById('restart-button');
  const gameMessage = document.getElementById('game-message');

  // let playerAttack = determineAttack(player.power)
  const playerAttack = determineAttack(pAttack);
  opponent.health -= playerAttack;
  printToScreen();

  if (isGameOver(opponent.health)) {
    opponent.health = 0;
    printToScreen();
    endGame('Congrats, you won son!');
    return;
  }

  const healthPotion =

    attackButton.disabled = true;
  gameMessage.innerText = 'Its rumble time!';

  setTimeout(() =>{
    // let opponentAttack = determineAttack(opponent.power)
    const opponentAttack = determineAttack(oAttack);
    player.health -= opponentAttack;
    printToScreen();

    if (isGameOver(player.health)) {
      player.health = 0;
      printToScreen();
      endGame('You are complete trash, how could you lose?');
      return;
    }
    attackButton.disabled = false;
  }, 500);

  console.log(playerAttack);
};

const endGame = (message) => {
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
  printToScreen();
};

const printToScreen = () => {
  document.getElementById('opponent-health').innerText =
    opponent.health;

  document.getElementById('player-health').innerText =
    player.health;

  document.getElementById('player-attack').innerText =
    pAttack;
};

printToScreen();
