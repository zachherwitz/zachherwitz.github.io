// DOM Element Variables
let visitorIDElement;
let visitorTimerElement;
let gameOverElement;
let callListElement;
let dialogueBoxElement;
let textContainerElement;
let pointsElement;
let clockElement;

// DOM Element Variables - Buttons
let startButtonElement;
let acceptButtonElement;
let declineButtonElement;
let listButtonElement;

// Points Related Variables
let pointsCount = 50;

// Variables
let newVisitor;
let visitorIndex;
let timeInHours;
let visitorTimer;
let visitorTimerInterval;
let morningList;
let randomBool;

// Visitor Arrays
let visitorVIPLog = [];
let visitorBlacklistLog = [];
let visitorExpectedLog = [];
let visitorUnexpectedLog = [];

// Create Time Counter
let clockCount = 0;

// Visitor Class
class Visitor {
  constructor(name, waitTime, expectedBool, vipBool, blacklistBool) {
    this.name = name;
    this.waitTime = waitTime;
    this.expectedBool = expectedBool;
    this.vipBool = vipBool;
    this.blacklistBool = blacklistBool;
  };
};

// Create List of Visitors
const zoraMoncada = new Visitor("Zora Moncada", 6, true, true, false)
const willisHayter = new Visitor("Willis Hayter", 6, true, false, false)
const tamalaHaberle = new Visitor("Tamala Haberle", 6, true, true, false);
const katelynTinkham = new Visitor("Katelyn Tinkham", 6, true, false, true);
const divinaLeon = new Visitor("Divina Leon", 6, true, false, false);
const leonaraShambo = new Visitor("Leonora Shambo", 6, true, false, false);
const danieleCerrone = new Visitor("Daniele Cerrone", 6, true, false, false);
const hsiuBarnette = new Visitor("Hsiu Barnette", 6, true, true, false);
const christopherMacgillivray = new Visitor("Christoper Macgillivray", 6, true, false, false);
const caridadVince = new Visitor("Caridad Vince", 6, true, false, true);
const jessicaWeaver = new Visitor("Jessica Weaver", 6, true, false, true);
const jadynWarren = new Visitor("Jadyn Warren", 6, true, false, true);
const karlieFirecross = new Visitor("Karlie Firecross", 6, true, false, true);
const julianHerwitz = new Visitor("Julian Herwitz", 6, true, false, true);
const zachHerwitz = new Visitor("Zach Herwitz", 6, true, false, true); 

const visitorArray = [zoraMoncada, willisHayter, tamalaHaberle, katelynTinkham, divinaLeon, leonaraShambo, danieleCerrone, hsiuBarnette, christopherMacgillivray, caridadVince, jessicaWeaver, jadynWarren, karlieFirecross, julianHerwitz, zachHerwitz];

// Timer Function
// TODO: Make this better lol
const tick = () => {
  console.log('Tick Tock')
  clockCount++;

  if(clockCount === 0) {
    timeInHours = '7:00 AM';
  } else if (clockCount === 1) {
    timeInHours = '7:30 AM';
  } else if (clockCount === 2) {
    timeInHours = '8:00 AM';
  } else if (clockCount === 3) {
    timeInHours = '8:30 AM';
  } else if (clockCount === 4) {
    timeInHours = '9:00 AM';
  } else if (clockCount === 5) {
    timeInHours = '9:30 AM';
  } else if (clockCount === 6) {
    timeInHours = '10:00 AM';
  } else if (clockCount === 7) {
    timeInHours = '10:30 AM';
  } else if (clockCount === 8) {
    timeInHours = '11:00 AM';
  } else if (clockCount === 9) {
    timeInHours = '11:30 AM';
  } else if (clockCount === 10) {
    timeInHours = '12:00 PM';
  } else if (clockCount === 11) {
    timeInHours = '12:30 PM';
  } else if (clockCount === 12) {
    timeInHours = '1:00 PM';
  } else if (clockCount === 13) {
    timeInHours = '1:30 PM';
  } else if (clockCount === 14) {
    timeInHours = '2:00 PM';
  } else if (clockCount === 15) {
    timeInHours = '2:30 PM';
  } else if (clockCount === 16) {
    timeInHours = '3:00 PM';
  } else if (clockCount === 17) {
    timeInHours = '3:30 PM';
  } else if (clockCount === 18) {
    timeInHours = '4:00 PM';
  } else if (clockCount === 19) {
    timeInHours = '4:30 PM';
  } else if (clockCount === 20) {
    timeInHours = '5:00 PM';
  } else if (clockCount === 21) {
    timeInHours = '5:30 PM';
  } else if (clockCount === 22) {
    timeInHours = '6:00 PM';
  } else if (clockCount === 23) {
    timeInHours = '6:30 PM';
  } else if (clockCount === 24) {
    timeInHours = '7:00 PM';
  } else {
    timeInHours = 'Into Overtime';
  };

  clockElement.innerHTML = `Time: ${timeInHours}`;
};

// Shuffle Array
// https://gomakethings.com/how-to-shuffle-an-array-with-vanilla-js/
const shuffle = array => {

	let currentIndex = array.length;
	let temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	};
	return array;
};

// Set Game UI
const setElement = () => {
  callListElement.style.display = 'none';

  visitorIDElement = document.getElementById('visitor-id');
  visitorTimerElement = document.getElementById('visitor-timer')
  acceptButtonElement = document.getElementById('accept-button');
  declineButtonElement = document.getElementById('decline-button');
  listButtonElement = document.getElementById('list-button')
  pointsElement = document.getElementById('points');
	clockElement = document.getElementById('timer');
  gameoverElement = document.getElementById('gameover');
  textContainerElement = document.getElementById('text-container');

  pointsElement.innerHTML = 'Job Performance: ' + pointsCount + '%';
  clockElement.innerHTML = 'Time: 7:00 AM';
};

// End Game UI
const endGame = () => {
	visitorIDElement.style.display = 'none';
  visitorTimerElement.style.display = 'none';
  startButtonElement.style.display = 'none';
  acceptButtonElement.style.display = 'none';
  listButtonElement.style.display = 'none';
  declineButtonElement.style.display = 'none';
  pointsElement.style.display = 'none';
  clockElement.style.display = 'none';
  textContainerElement.style.display = 'none';
	
	gameoverElement.style.display = 'block';
};

// Set Timed Coutdown for Visitor
const setVisitorTimer = () => {
  visitorTimer = newVisitor.waitTime;
  visitorTimerInterval = setInterval(function() {
    visitorTimer--;
    visitorTimerElement.innerHTML = 'Visitor Will Wait: ' + visitorTimer;
    console.log('Visitor Time: ' + visitorTimer);
    if(visitorTimer === 0){
      clearInterval(visitorTimerInterval);
      console.log(newVisitor.name + ' has left');
      pointsCount -= 10;
      pointsElement.innerHTML = 'Job Performance: ' + pointsCount + '%';
      acceptButtonElement.style.display = 'none';
      declineButtonElement.style.display = 'none';
      listButtonElement.style.display = 'none';
      if(pointsCount <= 0) {
				endGame();
			};
      nextVisitorDelay();
    };
  }, 500);
};

// Pull Next Visitor from visitorArray
const nextVisitor = () => {
	if(visitorArray.length) {
  	newVisitor = visitorArray[0];
		
		acceptButtonElement.style.display = 'inline-block';  
    declineButtonElement.style.display = 'inline-block';
    listButtonElement.style.display = 'inline-block';

		setVisitorTimer();
	
		visitorIDElement.innerHTML = newVisitor.name;
		acceptButtonElement.setAttribute('onClick', 'acceptVisitor()')
    declineButtonElement.setAttribute('onClick', 'declineVisitor()')
    listButtonElement.setAttribute('onClick', 'showList()');
	
		visitorArray.shift();
		} else {
		console.log('NO VISITORS LEFT');
	};
};

// Add Delay to Next Visitor
const nextVisitorDelay = () => {
	visitorIDElement.innerHTML = 'No Visitors';
	visitorTimerElement.innerHTML = '- - - - - -';
	let visitorDelay = Math.ceil(Math.random() * 3) * 1000;
	console.log('Visitor Delay: ' + visitorDelay);
	setTimeout(nextVisitor, visitorDelay);
};

// Upon Accepting Visitor
const acceptVisitor = () => {
  if(newVisitor.vipBool) {
    pointsCount += 25;
    if(pointsCount >= 100) {
      pointsCount = 100;
    }
    console.log('VIP ACCEPTED');
    pointsElement.innerHTML = 'Job Performance: ' + pointsCount + '%';
  } else if (newVisitor.blacklistBool) {
    pointsCount -= 25;
    pointsElement.innerHTML = 'Job Performance: ' + pointsCount + '%';
    console.log('BLACKLIST ACCEPTED');
  } else if (newVisitor.expectedBool) {
    pointsCount += 10;
    if(pointsCount >= 100) {
      pointsCount = 100;
    }
    pointsElement.innerHTML = 'Job Performance: ' + pointsCount + '%';
    console.log('VISITOR ACCEPTED');
	} else if (!newVisitor.expectedBool) {
		pointsCount -= 10;
    pointsElement.innerHTML = 'Job Performance: ' + pointsCount + '%';
    console.log('WRONG VISITOR ACCEPTED');
  };

  // End Game at 0% Job Performance
	if(pointsCount <= 0) {
		endGame();
	};
	acceptButtonElement.style.display = 'none';  
  declineButtonElement.style.display = 'none';
  listButtonElement.style.display = 'none';
  clearInterval(visitorTimerInterval);
  nextVisitorDelay();
};

// Upon Declining Visitor
const declineVisitor = () => {
  if(newVisitor.vipBool) {
    pointsCount -= 25;
    console.log('VIP REJECTED');
    pointsElement.innerHTML = 'Job Performance: ' + pointsCount + '%';
  } else if (newVisitor.blacklistBool) {
    pointsCount += 25;
    if(pointsCount >= 100) {
      pointsCount = 100;
    }
    pointsElement.innerHTML = 'Job Performance: ' + pointsCount + '%';
    console.log('BLACKLIST REJECTED');
  } else if (!newVisitor.expectedBool) {
    pointsCount += 10;
    if(pointsCount >= 100) {
      pointsCount = 100;
    }
    pointsElement.innerHTML = 'Job Performance: ' + pointsCount + '%';
    console.log('VISITOR REJECTED');
	} else if (newVisitor.expectedBool) {
		pointsCount -= 10;
    pointsElement.innerHTML = 'Job Performance: ' + pointsCount + '%';
    console.log('WRONG VISITOR REJECTED');
	};
  // End Game at 0% Job Performance
	if(pointsCount <= 0) {
		endGame();
	};
	acceptButtonElement.style.display = 'none';  
  declineButtonElement.style.display = 'none';
  listButtonElement.style.display = 'none';
  clearInterval(visitorTimerInterval);
  nextVisitorDelay();
};

// Show Visitor List
const showList = () => {
  callListElement.style.display = 'inline-block';
  setTimeout(function(){callListElement.style.display = 'none'}, 3000);
  pointsCount -= 5;
  pointsElement.innerHTML = 'Job Performance: ' + pointsCount + '%';
  if(pointsCount <= 0) {
		endGame();
	};
};

// Create True/False value for Visitor keys
const generateRandomVisitorBool = () => {
	randomBool = Math.ceil(Math.random() * 2)
	if(randomBool == 1) {
		return true;
	} else if (randomBool == 2) {
		return false;
	};
};

// Create Morning Visitor List
const generateMorningList = () => {
	for(let i = 0; i < visitorArray.length; i++) {
    // Assign True/False to Visitor keys
    visitorArray[i].expectedBool = generateRandomVisitorBool();
		visitorArray[i].vipBool = generateRandomVisitorBool();
    visitorArray[i].blacklistBool = generateRandomVisitorBool();
    visitorArray[i].waitTime = Math.ceil(Math.random() * 5) + 3;

    // Push each Visitor to appropriate Array
		if(visitorArray[i].vipBool && visitorVIPLog.length <= 3) {
			visitorVIPLog.push(visitorArray[i].name)
		} else if (visitorArray[i].blacklistBool && visitorBlacklistLog.length <= 3) {
			visitorBlacklistLog.push(visitorArray[i].name)
		} else if (visitorArray[i].expectedBool) {
			visitorExpectedLog.push(visitorArray[i].name);
		} else if (visitorArray[i].expectedBool && visitorArrray[i].vipBool && visitorArray[i].blacklistBool){
			visitorArray[i].vipBool = false;
			visitorArray[i].blacklistBool = false;
			visitorExpectedLog.push(visitorArray[i].name); 
		} else {
			visitorUnexpectedLog.push(visitorArray[i].name);
		}
	};
  
  // Create the Morning Visitor Log string
	visitorVIPLog = visitorVIPLog.join('<br />')
	visitorBlacklistLog = visitorBlacklistLog.join('<br />')
	visitorExpectedLog = visitorExpectedLog.join('<br />')
  visitorUnexpectedLog = visitorUnexpectedLog.join('<br />')
	morningList = "VIPs: " + '<br />' + visitorVIPLog + '<br />' + '<br />' + "Expected Visitors: " + '<br />' + visitorExpectedLog + '<br />' + '<br />' + "Blacklisted Visitors: " + '<br />' +  visitorBlacklistLog;
  
  return morningList;
};

// Function to Begin Visitor Arrival
const beginDay = () => {
  setElement();
  dialogueBoxElement.innerHTML = '';
  nextVisitorDelay();
  setInterval(tick, 2000);
};

// Function to Begin Game when Start Button is clicked
const startGame = () => {
	startButtonElement = document.getElementById('start-button');
	startButtonElement.style.display = 'none';
	shuffle(visitorArray);
  generateMorningList();
  
  dialogueBoxElement = document.getElementById('dialogue-box');
  callListElement = document.getElementById('call-list');
  dialogueBoxElement.innerHTML = "BOSS: PAY ATTENTION. HERE'S MY VISITOR LIST. DON'T FUCK IT UP.";
	callListElement.innerHTML = morningList;

	setTimeout(beginDay, 5000);
};