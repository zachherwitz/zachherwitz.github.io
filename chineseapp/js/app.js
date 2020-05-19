$(() => {

  console.log('linked!');

  // Function that is called when you submit your input
  const enterInput = (event) => {
    event.preventDefault(); // Prevents Default Event Functionality
    $characterInfoContainer.children().detach() // Resets App Space
    $userInput = $('#inputField').val(); // Sets the $userInput variable to the string in the #inputField field
    console.log(`user input is ${$userInput}`); // Logs user input
    charArray = $userInput.split(''); // Split the input string into an array called charArray
    for (let index in charArray) { // For each character in the array, do the following:
      if(charArray[index] !== ' ') { // If the character is a space, do nothing. Otherwise:
        $(callDictionaryData(charArray[index])); // Invoke the callDictionaryData function on each character
      }
    }
  }

  // Fisher Yates Shuffle https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) { // For the number of indexes in the Array, let [i] equal the last item of the array. After each iteration, move to the next-last index.
      let j = Math.floor(Math.random() * (i + 1)); // For each index of the Array, create a random number that [i] will swap with (this is [j])
      [array[i], array[j]] = [array[j], array[i]]; //  Switch the values of Array[i] and Array[j]
    }
  }

  // Creating Global variables
  let $userInput = '';
  let charArray = [];
  let flashCardDeck = [];
  let currentDeckObject;


  // Array of HSK1 Pronunciations (HSK are levels of Chinese proficiency testing, HSK1 being the first level, and these being the vocab words for that test)
  // TODO:: Create a way to import your own sets of flashcards using CSV?
  let hsk1 = ['ài', 'bā', 'bà ba', 'bēi zi', 'Běi jīng', 'běn', 'bù kè qi', 'bù', 'cài', 'chá', 'chī', 'chū zū chē', 'dǎ diàn huà', 'dà', 'de', 'diǎn', 'diàn nǎo', 'diàn shì', 'diàn yǐng', 'dōng xi', 'dōu', 'dú', 'duì bu qǐ', 'duō', 'duō shao', 'ér zi', 'èr', 'fàn guǎn', 'fēi jī', 'fēn zhōng', 'gāo xìng', 'gè', 'gōng zuò', 'gǒu', 'hǎo', 'hē', 'hé', 'hěn', 'hòu mian', 'huí', 'huì', 'huǒ chē zhàn', 'jǐ', 'jiā', 'jiào', 'jīn tiān', 'jiǔ', 'kāi', 'kàn', 'kàn jiàn', 'kuài', 'lái', 'lǎo shī', 'le', 'lěng', 'lǐ', 'líng', 'liù', 'mā ma', 'ma', 'mǎi', 'māo', 'méi', 'méi guān xi', 'mǐ fàn', 'míng tiān', 'míng zi', 'nǎ', 'nà', 'ne', 'néng ', 'nǐ', 'nián', 'nǚ ér', 'péng you', 'piào liang', 'píng guǒ', 'qī', 'qián', 'qián miàn', 'qǐng', 'qù', 'rè', 'rén', 'rèn shi', 'rì', 'sān', 'shāng diàn', 'shàng', 'shàng wǔ', 'shǎo', 'shéi', 'shén me', 'shí', 'shí hou', 'shì', 'shū', 'shuǐ', 'shuǐ guǒ', 'shuì jiào', 'shuō huà', 'sì', 'suì', 'tā', 'tā', 'tài', 'tiān qì', 'tīng', 'tóng xué', 'wèi', 'wǒ', 'wǒ men', 'wǔ', 'xǐ huan', 'xià', 'xià wǔ', 'xià yǔ', 'xiān sheng', 'xiàn zài', 'xiǎng', 'xiǎo', 'xiǎo jie', 'xiē', 'xiě', 'xiè xie', 'xīng qī', 'xué sheng', 'xué xí', 'xué xiào', 'yī', 'yī fu', 'yī shēng', 'yī yuàn', 'yǐ zi', 'yǒu', 'yuè', 'zài', 'zài jiàn', 'zěn me yàng', 'zhè', 'zhōng guó', 'zhōng wǔ', 'zhù', 'zhuō zi', 'zì', 'zuó', 'tiān', 'zuò', 'zuò'];

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
                    event.preventDefault() // Prevents Default Event Functionality // preventing page refresh
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
    event.preventDefault(); // Prevents Default Event Functionality // preventing page refresh
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
        let charPronunciation = data.readings.mandarinpinyin[0] || 'error' // Set Pronunciation of Character
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
  let $matchRegistrar;

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

  const registerMatch = (bool) => {
    if(bool) {
      flashCardPoints++
      console.log(`it's a match! Points: ${flashCardPoints}`);
      // $matchRegistrar.css('color', 'green');
      setTimeout(() => {
        $matchRegistrar.text(`Points: ${flashCardPoints}`)
        // $matchRegistrar.css('color', 'black');
      }, 200)
      $matchRegistrar.fadeOut(100).fadeIn(400);
    } else {
      if(flashCardPoints >= 1) {
        flashCardPoints--
      }
      console.log(`it's not a match. Points: ${flashCardPoints}`);
      // $matchRegistrar.css('color', 'red');
      setTimeout(() => {
        $matchRegistrar.text(`Points: ${flashCardPoints}`)
        // $matchRegistrar.css('color', 'black');
      }, 200)
      $matchRegistrar.fadeOut(100).fadeIn(400);
    }
  }

  // check text against target pronunciation
  const checkPronunciation = (event) => {
    if($(event.currentTarget).text() === currentDeckObject.targetPronunciation) {
      registerMatch(true)
      pullNewSet();
    } else {
      registerMatch(false)
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
    $matchRegistrar = $('<div>').addClass('match-registrar').text(`Points: ${flashCardPoints}`)
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
    // shuffleArray($randomCardArray)

    // APPENDING
    $targetContainer.append($targetChar);
    $randomCardContainer.append($randomCardArray);
    $deckContainer.append($targetContainer, $matchRegistrar, $randomCardContainer);
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
    isDictionary = true; // Boolean that determines which app has been selected
    isFlashCards = false // Boolean that determines which app has been selected
    $('.app-container').children().detach() // Resets the App Space
    $('.app-container').removeClass('flash-cards').addClass('dictionary') // Switches App Class
    $characterInfoContainer.children().detach();
    console.log('booting dictionary');
    $input.val('') // Resets form Input Value
    $form.hide() // Hides Form
    $characterInfoContainer.hide() // Hides Character Info Contaier
    $('.app-container').append($form, $characterInfoContainer) // Appends Form and Container to App Space
    $form.fadeIn(1000) // Fades in the App at 1000ms
    $characterInfoContainer.fadeIn(1000) // Fades in the Character Info at 1000ms
  }

  const setFlashCards = () => {
    isDictionary = false; // Boolean that determines which app has been selected
    isFlashCards = true // Boolean that determines which app has been selected
    flashCardDeck = []; // Resets Flash Card Deck
    $('.app-container').children().detach() // Resets the App Space
    $('.app-container').removeClass('dictionary').addClass('flash-cards') // Switches App Class
    console.log('booting flashcards');
    $input.val('')  // Resets form Input Value
    $form.hide(); // Hides Form
    $('.app-container').append($form) // Appends the Form to the App Space
    $form.fadeIn(1000);  // Fades in the App at 1000ms
  }

  $('#dictionary-app').on('click', setDictionary) // Sets Dictionary button onclick
  $('#flashcards-app').on('click', setFlashCards) // Sets Flash Cards button onclick

})


// DRAG AND DROP FUNCTIONALITY:
//https://www.w3schools.com/html/html5_draganddrop.asp

// Signals that nothing should happen while the element is being dragged - only once it is dropped
const allowDrop = (event) => {
  event.preventDefault(); // Prevents Default Event Functionality
}

// Create a function called 'drag'. Drag uses the dataTransfer
const drag = (event) => {
  console.log('drag start');
  event.dataTransfer.setData('dev', 'devdrag'); // Set the event's data to 'devdrag'
}

// Function occurs when draggable element is dragged over the current element, and then let go.  
const drop = (event) => {
  event.preventDefault(); // Prevents Default Event Functionality
  if(event.dataTransfer.getData('dev') == 'devdrag') { // If the event's data is 'devdrag', do the following:
    $('#inputField').val('你好吗我叫咋吃我是学生').focus(); // Input field's input is changed and focused
  }
}
