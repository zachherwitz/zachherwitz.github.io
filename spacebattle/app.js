// PSUEDOCODE
// What do we need?
// 1x User Controlled Spaceship (class or object?)
// 6x Enemies (make an enemy class and either a factory or individually create the enemy object)
// Turn system/listener
// Win Condition: 6 enemies destroyed
// Lose Condition: Retreat or be destroyed

// Game Loop:
  // User Attacks Target
  // IF Target is destroyed, Shift() (maybe) the target out of the enemyArray and allow User to either attack next ship or retreat
  // ELSE Target is not destroyed, target attacks User
  // IF User is destroyed, game over
  // ELSE Game continues

// Global Variables Here
let enemyArray = [];
let ifHit = true;
let accuracyVal = 0;
let randomNameNum;
let randomHullNum;
let randomFirepowerNum;
let randomAccuracyNum;
let enemyName;
let enemyKillCount = 0;
const enemyNameArray = [
  'Zenith',
  'Vision',
  'Malevolent',
  'Aquitaine',
  'Millenium',
  'SSE Falling Star',
  'LWSS Arrow Flight',
  'ISS Gallimimus',
  'CS Harmony',
  'SSE Black Sparrow',
  'Jellyfish',
  'Defiance',
  'Sunder',
  'Emissary',
  'Leo',
  'CS Trident',
  'LWSS Aquila',
  'SC Rhinoceros',
  'USS Badger',
  'LWSS The Paladin',
  'Pathfinder',
  'Xerxes',
  'Watcher',
  'Battlestar',
  'Thunderbolt',
  'LWSS Aries',
  'SSE Cydonia',
  'BS Strike',
  'HWSS Big Daddy',
  'CS Little Rascal',
]
let enemyImageElementArray = [];



// Creating parent class
class Ship {
  constructor(name, hull, firepower, accuracy){
    this.name = name;
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }
  fight(){
    accuracyVal = Math.random();
    (Math.random() < this.accuracy) ? ifHit = true : ifHit = false;
    if(enemyArray[0].hull - this.firepower > 0) {
      if(ifHit){
        enemyArray[0].hull -= this.firepower;
        document.getElementById('stats-container').innerHTML += `</br>*Fighting ${enemyArray[0].name}! It was a hit for ${this.firepower} damage!`;
        console.log(`Fighting ${enemyArray[0].name}! It was a hit for ${this.firepower} damage!`)
        enemyArray[0].fight();
      } else if (!ifHit) {
        document.getElementById('stats-container').innerHTML += `</br>*Fighting ${enemyArray[0].name}! You missed!`
        console.log(`Fighting ${enemyArray[0].name}! You missed!`);
        enemyArray[0].fight();
      }
    } else {
      document.getElementById('stats-container').innerHTML += `</br>**  ${enemyArray[0].name} destroyed!`
      console.log(`%c ${enemyArray[0].name} destroyed!`, 'font-size: 1.5em; color: red');
      if(enemyArray.length > 1) {
        destroyEnemy();
        displayEnemy();
        displayStats();
        askForInput();
      } else {
        winGame();
      }

    }
  }
}

// Creating child class for Player Character
class Player extends Ship {
  constructor(name, hull, firepower, accuracy){
    super(name, hull, firepower, accuracy)
    this.missileCount = 4
  }
  retreat(){
    restartGame()
  }
  heal(){
    let randomHealNum = Math.ceil(Math.random() * 5);
    this.hull+= randomHealNum;
    console.log(`Healing for ${randomHealNum}. You have ${player.hull} HP`);
    enemyArray[0].fight();
  }
  useMissiles() {
    if(this.missileCount > 0) {
      this.missileCount--;
      enemyArray[0].hull -= 10;
      document.getElementById('stats-container').innerHTML += `</br>Using missile. Missile Count: ${this. missileCount}`
      document.getElementById('stats-container').innerHTML += `</br>${enemyArray[0].name} destroyed!`
      console.log(`Using missile. Missile Count: ${this. missileCount}`);
      console.log(`%c ${enemyArray[0].name} destroyed!`, 'font-size: 1.5em; color: red');
      if(enemyArray.length > 1) {
        destroyEnemy();
        displayEnemy();
        displayStats();
        askForInput();
      } else {
        winGame();
      }
    } else {
      console.log('No more missiles!');
    }
  }
}

// Creating child class for Enemy Units
class Enemy extends Ship {
  constructor(name, hull, firepower, accuracy) {
    super(name, hull, firepower, accuracy)
  }
  fight(){
    accuracyVal = Math.random();
    (Math.random() < this.accuracy) ? ifHit = true : ifHit = false;
    if(ifHit) {
      if(player.hull > 1) {
        player.hull -= this.firepower;
        console.log(`${this.name} attacked! They hit for ${this.firepower} damage!`);
        displayStats();
        askForInput();
      } else {
        document.getElementById('stats-container').innerHTML += `</br>${this.name} attacked! Fatal hit!`
        document.getElementById('stats-container').innerHTML += `</br>You killed ${enemyKillCount} enemy ships!`
        document.getElementById('stats-container').innerHTML += '</br>******  You died!'

        console.log(`${this.name} attacked! Fatal hit!`);
        console.log(`You killed ${enemyKillCount} enemy ships!`)
        console.log('You died!');
        restartGame();
      }
    } else {
      document.getElementById('stats-container').innerHTML += `</br>${this.name} attacked! They missed!`
      console.log(`${this.name} attacked! They missed!`);
      displayStats();
      askForInput();
    }
  }
}


// Kill Enemy Function
const destroyEnemy = () => {
  enemyArray.shift();
  // console.log('shifting');
  enemyKillCount++;
  enemyImageElementArray[0].remove();
  enemyImageElementArray.shift();
}

const randomizeEnemyName = () => {
  randomNameNum = Math.floor(Math.random() * enemyNameArray.length)
  enemyName = enemyNameArray[randomNameNum];
  return enemyName;
}

const randomizeEnemyHull = () => {
  randomHullNum = Math.floor((Math.random() * 4) + 5)
  return randomHullNum;
}

const randomizeEnemyFirepower = () => {
  randomFirepowerNum = Math.floor((Math.random() * 3) + 2)
  return randomFirepowerNum;
}

const randomizeEnemyAccuracy = () => {
  randomAccuracyNum = (Math.random() * .2) + .6;
  return randomAccuracyNum;
}

// const createEnemyElement = (index) => {
//   document.createElement('img');
// }

// Enemy factory
class EnemyFactory {
  constructor(numberOfEnemies, imageSrc){
    this.numberOfEnemies = numberOfEnemies;
    this.imageSrc = 'images/enemyship.png';
  }
  createEnemyElement(index){
    let img = document.createElement('img');
    img.id = `enemyShip${index}`;
    img.src = this.imageSrc;
    img.style.width = '75px';
    img.style.height = '75px';
    document.getElementById('enemy-container').appendChild(img);
    enemyImageElementArray.push(img);
  }
  generateEnemy(){
    for(let i = 0; i < this.numberOfEnemies; i++) {
      randomizeEnemyName();
      randomizeEnemyHull();
      randomizeEnemyFirepower();
      randomizeEnemyAccuracy();
      this.createEnemyElement(i);
      const newEnemy = new Enemy(enemyName, randomHullNum, randomFirepowerNum, randomAccuracyNum);
      enemyArray.push(newEnemy)
    }
  }
}

// Creating instance of Player
const player = new Player('LSS Bongo Blob', 20, 5, 0.7);

// Creating instance of EnemyFactory
let randomEnemyAmount = Math.floor(Math.random() * 4) + 3;
const factory = new EnemyFactory(randomEnemyAmount);
factory.generateEnemy();

const displayEnemy = () => {
  console.log(`%c Now fighting ${enemyArray[0].name}`, 'color: yellow; font-style: italic;');
}

const displayStats = () => {
  let statsBoxElement = document.getElementById('stats-container');
  console.log(`%c ${enemyArray[0].name} has ${enemyArray[0].hull} HP. You have ${player.hull} HP`, 'color: yellow');
  statsBoxElement.innerHTML += `<br></br>****${enemyArray[0].name} has ${enemyArray[0].hull} HP. You have ${player.hull} HP****`
  statsBoxElement.scrollBy(0, 200)
  document.getElementById('enemies-killed').innerHTML = `ENEMIES KILLED: ${enemyKillCount}`
}

const askForInput = () => {
  console.log(`%c What should we do? player.fight()? player.heal()? player.useMissiles()? Or player.retreat()?`, 'color: lightgreen');
}

const winGame = () => {
  console.log('YOU WIN!');
  for(let i = 0; i < 50; i++) {
    document.getElementById('stats-container').innerHTML += `YOU WIN!YOU WIN!YOU WIN!YOU WIN!YOU WIN!YOU WIN!</br>YOU WIN!YOU WIN!YOU WIN!YOU WIN!YOU WIN!YOU WIN!!</br>`
    document.getElementById('stats-container').scrollBy(0, 200);
  }
  console.log(`You killed ${enemyKillCount} enemy ships!`)
  let promptResponse = prompt('Would you like to play again? Type Yes to restart.')
  if(promptResponse !== null && promptResponse.toLowerCase() === 'yes'){
    restartGame()
  }
}

const reloadPage = () => {
  location.reload();
}

const restartGameCountdownClock = (element) => {
  element.style.backgroundPosition = "center";
  element.style.backgroundRepeat = "no-repeat";
  element.style.backgroundSize = "contain";
}

const restartGame = () => {
  let backgroundImageElement = document.getElementById('main-container');
  console.log(`Restarting game in...`)
  setTimeout(() => {
    console.log(3),
    backgroundImageElement.style.backgroundImage = "url('images/countdown-3.png')";
    restartGameCountdownClock(backgroundImageElement);
  }, 0)
  setTimeout(() => {
    console.log(2)
    backgroundImageElement.style.backgroundImage = "url('images/countdown-2.png')";
    restartGameCountdownClock(backgroundImageElement);
  }, 1000)
  setTimeout(() => {
    console.log(1)
    backgroundImageElement.style.backgroundImage = "url('images/countdown-1.png')";
    restartGameCountdownClock(backgroundImageElement);
  }, 2000)
  setTimeout(reloadPage, 3000)
}

const startGameText = () => {
    document.getElementById('stats-container').innerHTML = `**Welcome, Captain of the ${player.name}. We have an urgent crisis that needs attending, so we brought in our best. You.`
    document.getElementById('stats-container').innerHTML += `</br></br>**We have ${enemyArray.length} hostile ships approaching US Space Force Central Command. Preliminary scouting has returned the following information:`
}

console.log(`Welcome, captain of the ${player.name}. We have an urgent crisis that needs attending, so we brought in our best. You.`);
console.log(`We have ${enemyArray.length} hostile ships approaching US Space Force Central Command. Preliminary scouting has returned the following information:`);
console.log(`${enemyArray[0].name} is fast approaching. Vitals: ${enemyArray[0].hull} HP. ${enemyArray[0].firepower} Firepower. ${enemyArray[0].accuracy} Accuracy.`);
console.log(`Advance knowledge lets you see the entire squardron:`);
console.log(enemyArray);
startGameText();
displayStats();
askForInput();
