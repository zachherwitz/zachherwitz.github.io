// Set Up Global Variables
let friendCount = 0;
let age = 0;
let loseStatus = false;
let winStatus = false;
let friendLossRate = 500;
let peakAge = 20;
let randomAgeOne;
let randomAgeTwo;

// Set Up Global HTML Elements
let startButtonElement;
let friendButtonElement;
let friendCounterElement;
let ageCounterElement;
let loseTextElement;
let restartButtonElement;
let randomEventTextElement;
let randomEventButtonAcceptElement;
let randomEventButtonDeclineElement;
let randomEventImageElement;
let instructionsElement;

// Made a variable to control the rate at which you can lose friends
let losingFriendsRate = 500;

// Flag for when a random event appears. This will pause the intervals when true
let isPaused = false;

function unpause() {
  isPaused = false;
  randomEventDiv.style.visibility='hidden';
}

// Random Event Class Constructor
class RandomEvent {
  constructor ({eventName, eventText, imgsrc, 
                  onAccept = () => {}, onDecline = () => {}}) {
    this._eventName = eventName;
    this._eventText = eventText;
    this._imgsrc = imgsrc;
  }

  get eventName() {
    return this._eventName;
  }

  get eventText() {
    return this._eventText;
  }

  get imgsrc() {
    return this._imgsrc;
	}
	
	accept() {
		console.log('Event Accepted\nUnpausingGame');
    unpause();
	}

	decline() {
		console.log('Event Declined\nUnpausingGame');
    unpause();
	}
}

class RandomEvent1 extends RandomEvent {
  constructor() {
    super({
      eventName: 'Wedding', 
      eventText: 'You are about to get married. Invite your college friends?',
      imgsrc: 'resources/images/marriage.jpeg'});
  }

  accept() {
    friendCount += 15;
    super.accept();
  }
}

class RandomEvent2 extends RandomEvent {
  constructor() {
    super({
      eventName: 'Lottery', 
      eventText: 'You won the lottery. Do you post the results on social media?',
      imgsrc: 'resources/images/lottery.jpeg'});
  }

  accept() {
    friendCount += 25;
    super.accept();
  }
}

class RandomEvent3 extends RandomEvent {
  constructor() {
    super({
      eventName: 'HotTake', 
      eventText: 'You have a hot take on a spicy political issue. Do you post on social media?',
      imgsrc: 'resources/images/hottake.jpeg'});
  }

  accept() {
    friendCount -= 10;
    super.accept();
  }
}


// Testing Random Event Creation and Array
const randomEventArray = [new RandomEvent1(), new RandomEvent2(), new RandomEvent3()];

// OnClick Set Up Game
const startGame = () => {
  // TODO: RESTART GAME (zero out old state)

  // Assigning elements to DOM elements
  startButtonElement = document.getElementById('start-button');
  friendButtonElement = document.getElementById('friend-button');
  friendCounterElement = document.getElementById('friend-counter');
  ageCounterElement = document.getElementById('age-counter');
  loseTextElement = document.getElementById('lose-text');
  restartButtonElement = document.getElementById('restart-button');
  randomEventDiv = document.getElementById('random-event-container');
  randomEventTextElement = document.getElementById('random-event-text');
  randomEventButtonAcceptElement = document.getElementById('random-event-button-accept');
  randomEventButtonDeclineElement = document.getElementById('random-event-button-decline');
  randomEventImageElement = document.getElementById('random-event-image');
  instructionsElement = document.getElementById('instructions');

  console.log('Starting Game!')
  
  // Hide Start Button on Game Start
  startButtonElement.style.display = 'none';
  
  // Hide instructions on Game Start
instructionsElement.style.display = 'none';

  // Show Friend Button on Game Start
  friendButtonElement.style.display = 'block';
  friendButtonElement.innerHTML = 'Click Here to Make Friends!'
 
  // Set Random Age
  randomAgeOne = Math.floor(Math.random() * 10) + 25;
  randomAgeTwo = Math.floor(Math.random() * 10) + 60;
  console.log(randomAgeOne);
  console.log(randomAgeTwo)

  // Set Up friendCount
  friendCounterElement.innerHTML = `Friends: ${friendCount}`;

  // Set Up ageCount
  ageCounterElement.innerHTML = `Age: ${age}`;

  if(!isPaused) {
    //Begin Age Incrementation/Friend Decrementation
    setInterval(incrementAge, 250);
    setInterval(loseFriends, friendLossRate)
  };
};

// Increase friendCount by 1 per click
const increaseFriendCount = () => {
  
  // Checking for Peak Age
  if(age >= peakAge) {
    console.log('Age Limit Reached')
  } else {
    friendCount++
    console.log('Friend Made!')
  };

  // Refresh friendCount
  friendCounterElement.innerHTML = `Friends: ${friendCount}`
};

// Generate Lose Game UI
const generateLoss = () => {
  friendCounterElement.style.display = 'none';
  ageCounterElement.style.display = 'none';
  friendButtonElement.style.display = 'none';
  loseTextElement.innerHTML = `YOU HAVE DIED AT AGE ${age} WITH NO FRIENDS LEFT.`;
  restartButtonElement.style.display = 'block';
};

const generateWin = () => {
  friendCounterElement.style.display = 'none';
  ageCounterElement.style.display = 'none';
  friendButtonElement.style.display = 'none';
  loseTextElement.innerHTML = `CONGRATULATIONS! YOU HAVE DIED AT AGE ${age} WITH ${friendCount} FRIENDS LEFT.`;
  restartButtonElement.style.display = 'block';
}

// Increase Age
const incrementAge = () => {
  if(isPaused) {
    return;
  }

  if(!loseStatus) {
    age++
  };
  ageCounterElement.innerHTML = `Age: ${age}`;

  if(age === randomAgeOne || age === randomAgeTwo) {
    isPaused = true;
    console.log('Pausing Game Now')
    randomEvent();
    clearInterval(incrementAge);
    clearInterval(loseFriends);
  }
};

// Decrease Friends
const loseFriends = () => {
  if(isPaused) {
    return;
  }

  friendCounterElement.innerHTML = `Friends: ${friendCount}`;
  if(age > peakAge && loseStatus === false) {
    //Disable Friend Button
    friendButtonElement.style.display = 'none';
    friendCount--;
    friendCounterElement.style.color = 'red';
    console.log('Losing friends!')
  } else {
    friendCounterElement.style.color = 'green';
  };

  // Loss Criteria
  if(age > peakAge && friendCount <= 0) {
    loseStatus = true;
    console.log('You have lost!')
    generateLoss();
  };

  // Win Criteria
  if(age === 100) {
    winStatus = true;
    console.log('You have won?')
    generateWin();
  }

};

// Random Event Generator
const randomEvent = () => {
  console.log('Generating Random Event')
  randomEventTextElement.style.display = 'block';
  randomEventButtonAcceptElement.style.display = 'block';
  randomEventButtonDeclineElement.style.display = 'block';

  // Assign Random Event
  let randomEventNumber = Math.floor(Math.random() * randomEventArray.length);
  let randomEvent = randomEventArray[randomEventNumber];
	console.log(randomEventNumber);
	
	// Assign Event Text
	randomEventTextElement.innerHTML = randomEvent.eventText;
	
	// Assign Event Image
	randomEventImageElement.src = randomEvent.imgsrc;
	
	// Assign Event Accept/Decline
	randomEventButtonAcceptElement.innerHTML = 'Accept'
	randomEventButtonAcceptElement.onclick = randomEvent.accept;
	randomEventButtonDeclineElement.innerHTML = 'Decline'
	randomEventButtonDeclineElement.onclick = randomEvent.decline;
  randomEventDiv.style.visibility='visible';
};
