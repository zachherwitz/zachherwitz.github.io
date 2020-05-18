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

  // Creating Global variables
  let $userInput = '';
  let charArray = [];
  let flashCardDeck = [];
  let currentDeckObject;

  let hsk1 = ['ài', 'bā', 'bà ba', 'bēi zi', 'Běi jīng', 'běn', 'bù kè qi', 'bù', 'cài', 'chá', 'chī', 'chū zū chē', 'dǎ diàn huà', 'dà', 'de', 'diǎn', 'diàn nǎo', 'diàn shì', 'diàn yǐng', 'dōng xi', 'dōu', 'dú', 'duì bu qǐ', 'duō', 'duō shao', 'ér zi', 'èr', 'fàn guǎn', 'fēi jī', 'fēn zhōng', 'gāo xìng', 'gè', 'gōng zuò', 'gǒu', 'hǎo', 'hē', 'hé', 'hěn', 'hòu mian', 'huí', 'huì', 'huǒ chē zhàn', 'jǐ', 'jiā', 'jiào', 'jīn tiān', 'jiǔ', 'kāi', 'kàn', 'kàn jiàn', 'kuài', 'lái', 'lǎo shī', 'le', 'lěng', 'lǐ', 'líng', 'liù', 'mā ma', 'ma', 'mǎi', 'māo', 'méi', 'méi guān xi', 'mǐ fàn', 'míng tiān', 'míng zi', 'nǎ', 'nà', 'ne', 'néng ', 'nǐ', 'nián', 'nǚ ér', 'péng you', 'piào liang', 'píng guǒ', 'qī', 'qián', 'qián miàn', 'qǐng', 'qù', 'rè', 'rén', 'rèn shi', 'rì', 'sān', 'shāng diàn', 'shàng', 'shàng wǔ', 'shǎo', 'shéi', 'shén me?', 'shí', 'shí hou', 'shì', 'shū', 'shuǐ', 'shuǐ guǒ', 'shuì jiào', 'shuō huà', 'sì', 'suì', 'tā', 'tā', 'tài', 'tiān qì', 'tīng', 'tóng xué', 'wèi,', 'wǒ', 'wǒ men', 'wǔ', 'xǐ huan', 'xià', 'xià wǔ', 'xià yǔ', 'xiān sheng', 'xiàn zài', 'xiǎng', 'xiǎo', 'xiǎo jie', 'xiē', 'xiě', 'xiè xie', 'xīng qī', 'xué sheng', 'xué xí', 'xué xiào', 'yī', 'yī fu', 'yī shēng', 'yī yuàn', 'yǐ zi', 'yǒu', 'yuè', 'zài', 'zài jiàn', 'zěn me yàng', 'zhè', 'zhōng guó', 'zhōng wǔ', 'zhù', 'zhuō zi', 'zì', 'zuó', 'tiān', 'zuò', 'zuò'];

  //zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach
  //                                                                          //
  //                             DICTIONARY                                    //
  //                                                                          //
  //zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach

  // Creating Form:
  let $form = $('<form>')

  // Creating Form Innards:
  let $input = $('<input>')
                .attr({'type': 'text', 'id': 'inputField', 'name': 'inputField', 'placeholder': 'enter char'})
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




  //TODO//TODO// Create mobile-friendly click button
  let $inputButton = $('<button>')
                      .on('click', (event) => {
                        enterInput(event)
                      })
                      .addClass('mobile-button')
                      .text('GO')

  // Sample Characters for dev testing
  let $sampleCharacters = $('<div>').text('我 们 多 是 学生 和 我们是很好')

  // Character Information Container
  let $characterInfoContainer = $('<div>').addClass('character-info-container')

                  // APPENDING // APPENDING // APPENDING // APPENDING //

  // Appending items to $form
  $form.append($input, $sampleCharacters, $inputButton);

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
      url: `http://api.ctext.org/getcharacter?char=${input}`
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
      .attr({'href': `http://ctext.org/dictionary.pl?if=en&char=${character}`, 'target': '_blank'})
    $('<a>').text(pronunciation)
      .addClass('pronunciation')
      .appendTo($newCharContainer)
      .attr({'href': `http://ctext.org/dictionary.pl?if=en&char=${character}`, 'target': '_blank'})

    // Appending to the info container
    $characterInfoContainer.append($newCharContainer)
  }



  //zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach
  //                                                                          //
  //                             FLASH CARDS                                  //
  //                                                                          //
  //zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach


  let flashCardArray = []
  let randomCardArray = []
  let pinyin1
  let pinyin2
  let pinyin3

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

  // check text against target pronunciation
  const checkPronunciation = (event) => {
    if($(event.currentTarget).text() === currentDeckObject.targetPronunciation) {
      console.log('its a match!');
    }
  }


  // EXPLAIN HOW THIS WORKS - https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }


  // Construct Flashcard Game for flashCardDeck[0]
  const createDeckUI = (character, pronunciation) => {
    currentDeckObject = flashCardDeck[0]
    console.log(currentDeckObject);
    // DIV CONTAINTING Game
    let $deckContainer = $('<div>').addClass('deck-container')
      // DIV CONTAINING target
    let $targetContainer = $('<div>').addClass('target-container')
        // targetchar
    let $targetChar = $('<div>').addClass('target-char').text(currentDeckObject.targetChar)
      // DIV CONTAINING random pronunciation x4
    let $randomCardContainer = $('<div>').addClass('random-card-container')
        // Random Pronunciation 1
    let $randomCard1 = $('<div>')
                        .addClass('random-card')
                        .text(currentDeckObject.randomPronunciation[0])
                        .on('click', (event) => {
                          checkPronunciation(event)
                        })
        // Random Pronunciation 2
    let $randomCard2 = $('<div>')
                        .addClass('random-card')
                        .text(currentDeckObject.randomPronunciation[1])
                        .on('click', (event) => {
                          checkPronunciation(event)
                        })
        // Random Pronunciation 3
    let $randomCard3 = $('<div>')
                        .addClass('random-card')
                        .text(currentDeckObject.randomPronunciation[2])
                        .on('click', (event) => {
                          checkPronunciation(event)
                        })

    let $realCard = $('<div>')
                        .addClass('random-card')
                        .text(currentDeckObject.targetPronunciation)
                        .on('click', (event) => {
                          checkPronunciation(event)
                        })

    $randomCardArray = [$randomCard1, $randomCard2, $randomCard3, $realCard]
    shuffleArray($randomCardArray)

    // APPENDING
    $targetContainer.append($targetChar);
    $randomCardContainer.append($randomCardArray)
    $deckContainer.append($targetContainer, $randomCardContainer).appendTo('.app-container')
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
    $characterInfoContainer.children().detach();
    console.log('booting dictionary');
    $input.val('')
    $('.app-container').append($form, $characterInfoContainer) // add final appended items here!
  }

  const setFlashCards = () => {
    isDictionary = false;
    isFlashCards = true
    $('.app-container').children().detach()
    console.log('booting flashcards');
    $input.val('')
    $('.app-container').append($form);
  }

  $('#dictionary-app').on('click', setDictionary)
  $('#flashcards-app').on('click', setFlashCards)
})
