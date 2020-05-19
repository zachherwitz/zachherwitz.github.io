$(() => {

  console.log('linked!');

  // Function that is called when you submit your input
  const enterInput = (event) => {
    event.preventDefault();
    $characterInfoContainer.children().detach()
    // $deckContainer.children().detach()
    $userInput = $('#inputField').val();
    console.log(`user input is ${$userInput}`);
    charArray = $userInput.split('');
    for (let index in charArray) {
      if(charArray[index] !== ' ') {
        $(callDictionaryData(charArray[index]));
      }
    }
  }

  // EXPLAIN HOW THIS WORKS - httpss://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Creating Global variables
  let $userInput = '';
  let charArray = [];
  let flashCardDeck = [];
  let currentDeckObject;

  let hsk1 = ['ài', 'bā', 'bà ba', 'bēi zi', 'Běi jīng', 'běn', 'bù kè qi', 'bù', 'cài', 'chá', 'chī', 'chū zū chē', 'dǎ diàn huà', 'dà', 'de', 'diǎn', 'diàn nǎo', 'diàn shì', 'diàn yǐng', 'dōng xi', 'dōu', 'dú', 'duì bu qǐ', 'duō', 'duō shao', 'ér zi', 'èr', 'fàn guǎn', 'fēi jī', 'fēn zhōng', 'gāo xìng', 'gè', 'gōng zuò', 'gǒu', 'hǎo', 'hē', 'hé', 'hěn', 'hòu mian', 'huí', 'huì', 'huǒ chē zhàn', 'jǐ', 'jiā', 'jiào', 'jīn tiān', 'jiǔ', 'kāi', 'kàn', 'kàn jiàn', 'kuài', 'lái', 'lǎo shī', 'le', 'lěng', 'lǐ', 'líng', 'liù', 'mā ma', 'ma', 'mǎi', 'māo', 'méi', 'méi guān xi', 'mǐ fàn', 'míng tiān', 'míng zi', 'nǎ', 'nà', 'ne', 'néng ', 'nǐ', 'nián', 'nǚ ér', 'péng you', 'piào liang', 'píng guǒ', 'qī', 'qián', 'qián miàn', 'qǐng', 'qù', 'rè', 'rén', 'rèn shi', 'rì', 'sān', 'shāng diàn', 'shàng', 'shàng wǔ', 'shǎo', 'shéi', 'shén me', 'shí', 'shí hou', 'shì', 'shū', 'shuǐ', 'shuǐ guǒ', 'shuì jiào', 'shuō huà', 'sì', 'suì', 'tā', 'tā', 'tài', 'tiān qì', 'tīng', 'tóng xué', 'wèi,', 'wǒ', 'wǒ men', 'wǔ', 'xǐ huan', 'xià', 'xià wǔ', 'xià yǔ', 'xiān sheng', 'xiàn zài', 'xiǎng', 'xiǎo', 'xiǎo jie', 'xiē', 'xiě', 'xiè xie', 'xīng qī', 'xué sheng', 'xué xí', 'xué xiào', 'yī', 'yī fu', 'yī shēng', 'yī yuàn', 'yǐ zi', 'yǒu', 'yuè', 'zài', 'zài jiàn', 'zěn me yàng', 'zhè', 'zhōng guó', 'zhōng wǔ', 'zhù', 'zhuō zi', 'zì', 'zuó', 'tiān', 'zuò', 'zuò'];

  //zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach
  //                                                                          //
  //                             DICTIONARY                                    //
  //                                                                          //
  //zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach

  // Creating Form:
  let $form = $('<form>')

  // Creating Form Innards:
  let $input = $('<input>')
                .attr({
                  'type': 'text',
                  'id': 'inputField',
                  'name': 'inputField',
                  'placeholder': 'enter char',
                  'ondrop': 'drop(event)',
                  'ondragover': 'allowDrop(event)'
                })
                .click(
                  (event) => {
                    event.preventDefault()
                    $(event.currentTarget).val('')
                  })
                .keydown((event) => {
                  if(event.code === 'Enter') {
                    enterInput(event)
                  }
                })




  // Create mobile-friendly click button
  let $inputButton = $('<div>')
                      .on('click', (event) => {
                        enterInput(event)
                      })
                      .addClass('mobile-button')
                      .text('递交')
                      // https://www.w3schools.com/html/html5_draganddrop.asp
                      .attr({
                        'draggable': 'true',
                        'ondragstart': 'drag(event)'
                      })


  // Character Information Container
  let $characterInfoContainer = $('<div>').addClass('character-info-container')

                  // APPENDING // APPENDING // APPENDING // APPENDING //

  // Appending items to $form
  $form.append($inputButton, $input);

  //zach~//~zach~//~zach~//   SETTING UP FUNCTIONALITY   //~zach~//~zach~//~zach


  // Save and reset input field on ENTER
  const captureUserInput = () => {
    event.preventDefault(); // preventing page refresh
    $userInput = $(event.currentTarget).val(); // saving user input to variable
    $(event.currentTarget).val('') // clearing user input field;
  }

// Calls on the website to provide information based on userInput
  const callDictionaryData = (input) => {
    $.ajax({
      url: `https://api.ctext.org/getcharacter?char=${input}`
    }).then(
      (data) => {
        let newChar = data.char; // Set Character
        let charPronunciation = data.readings.mandarinpinyin[0]; // Set Pronunciation of Character
        if (isDictionary){
          setCharInformation(newChar, charPronunciation)
        } else if (isFlashCards) {
          //////////////////////////////////////////////////////////////////////
          randomizePronunciation(hsk1)
          constructFlashCardDeck(newChar, charPronunciation, pinyin1, pinyin2, pinyin3)
          ////////////////////////////////////////////////////////////////////////
        }
      }
    )
  }

  // Displays Character information in flexbox form
  const setCharInformation = (character, pronunciation) => {

    // Create Character Container:
    // Container div
    let $newCharContainer = $('<div>').addClass('character-container')

    // Character Information
    $('<a>').text(character)
      .addClass('simple-char')
      .appendTo($newCharContainer)
      .attr({'href': `https://ctext.org/dictionary.pl?if=en&char=${character}`, 'target': '_blank'})
    $('<a>').text(pronunciation)
      .addClass('pronunciation')
      .appendTo($newCharContainer)
      .attr({'href': `https://ctext.org/dictionary.pl?if=en&char=${character}`, 'target': '_blank'})

    // Appending to the info container
    $newCharContainer.hide()
    $characterInfoContainer.append($newCharContainer)
    $newCharContainer.fadeIn(1000)
  }



  //zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach
  //                                                                          //
  //                             FLASH CARDS                                  //
  //                                                                          //
  //zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach


  let flashCardArray = []
  let randomCardArray = []
  let pinyin1;
  let pinyin2;
  let pinyin3;
  let flashCardPoints = 0;
  let $randomCardContainer;
  let $randomCard1;
  let $randomCard2;
  let $randomCard3;
  let $realCard;
  let $targetChar;

  // Function that randomizes 3 of the random pronunciations for Flashcard
  const randomizePronunciation = (array) => {
    pinyin1 = array[Math.floor(Math.random() * array.length)];
    pinyin2 = array[Math.floor(Math.random() * array.length)];
    pinyin3 = array[Math.floor(Math.random() * array.length)];
    return pinyin1, pinyin2, pinyin3
  }

  class FlashCardSet {
    constructor(targetChar, targetPronunciation, pinyin1, pinyin2, pinyin3) {
      this.targetChar = targetChar;
      this.targetPronunciation = targetPronunciation;
      this.randomPronunciation = [pinyin1, pinyin2, pinyin3];
    }

    playset() {
      console.log(this.targetChar, this.pronunciation);
    }
  }

  // pull new set from deck
  const pullNewSet = () => {
    $targetChar.hide()
    $randomCardContainer.hide().children().detach()


    shuffleArray(flashCardDeck)
    shuffleArray($randomCardArray)

    currentDeckObject = flashCardDeck[0];

    $targetChar.text(currentDeckObject.targetChar)
    $randomCard1.text(currentDeckObject.randomPronunciation[0])
    $randomCard2.text(currentDeckObject.randomPronunciation[1])
    $randomCard3.text(currentDeckObject.randomPronunciation[2])
    $realCard.text(currentDeckObject.targetPronunciation)

    $randomCardContainer.append($randomCardArray);
    $randomCardContainer.fadeIn(1000)
    $targetChar.fadeIn(1000)

  }

  // check text against target pronunciation
  const checkPronunciation = (event) => {
    if($(event.currentTarget).text() === currentDeckObject.targetPronunciation) {
      flashCardPoints++
      console.log(`it's a match! Points: ${flashCardPoints}`);
      pullNewSet();
    } else {
      console.log(`it's not a match. Points: ${flashCardPoints}`);
      pullNewSet();
    }
  }



  // Construct Flashcard Game for flashCardDeck[0]
  const createDeckUI = (character, pronunciation) => {

    currentDeckObject = flashCardDeck[0]
    console.log('creating deck ui' );
    console.log(currentDeckObject);
    // DIV CONTAINTING Game
    let $deckContainer = $('<div>').addClass('deck-container')
      // DIV CONTAINING target
    let $targetContainer = $('<div>').addClass('target-container')
        // targetchar
    $targetChar = $('<div>').addClass('target-char').text(currentDeckObject.targetChar)
      // DIV CONTAINING random pronunciation x4
    $randomCardContainer = $('<div>').addClass('random-card-container')
        // Random Pronunciation 1
    $randomCard1 = $('<div>')
                        .addClass('random-card')
                        .text(currentDeckObject.randomPronunciation[0])
                        .on('click', (event) => {
                          checkPronunciation(event)
                        })
        // Random Pronunciation 2
    $randomCard2 = $('<div>')
                        .addClass('random-card')
                        .text(currentDeckObject.randomPronunciation[1])
                        .on('click', (event) => {
                          checkPronunciation(event)
                        })
        // Random Pronunciation 3
    $randomCard3 = $('<div>')
                        .addClass('random-card')
                        .text(currentDeckObject.randomPronunciation[2])
                        .on('click', (event) => {
                          checkPronunciation(event)
                        })

    $realCard = $('<div>')
                        .addClass('random-card')
                        .text(currentDeckObject.targetPronunciation)
                        .on('click', (event) => {
                          checkPronunciation(event)
                        })

    $randomCardArray = [$randomCard1, $randomCard2, $randomCard3, $realCard]
    shuffleArray($randomCardArray)

    // APPENDING
    $targetContainer.append($targetChar);
    $randomCardContainer.append($randomCardArray);
    $deckContainer.append($targetContainer, $randomCardContainer);
    $deckContainer.hide();
    $('.app-container').append($deckContainer)
    $deckContainer.fadeIn(1000);
  }


  const constructFlashCardDeck = (character, pronunciation) => {
    let newFlashCardSet = new FlashCardSet(character, pronunciation, pinyin1, pinyin2, pinyin3)
    flashCardDeck.push(newFlashCardSet)
    if (!currentDeckObject) {
      createDeckUI(character, pronunciation);
    }
    // Creating flashcards objects
    // Push flashcards to array
    // create html and css structure of 1 card on top and then 4 cards to click at the bottom
    // based on which object is chosen, populate data on the cards and assign click functions based on which is the right answer
    // add a point somewhere based on how many you get correct

  }


















  //zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach
  //                                                                          //
  //                             APP BUTTONS                                  //
  //                                                                          //
  //zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach


  const setDictionary = () => {
    isDictionary = true;
    isFlashCards = false
    $('.app-container').children().detach()
    $('.app-container').removeClass('flash-cards').addClass('dictionary')
    $characterInfoContainer.children().detach();
    console.log('booting dictionary');
    $input.val('')
    $form.hide()
    $characterInfoContainer.hide()
    $('.app-container').append($form, $characterInfoContainer)
    $form.fadeIn(1000)
    $characterInfoContainer.fadeIn(1000)
  }

  const setFlashCards = () => {
    isDictionary = false;
    isFlashCards = true
    flashCardDeck = [];
    $('.app-container').children().detach()
    $('.app-container').removeClass('dictionary').addClass('flash-cards')
    console.log('booting flashcards');
    $input.val('')
    $form.hide();
    $('.app-container').append($form)
    $form.fadeIn(1000);
  }

  $('#dictionary-app').on('click', setDictionary)
  $('#flashcards-app').on('click', setFlashCards)

})

//https://www.w3schools.com/html/html5_draganddrop.asp
// EXPLAIN HOW THIS WORKS
const allowDrop = (event) => {
  event.preventDefault();
}

// Create a function called 'drag'. Drag uses the dataTransfer
const drag = (event) => {
  console.log('drag start');
  event.dataTransfer.setData('dev', 'devdrag');
}

const drop = (event) => {
  event.preventDefault();
  if(event.dataTransfer.getData('dev') == 'devdrag') {
    $('#inputField').val('你好吗我叫咋吃我是学生').focus();
  }
}