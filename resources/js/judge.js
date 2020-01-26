class Judge {
	constructor(name, homeState, circuitCourt, specialAbility, partisanScore, healthPoints, judgePhotoSource) {
		this._name = name;
		this._homeState = homeState;
		this._circuitCourt = circuitCourt;
		this._specialAbility = specialAbility;
		this._partisanScore = partisanScore;
		this._healthPoints = healthPoints;
		this._judgePhotoSource = judgePhotoSource;
	}

	get name() {
		return this._name;
	}

	get homeState() {
		return this._homeState;
	}

	get circuitCourt() {
		return this._circuitCourt;
	}

	get specialAbility() {
		return this._specialAbility;
	}

	get partisanScore() {
		return this._partisanScore;
	}

	get healthPoints() {
		return this._healthPoints;
	}

	get judgePhotoSource() {
		return this._judgePhotoSource;
	}

	judgeAttack() {
		let attackMod = Math.floor(Math.random()  * 5);
		return attackMod * this._partisanScore;
	}

	useSpecialAbility() {
		let specialChance = Math.floor(Math.random() * 10);
		if (specialChance >= 8) {
			console.log(`Using Special Ability: ${this._specialAbility}`);
		} else {
			console.log(`Failed to use Special Ability: ${this._specialAbility}`);
		}
	}
};

class Player {
	constructor(name, healthPoints, attackPower) {
		this._name = name;
		this._healthPoints = healthPoints;
		this._attackPower = attackPower;
	}

	get name() {
		return this._name;
	}

	get healthPoints() {
		return this._healthPoints;
	}

	get attackPower() {
		return this._attackPower;
	}

	playerAttack() {
		let attackMod = Math.floor(Math.random()  * 5);
		return attackMod * this._attackPower;
	}

}


const stevenMenashi = new Judge('Steven Menashi', 'New York', '2nd Circuit', 'Ethnonationalism', 10, 100, 'resources/images/steven-menashi.jpg');
const allisonRushing = new Judge('Allison Jones Rushing', 'North Carolina', '4th Circuit', 'Oppose Gay Rights', 9, 100, 'resources/images/allison-rushing.jpg');
const kyleDuncan = new Judge('Kyle Duncan', 'Louisiana', '5th Circuit', 'Refuse Pronouns', 3, 100, 'resources/images/kyle-duncan.jpg') ;
const johnBush = new Judge('John K Bush', 'Kentucky', '6th Circuit', 'Alt-Right Blogging', 4, 100, 'resources/images/john-k-bush.jpg');
const chadReadler = new Judge('Chad Readler', 'Ohio', '6th Circuit', 'Dismantle Healthcare', 5, 100, 'resources/images/chad-readler.jpg');
const amyBarrett = new Judge('Amy Barrett', 'Indiana', '7th Circuit', 'Dogmatic Catholicism', 12, 100, 'resources/images/amy-barrett.jpg');
const leonardGrasz = new Judge('Leonard Grasz', 'Nebraska', '8th Circuit', 'Disregard Precedence', 2, 100, 'resources/images/leonard-grasz.jpg');
const ryanNelson = new Judge('Ryan D Nelson', 'Idaho', '9th Circuit', 'Shady Business Practice', 7, 100, 'resources/images/ryan-nelson.jpg');
const patrickBumatay = new Judge('Patrick Bumatay', 'California', '9th Circuit', 'Civil Rights Rollback', 7, 100, 'resources/images/patrick-bumatay.jpg');
const lawrenceVanDyke = new Judge('Lawrence VanDyke', 'Nevada', '9th Circuit', 'Oppose Gay Rights', 7, 100, 'resources/images/lawrence-vandyke.jpg');

const player = new Player('Player', 10, 1);

const judgeArray = [stevenMenashi, allisonRushing, kyleDuncan, johnBush, chadReadler, 
	amyBarrett, leonardGrasz, ryanNelson, patrickBumatay, lawrenceVanDyke];

const pickJudge = arr => {
	let randomNumber = Math.floor(Math.random() * arr.length);
	return arr[randomNumber];
};

const setJudgePhoto = currentJudge => {
	document.getElementById('judge-photo').src = currentJudge.judgePhotoSource;
	console.log(currentJudge.judgePhotoSource)
};

const setJudgeText = currentJudge => {
	document.getElementById('judge-text').innerHTML = `Your opponent is ${currentJudge.name}, from ${currentJudge.homeState}.
	<br>You are battling for the future of the ${currentJudge.circuitCourt} court.
	<br><br>${currentJudge.name}'s Health Remaining: ${currentJudge.healthPoints}.`
};

const setPlayerText = () => {
	document.getElementById('player-text').innerHTML = `${player.name}'s Health Remaining: ${player.healthPoints}`
};

const setButtonDisplay = () => {
	document.getElementById('button-container').style.display = 'block';
};

const playGame = () => {
	let currentJudge = pickJudge(judgeArray);
	setJudgePhoto(currentJudge);
	setJudgeText(currentJudge);
	setPlayerText();
	setButtonDisplay();
	return currentJudge;
	
	
	//For Node Testing
	/*console.log('-------------NEW GAME-------------')
	console.log(`Your opponent is ${currentJudge.name}, from ${currentJudge.homeState}.
You are battling for the future of the ${currentJudge.circuitCourt} court.
${currentJudge.name}'s Health Remaining: ${currentJudge.healthPoints}.
${player.name}'s Health Remaining: ${player.healthPoints}
Attack: Y/N`);*/

}

const attack = currentJudge => {
	let recapText = document.getElementById('recap-text');
	recapText.innerHTML = `${player.name} attacks for: ${player.playerAttack()} damage`;
};

const defend = () => {
	let recapText = document.getElementById('recap-text');
	recapText.innerHTML = 'defend';
};

const pass = () => {
	let recapText = document.getElementById('recap-text');
	recapText.innerHTML = 'pass';
};

playGame();






