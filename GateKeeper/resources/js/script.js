// Create and Set Element Variables
let visitorIDElement;
let visitorTimerElement;
let startButtonElement;
let acceptButtonElement;
let declineButtonElement;
let pointsElement;
let pointsCount = 50;
let newVisitor;
let clockElement;
let visitorIndex;
let timeInHours;
let visitorTimer;
let visitorTimerInterval;
let gameoverElement;
let callListElement;
let visitorVIPLog = [];
let visitorBlacklistLog = [];
let visitorExpectedLog = [];
let visitorUnexpectedLog = [];
let morningList;
let randomBool;

// Create Time Counter
let clockCount = 0;

// Visitor Class
class Visitor {
  constructor(name, id, waitTime, expectedBool, vipBool, blacklistBool) {
    this.name = name;
    this.id = id;
    this.waitTime = waitTime;
    this.expectedBool = expectedBool;
    this.vipBool = vipBool;
    this.blacklistBool = blacklistBool;
  } 
}

// Create List of Visitors
const zoraMoncada = new Visitor("Zora Moncada", 1, 10, true, true, false)
const willisHayter = new Visitor("Willis Hayter", 2, 10, true, false, false)
const tamalaHaberle = new Visitor("Tamala Haberle", 3, 10, true, true, false);
const katelynTinkham = new Visitor("Katelyn Tinkham", 4, 10, true, false, true);
const divinaLeon = new Visitor("Divina Leon", 5, 10, true, false, false);
const leonaraShambo = new Visitor("Leonora Shambo", 6, 10, true, false, false);
const danieleCerrone = new Visitor("Daniele Cerrone", 7, 10, true, false, false);
const hsiuBarnette = new Visitor("Hsiu Barnette", 8, 10, true, true, false);
const christopherMacgillivray = new Visitor("Christoper Macgillivray", 9, 10, true, false, false);
const caridadVince = new Visitor("Caridad Vince", 10, 10, true, false, true);
const jessicaWeaver = new Visitor("Jessica Weaver", 10, 10, true, false, true);
const jadynWarren = new Visitor("Jadyn Warren", 10, 10, true, false, true);
const karlieFirecross = new Visitor("Karlie Firecross", 10, 10, true, false, true);
const julianHerwitz = new Visitor("Julian Herwitz", 10, 10, true, false, true);
const zachHerwitz = new Visitor("Zach Herwitz", 10, 10, true, false, true); 

const visitorArray = [zoraMoncada, willisHayter, tamalaHaberle, katelynTinkham, divinaLeon, leonaraShambo, danieleCerrone, hsiuBarnette, christopherMacgillivray, caridadVince, jessicaWeaver, jadynWarren, karlieFirecross, julianHerwitz, zachHerwitz];

// Timer Function
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
  }

  clockElement.innerHTML = `Time: ${timeInHours}`;
}

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
	}

	return array;

};

// Set Elements and UI
const setElement = () => {
	callListElement.style.display = 'none';
  visitorIDElement = document.getElementById('visitor-id');
  visitorTimerElement = document.getElementById('visitor-timer')
  acceptButtonElement = document.getElementById('accept-button');
  declineButtonElement = document.getElementById('decline-button');
  pointsElement = document.getElementById('points');
	clockElement = document.getElementById('timer');
	gameoverElement = document.getElementById('gameover');

  pointsElement.innerHTML = 'Job Performance: ' + pointsCount + '%';
  clockElement.innerHTML = 'Time: 7:00 AM';
};

const endGame = () => {
	visitorIDElement.style.display = 'none';
  visitorTimerElement.style.display = 'none';
  startButtonElement.style.display = 'none';
  acceptButtonElement.style.display = 'none';
  declineButtonElement.style.display = 'none';
  pointsElement.style.display = 'none';
	clockElement.style.display = 'none';
	
	gameoverElement.style.display = 'block';
}

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
			if(pointsCount <= 0) {
				endGame();
			}
      nextVisitorDelay();
    };
  }, 500);
}

// Grabs new Visitor from visitorArray

const nextVisitor = () => {
	if(visitorArray.length) {
  	newVisitor = visitorArray[0];
		
		acceptButtonElement.style.display = 'inline-block';  
		declineButtonElement.style.display = 'inline-block';

		setVisitorTimer();
	
		visitorIDElement.innerHTML = newVisitor.name;
		acceptButtonElement.setAttribute('onClick', 'acceptVisitor()')
		declineButtonElement.setAttribute('onClick', 'declineVisitor()')
	
		visitorArray.shift();
		} else {
		console.log('NO VISITORS LEFT');
	}
}

const nextVisitorDelay = () => {
	visitorIDElement.innerHTML = 'No Visitors';
	visitorTimerElement.innerHTML = '- - - - - -';
	let visitorDelay = Math.ceil(Math.random() * 3) * 1000;
	console.log('Visitor Delay: ' + visitorDelay);
	setTimeout(nextVisitor, visitorDelay);
};


const acceptVisitor = () => {
  if(newVisitor.vipBool) {
    pointsCount += 25;
    console.log('VIP ACCEPTED');
    pointsElement.innerHTML = 'Job Performance: ' + pointsCount + '%';
  } else if (newVisitor.blacklistBool) {
    pointsCount -= 25;
    pointsElement.innerHTML = 'Job Performance: ' + pointsCount + '%';
    console.log('BLACKLIST ACCEPTED');
  } else if (newVisitor.expectedBool) {
    pointsCount += 10;
    pointsElement.innerHTML = 'Job Performance: ' + pointsCount + '%';
    console.log('VISITOR ACCEPTED');
	} else if (!newVisitor.expectedBool) {
		pointsCount -= 10;
    pointsElement.innerHTML = 'Job Performance: ' + pointsCount + '%';
    console.log('WRONG VISITOR ACCEPTED');
	}

	if(pointsCount <= 0) {
		endGame();
	}
	acceptButtonElement.style.display = 'none';  
	declineButtonElement.style.display = 'none';
  clearInterval(visitorTimerInterval);
  nextVisitorDelay();
};

const declineVisitor = () => {
  if(newVisitor.vipBool) {
    pointsCount -= 25;
    console.log('VIP REJECTED');
    pointsElement.innerHTML = 'Job Performance: ' + pointsCount + '%';
  } else if (newVisitor.blacklistBool) {
    pointsCount += 25;
    pointsElement.innerHTML = 'Job Performance: ' + pointsCount + '%';
    console.log('BLACKLIST REJECTED');
  } else if (!newVisitor.expectedBool) {
    pointsCount -= 10;
    pointsElement.innerHTML = 'Job Performance: ' + pointsCount + '%';
    console.log('VISITOR REJECTED');
	} else if (newVisitor.expectedBool) {
		pointsCount -= 10;
    pointsElement.innerHTML = 'Job Performance: ' + pointsCount + '%';
    console.log('WRONG VISITOR REJECTED');
	}

	if(pointsCount <= 0) {
		endGame();
	}
	acceptButtonElement.style.display = 'none';  
	declineButtonElement.style.display = 'none';
  clearInterval(visitorTimerInterval);
  nextVisitorDelay();
};

const generateRandomVisitorBool = () => {
	randomBool = Math.ceil(Math.random() * 2)
	if(randomBool == 1) {
		return true;
	} else if (randomBool == 2) {
		return false;
	}
}

const generateMorningList = () => {
	for(let i = 0; i < visitorArray.length; i++) {
		visitorArray[i].expectedBool = generateRandomVisitorBool();
		visitorArray[i].vipBool = generateRandomVisitorBool();
		visitorArray[i].blacklistBool = generateRandomVisitorBool();

		if(visitorArray[i].vipBool && visitorVIPLog.length <= 1) {
			visitorVIPLog.push(visitorArray[i].name)
		} else if (visitorArray[i].blacklistBool && visitorBlacklistLog.length <= 1) {
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
	}
	
	visitorVIPLog = visitorVIPLog.join('<br />')
	visitorBlacklistLog = visitorBlacklistLog.join('<br />')
	visitorExpectedLog = visitorExpectedLog.join('<br />')
	visitorUnexpectedLog = visitorUnexpectedLog.join('<br />')

	morningList = "PAY ATTENTION, KID. HERE'S MY VISITOR LIST. DON'T FUCK IT UP." + '<br /><br />' + "VIPs: " + '<br />' + visitorVIPLog + '<br />' + '<br />' + "Expected Visitors: " + '<br />' + visitorExpectedLog + '<br />' + '<br />' + "Blacklisted Visitors: " + '<br />' +  visitorBlacklistLog;

	return morningList;
}


const beginDay = () => {
	setElement();
  nextVisitorDelay();
  setInterval(tick, 2000);
}
const startGame = () => {
	startButtonElement = document.getElementById('start-button');
	startButtonElement.style.display = 'none';
	shuffle(visitorArray);
	generateMorningList();
	callListElement = document.getElementById('call-list');

	callListElement.innerHTML = morningList;

	setTimeout(beginDay, 3000);
}
