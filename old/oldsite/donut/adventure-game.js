// DOM ELEMENTS
let currentEnemy;
let randomEnemyNum;
let enemyKillCount = 0;
let currentWeaponArray;
let currentWeapon;
let statusTextElement = document.getElementById('status-text');
let textContainerElement = document.getElementById('text-container');

class Denizen {
  constructor(name, catchPhrases, statsBox) {
    this.name = name;
    this.health = 100;
    this.weapons = {};
    this.catchPhrases = catchPhrases;
    this.statsBox = statsBox;
  }
  talkSmack(){
    let randomPhrase = Math.floor(Math.random() * this.catchPhrases.length);
    statusTextElement.innerHTML += `</br> ${this.name}: ${this.catchPhrases[randomPhrase]}`;
    textContainerElement.scrollTop += 60
  }
  announceHealth(){
    statusTextElement.innerHTML += `</br> ${this.name} has ${this.health} health`;
    textContainerElement.scrollTop += 60
  }
  fight(target){
    this.talkSmack();
    target.announceHealth();
    statusTextElement.innerHTML += `</br> ${this.name} attacks! ${target.name} loses health.`;
    textContainerElement.scrollTop += 60;
    target.health -= this.weapons.weapon;
    if(target.health > 0) {
      target.announceHealth();
      this.setStats();
      target.setStats()
    } else {
      statusTextElement.innerHTML += `</br> YOU DIED TO A PIZZA RAT!`;
      textContainerElement.scrollTop += 60;
      document.getElementById('player-image').src = 'img/rip.jpeg';
    }
  }
  setStats() {
    document.getElementById(this.statsBox).innerHTML = `
    Name: ${this.name} </br>
    Health: ${this.health} </br>
    Weapons:
    `
  }
 }


class Hero extends Denizen {
  constructor(name, catchPhrases, statsBox) {
    super(name, catchPhrases, statsBox)
    this.health = 100;
    this.catchPhrases = catchPhrases;
    this.statsBox = statsBox;
    this.weapons = {
      sprinkleSpray: 5,
      sugarShock: 10,
      holeInOne: 25
    }
  }
  heal(){
    if(this.health < 100) {
      this.health += 5;
      statusTextElement.innerHTML += `</br> Healing!`
      textContainerElement.scrollTop += 60;

    } else {
      statusTextElement.innerHTML += `</br> At full health!`
      textContainerElement.scrollTop += 60;
    }
    this.setStats();
  }
  fight(target, weaponChoice){
    this.talkSmack();
    target.announceHealth();
    statusTextElement.innerHTML += `</br> ${this.name} attacks! ${target.name} loses ${this.weapons[weaponChoice]} health.`;
    textContainerElement.scrollTop += 60;
    target.health -= this.weapons[weaponChoice];
    target.fight(player);
    if(target.health > 0) {
      target.announceHealth();
      this.setStats();
      target.setStats()
    } else {
      statusTextElement.innerHTML += `</br> THEY DEAD! BRING ON THE NEXT ENEMY!`
      selectEnemy();
      textContainerElement.scrollTop += 60;
      enemyKillCount++;
      document.getElementById('killcount').innerHTML = `Enemies Killed: ${enemyKillCount}`;
    }
  }
}

class Enemy extends Denizen {
  constructor(name, weapons, statsBox) {
    super(name, weapons, statsBox)
    this.catchPhrases = [
      'i\'m youtube famous',
      'i\'m more dangerous than an uncovered sewer'
    ]
    this.weapons = weapons;
    this.statsBox = statsBox;
  }
  setStats(){
    document.getElementById(this.statsBox).innerHTML = `
    Name: ${this.name} </br>
    Health: ${this.health} </br>
    Weapons: ${JSON.stringify(this.weapons)}
    `
    // Had to look up JSON.stringify a little bit - I know we're getting into JSON stuff later, and I have a really tenative grip on how exactly JSON works, but I know it's basically transforming objects into a code that can be passed from one file to another?
  }
}

const player = new Hero('Donut', ['Here comes the donut!', 'I am donut'], 'player-statsbox')

const setWeaponBox = () => {
  let weaponsArray = Object.keys(player.weapons);
  let weapon1ButtonElement = document.getElementById('weapon1-button')
  let weapon2ButtonElement = document.getElementById('weapon2-button')
  let weapon3ButtonElement = document.getElementById('weapon3-button')
  let healButtonElement = document.getElementById('heal-button')
  weapon1ButtonElement.innerHTML = weaponsArray[0];
  weapon1ButtonElement.addEventListener('click', () => {
    player.fight(currentEnemy, weaponsArray[0])
  })
  weapon2ButtonElement.innerHTML = weaponsArray[1];
  weapon2ButtonElement.addEventListener('click', () => {
    player.fight(currentEnemy, weaponsArray[1])
  })
  weapon3ButtonElement.innerHTML = weaponsArray[2];
  weapon3ButtonElement.addEventListener('click', () => {
    player.fight(currentEnemy, weaponsArray[2])
  })
  healButtonElement.innerHTML = 'heal';
  healButtonElement.addEventListener('click', () => {
    player.heal()
  })
}


const enemy1 = new Enemy('Rony', {weapon: 15}, 'enemy-statsbox')
const enemy2 = new Enemy('Pizzaz', {weapon: 20}, 'enemy-statsbox')
const enemy3 = new Enemy('Ratso', {weapon: 50}, 'enemy-statsbox')

let enemyArray = [enemy1, enemy2, enemy3]

const selectEnemy = () => {
  randomEnemyNum = Math.floor(Math.random() * enemyArray.length);
  currentEnemy = enemyArray[randomEnemyNum];
  currentEnemy.health = 100;
  currentEnemy.setStats();
}

document.addEventListener('DOMContentLoaded', () => {
  player.setStats();
  selectEnemy()
  setWeaponBox();
  return currentEnemy;
})
