class Hero {
  constructor(name){
    this.name = name;
    this.health = 100;
    this.weapons = {
      sprinkleSpray: 5,
      sugarShock: 10
    }
    this.catchPhrases = [
      'i\'m fresher than day old pizza',
      'you can\'t count my calories'
    ]
  }
  talkSass(){
    let randomPhrase = Math.floor(Math.random() * this.catchPhrases.length);
    console.log(this.catchPhrases[randomPhrase]);
  }
  announceHealth(){
    console.log(this.health);
  }
  fight(target){
    console.log('i\'m ready to rumble');
    target.health -= this.weapons.sprinkleSpray;
    console.log(`${target.name} loses ${this.weapons.sprinkleSpray} health. They are now at ${target.health}`);
  }
}

const dougie = new Hero('Dougie')
// console.log(dougie);


class Enemy {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.weapons = {
      pepperoniStars: 5,
      cheeseGrease: 10
    }
    this.catchPhrases = [
      'i\'m youtube famous',
      'i\'m more dangerous than an uncovered sewer'
    ]
  }
  talkSmack(){
    let randomPhrase = Math.floor(Math.random() * this.catchPhrases.length);
    console.log(this.catchPhrases[randomPhrase]);
  }
  announceHealth(){
    console.log(this.health);
  }
  fight(target){
    console.log('i\'m gonna flatten you like a slice of pepperoni!');
    target.health -= this.weapons.pepperoniStars;
    console.log(`${target.name} loses ${this.weapons.pepperoniStars} health. They are now at ${target.health}`);
  }
}

const pizzaRat = new Enemy('Pizza Rat');
// console.log(pizzaRat);


dougie.talkSass();
pizzaRat.talkSmack();
dougie.announceHealth();
pizzaRat.announceHealth();

pizzaRat.fight(dougie);
dougie.fight(pizzaRat)

dougie.announceHealth();
pizzaRat.announceHealth();
