// Global DOM Elements
let statsBoxElement = document.getElementById('stats-box');
let calendarBoxElement = document.getElementById('calendar-box');
let textBoxElement = document.getElementById('text-box');
let textInputFieldElement = document.getElementById('text-input-field');
let toolboxImageIelement = document.getElementById('toolbox-image');
let toolboxTextElement = document.getElementById('toolbox-text');

let lawn1Element = document.getElementById('lawn-1');
let lawn2Element = document.getElementById('lawn-2');
let lawn3Element = document.getElementById('lawn-3');
let lawn4Element = document.getElementById('lawn-4');

// Global Elements
let inputValue = ''; // Variable that holds whatever input the user typed
let pressedEnterBool = false;
let day = 0;
let fatigueLimit = 4; // Set To Whatever
let fatigueClock;
let randomName = '';
let tickCounter = 0;
let tickArray = [0, 0, 0, 0]
let merchantBool = false;

// Color Array?
let colorArray = ['#b3ffb3', '#80ff80', '#1aff1a', '#00b300', '#008000', 'black']

let randomNameArray = ['Allison','Arthur','Ana','Alex','Arlene','Alberto','Barry','Bertha','Bill','Bonnie','Bret','Beryl','Chantal','Cristobal','Claudette','Charley','Cindy','Chris','Dean','Dolly','Danny','Danielle','Dennis','Debby','Erin','Edouard','Erika','Earl','Emily','Ernesto','Felix','Fay','Fabian','Frances','Franklin','Florence','Gabielle','Gustav','Grace','Gaston','Gert','Gordon','Humberto','Hanna','Henri','Hermine','Harvey','Helene','Iris','Isidore','Isabel','Ivan','Irene','Isaac','Jerry','Josephine','Juan','Jeanne','Jose','Joyce','Karen','Kyle','Kate','Karl','Katrina','Kirk','Lorenzo','Lili','Larry','Lisa','Lee','Leslie','Michelle','Marco','Mindy','Maria','Michael','Noel','Nana','Nicholas','Nicole','Nate','Nadine','Olga','Omar','Odette','Otto','Ophelia','Oscar','Pablo','Paloma','Peter','Paula','Philippe','Patty','Rebekah','Rene','Rose','Richard','Rita','Rafael','Sebastien','Sally','Sam','Shary','Stan','Sandy','Tanya','Teddy','Teresa','Tomas','Tammy','Tony','Van','Vicky','Victor','Virginie','Vince','Valerie','Wendy','Wilfred','Wanda','Walter','Wilma','William','Kumiko','Aki','Miharu','Chiaki','Michiyo','Itoe','Nanaho','Reina','Emi','Yumi','Ayumi','Kaori','Sayuri','Rie','Miyuki','Hitomi','Naoko','Miwa','Etsuko','Akane','Kazuko','Miyako','Youko','Sachiko','Mieko','Toshie','Junko']

// Creating Tool Class
class Tool {
  constructor(name, price, output, durability, image) {
    this.name = name;
    this.price = price;
    this.output = output;
    this.durability = durability;
    this.image = image;
  }
}

const teeth = new Tool ('teeth', 0, 1, 1000, 'images/tools-teeth.jpg')
const scissors = new Tool ('rusty scissors', 5, 5, 50, 'images/tools-scissors.png')
const pushMower = new Tool ('push lawnmower', 25, 50, 25, 'images/tools-push-lawnmower.jpg')
const batteryMower = new Tool ('battery lawnmower', 250, 100, 10, 'images/tools-battery-lawnmower.jpg')
const students = new Tool ('students', 500, 250, 5, 'images/tools-students.png')

// Creating Player/Goat Class
const player = {
  name: '',
  wallet: 0,
  tools: [teeth],
  renown: 0,

  incrementWallet() {
    this.wallet += this.tools[0].output;
    switch(true) {
      case ((this.wallet > 4 ) && (this.wallet < 25)):
        textBoxElement.innerHTML += `</br>A merchant has appeared with new goods. Type 'merchant' to see her wares!`;
        textBoxElement.scrollTop += 50;
        break;
      case ((this.wallet > 24 ) && (this.wallet < 250)):
        textBoxElement.innerHTML += `</br>A merchant has appeared with new goods. Type 'merchant' to see her wares!`;
        textBoxElement.scrollTop += 50;
        break;
      case ((this.wallet > 249 ) && (this.wallet < 500)):
        textBoxElement.innerHTML += `</br>A merchant has appeared with new goods. Type 'merchant' to see her wares!`;
        textBoxElement.scrollTop += 50;
        break;
      case ((this.wallet > 499 ) && (this.wallet < 1000)):
        textBoxElement.innerHTML += `</br>A merchant has appeared with new goods. Type 'merchant' to see her wares!`;
        textBoxElement.scrollTop += 50;
        break;
      case (this.wallet > 999):
        winGame()
        break;
    }
  }
};

// Creating Lawn Class
class Lawn {
  constructor(name, id, fatigue, isFatigued, eventHandler, tickArrayIndex) {
    this.name = name;
    this.id = id;
    this.fatigue = fatigue;
    this.isFatigued = isFatigued;
    this.eventHandler = eventHandler;
    this.tickArrayIndex = tickArrayIndex;
  }

  // if it is not fatigued, when you click it, it should become fatigued
  setFatigue = () => {
    if (this.isFatigued === false) {
      document.getElementById(this.id).style.backgroundColor = '#e6ffe6';
      document.getElementById(this.id).removeEventListener('click', this.eventHandler);
      // document.getElementById(this.id).innerHTML = 'DONE';
      this.isFatigued = true;
      fatigueClock = setInterval(this.incrementFatigue, 500);
      tickArray[this.tickArrayIndex] = tickCounter;
      console.log(`THIS IS THE TICK ARRAY INDEX: ${tickArray[this.tickArrayIndex]}`);
      console.log(`DEBUGGING : CALLING SET FATIGUE ON ${this.name}, FATIGUE FALSE -> TRUE`);
    } else if (this.isFatigued){
      this.fatigue = 0;
      this.isFatigued = false;
      // document.getElementById(this.id).style.backgroundColor = 'green';
      document.getElementById(this.id).addEventListener('click', this.eventHandler);
      console.log(`DEBUGGING : CALLING SET FATIGUE ON ${this.name}, FATIGUE TRUE -> FALSE`);
      // document.getElementById(this.id).innerHTML = 'READY';
    }
  }

  incrementFatigue = () => {
    if(this.fatigue < fatigueLimit && this.isFatigued) {
      // console.log('regrowing')
      this.regrowLawn();
      // this.fatigue++;
      // console.log(this.fatigue);
    } else {
      console.log(`${this.name} clearing interval`);
      clearInterval(fatigueClock);
      this.setFatigue()
    };
  };

  regrowLawn = () => {
    if (tickCounter - 4 === this.tickArrayIndex) {
      console.log('REVERTING NOW TO CLICKABLE');
      tickArray[this.tickArrayIndex] = 0;
      console.log(`TICK ARRAY BACK TO ${tickArray[this.tickArrayIndex]}`)
    }
    this.fatigue++;
    document.getElementById(this.id).style.backgroundColor = colorArray[this.fatigue];
    console.log(`regrowing ${this.name} - fatigue at ${this.fatigue}`);
    advanceDay();
  }
}

const registerLawnClick1 = () => {
  console.log('clicked lawn 1');
  lawn1.setFatigue();
  player.incrementWallet();
  advanceDay();
}

const registerLawnClick2 = () => {
  console.log('clicked lawn 2');
  lawn2.setFatigue();
  player.incrementWallet();
  advanceDay();
}

const registerLawnClick3 = () => {
  console.log('clicked lawn 3');
  lawn3.setFatigue();
  player.incrementWallet();
  advanceDay();
}

const registerLawnClick4 = () => {
  console.log('clicked lawn 4');
  lawn4.setFatigue();
  player.incrementWallet();
  advanceDay();
}

const lawn1 = new Lawn ('lawn1', 'lawn-1', 0, false, registerLawnClick1, 0)
const lawn2 = new Lawn ('lawn2', 'lawn-2', 0, false, registerLawnClick2, 1)
const lawn3 = new Lawn ('lawn3', 'lawn-3', 0, false, registerLawnClick3, 2)
const lawn4 = new Lawn ('lawn4', 'lawn-4', 0, false, registerLawnClick4, 3)

const startGame = () => {
  setInterval(tickClock, 1000)
  console.log(player);
  inputValue = '';
  textInputFieldElement.addEventListener('keyup', enterName);
  setStats();
  textBoxElement.innerHTML = "Starting New Game. To begin the game, please type your name, and hit ENTER. For command tips, type 'help', or type 'random' for a random name!";

}

// Set Stats anytime something changes or updates
const setStats = () => {
  // console.log('setting stats');
  statsBoxElement.innerHTML = `
    NAME: ${player.name.toUpperCase()} </br>
    WALLET: $${player.wallet} </br>
  `
  calendarBoxElement.innerHTML = `${day}`;
  toolboxTextElement.innerHTML = `
    TOOL: ${player.tools[0].name} </br>
    OUTPUT: ${player.tools[0].output}
  `;
  toolboxImageIelement.src = player.tools[0].image;
}

const enterText = (e) => {
  if (e.keyCode == '13') {
    if (textInputFieldElement.value.toLowerCase() == 'restart') {
      restartGame();
      textInputFieldElement.value = '';
    } else if (textInputFieldElement.value.toLowerCase() == 'clear') {
      clearTextBox();
      textInputFieldElement.value = '';
    } else if (textInputFieldElement.value.toLowerCase() == 'help') {
      showHelpTips();
      textInputFieldElement.value = ''
    } else if (textInputFieldElement.value.toLowerCase() == 'cheat'){
      player.tools.unshift(students)
      textInputFieldElement.value = ''
    } else if (textInputFieldElement.value.toLowerCase() == 'buy rusty scissors' && player.wallet >= 2) {
      buyScissors();
      textInputFieldElement.value = '';
    } else if (textInputFieldElement.value.toLowerCase() == 'buy push lawnmower' && player.wallet >= 25) {
      buyPushMower();
      textInputFieldElement.value = '';
    } else if (textInputFieldElement.value.toLowerCase() == 'buy battery lawnmower' && player.wallet >= 250) {
      buyBatteryMower();
      textInputFieldElement.value = '';
    } else if (textInputFieldElement.value.toLowerCase() == 'buy students' && player.wallet >= 500) {
      buyStudents();
      textInputFieldElement.value = '';
    } else if (textInputFieldElement.value.toLowerCase() == 'merchant') {
      showMerchantWares();
      textInputFieldElement.value = '';
    } else {
      inputValue = textInputFieldElement.value.toLowerCase();
      textInputFieldElement.value = '';
      console.log(`input submitted: ${inputValue}`);
      pressedEnterBool = true;
      return inputValue;
    }
  };
};

const randomizeName = () => {
  let randomNameNum = Math.floor(Math.random() * randomNameArray.length);
  randomName = randomNameArray[randomNameNum];
  inputValue = randomName;
}

const enterName = (e) => {
  enterText(e);
  if (pressedEnterBool) {
    if (inputValue == 'random') {
      randomizeName()
      player.name = inputValue;
    } else {
      player.name = inputValue;
    }
    setStats();
    textInputFieldElement.removeEventListener('keyup', enterName);
    textInputFieldElement.addEventListener('keyup', enterText);
    setLawns();
  };
  // Initialize Lawns
};

const restartGame = () => {
  location.reload();
}

const setLawns = () => {
  lawn1Element.style.backgroundColor = "green";
  lawn1Element.addEventListener('click', registerLawnClick1)
  // lawn2Element.style.backgroundColor = "green";
  // lawn2Element.addEventListener('click', registerLawnClick2)
  // lawn3Element.style.backgroundColor = "green";
  // lawn3Element.addEventListener('click', registerLawnClick3)
  // lawn4Element.style.backgroundColor = "green";
  // lawn4Element.addEventListener('click', registerLawnClick4)
}

const clearTextBox = () => {
    textBoxElement.innerHTML = 'Text Box Cleared';
}

const showHelpTips = () => {
  textBoxElement.innerHTML += `</br>Type 'clear' to clear text box`;
  textBoxElement.innerHTML += `</br>Type 'restart' to restart game!`;
}

const advanceDay = () => {
  // console.log('Advancing Day');
  textBoxElement.innerHTML += `</br>It's a new day!`;
  textBoxElement.scrollTop += 50;
  day++;
  setStats();
}

const buyScissors = () => {
  textBoxElement.innerHTML += `</br>You bought the rusty scissors!`;
  player.tools.unshift(scissors);
  player.wallet -= scissors.price;
  setStats();
}

const buyPushMower = () => {
  textBoxElement.innerHTML += `</br>You bought the push lawnmower!`;
  player.tools.unshift(pushMower);
  player.wallet -= pushMower.price;
  setStats();
}

const buyBatteryMower = () => {
  textBoxElement.innerHTML += `</br>You bought the battery lawnmower!`;
  player.tools.unshift(batteryMower);
  player.wallet -= batteryMower.price;
  setStats();
}

const buyStudents = () => {
  textBoxElement.innerHTML += `</br>You bought the help of the students!`;
  player.tools.unshift(students);
  player.wallet -= students.price;
  setStats();
}

const showMerchantWares = () => {
  textBoxElement.innerHTML = `MERCHANT'S GOODS`;
  textBoxElement.innerHTML += `</br>Type: buy ${scissors.name} : ${scissors.price}`;
  textBoxElement.innerHTML += `</br>Type: buy ${pushMower.name} : ${pushMower.price}`;
  textBoxElement.innerHTML += `</br>Type: buy ${batteryMower.name} : ${batteryMower.price}`;
  textBoxElement.innerHTML += `</br>Type: buy ${students.name} : ${students.price}`;
}

const winGame = () => {
  for(let i = 0; i < 100; i++){
    textBoxElement.innerHTML += 'YOU WIN!!!!!!!!'
  }
}

const tickClock = () => {
  tickCounter++;
  // console.log(`Tick Tock: ${tickCounter}`)
}

startGame();
