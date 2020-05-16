//
//  HOW TO USE CTEXT API:
//  getlink
//  example: https://api.ctext.org/getlink?search=朋&urn=ctp:analects/xue-er
//                               getlink? is the function
//                                          search is where you would put the userInput
//                                                    urn is the ctext specific id code for the text



//
//  searchtexts - search through texts based on parameter
//  example: https://api.ctext.org/searchtexts?title=論語
//                                  searchtexts? is the function
//                                              title is where you would put the userInput





$(() => {

  // Setting up argument variables for the ajax method call
  let $userInput = $('input[type="text"]').val()
  let testChar = '好'

  // clearing input field on click
  $('#input-field').on('click', (event) => {
    $(event.currentTarget).val('')
  })


  // DISPLAY CHARACTER INFORMATION
  const displayCharacterInformation = (data) => {
    // CALL THIS CODEBLOCK WHEN DATA HAS BEEN RETRIEVED AND IS READY TO BE MANIPULATED
    console.log(data);

    // Creating character link
    $('<a>').text(`${data.char}`).attr({'href': `${data.url}`, 'target': '_blank'}).addClass('character').appendTo($('#character-information'))

    // Creating Mandarin Pronunciation Display
    $('<div>').text(`'${data.readings.mandarinpinyin[0]}'`).addClass('pronunciation').appendTo('#character-information')

  }

  // DEFINE FUNCTIONALITY
  const lookUpDefinition = () => {
    let dictionaryLink = `https://api.ctext.org/getcharacter?char=${$('input[type="text"]').val()}`
    event.preventDefault()
    console.log(`get definition button pressed + text input:: ${$('input[type="text"]').val()}`);
    $.ajax({
      url: dictionaryLink,
    }).then(
      (data) => {
        // Resetting character info box
        $('#character-information').children().detach();

        if($('input[type="text"]').val() && !data.error) {
          displayCharacterInformation(data)
        } else if (data.error) {
          // IF YOU SEARCH FOR MORE THAN ONE CHARACTER
          console.log(data.error);
          // SPLIT THE CHARACTERS INTO SEPERATE INDEXES
          let $fullText;
          let characterArray = $('input[type="text"]').val().split('')
          let characterPronunciation = '';
          let characterPronunciationArray = [];
          let characterPronunciationDiv = $('<div>')
          console.log(characterArray);
          for (char in characterArray) {
            $.ajax({
              url: `https://api.ctext.org/getcharacter?char=${characterArray[char]}`
            }).then(
              (data) => {
                displayCharacterInformation(data);
                characterPronunciationArray.unshift(data.readings.mandarinpinyin[0])
                characterPronunciationArray.reverse();
                characterPronunciation = characterPronunciationArray.join(' ');
                console.log(characterPronunciation);
                characterPronunciationDiv.text(characterPronunciation)
              }
            )
          }
          $fullText = $('<a>').text(`${$('input[type="text"]').val()}`).addClass('character').attr({'href': `https://ctext.org/dictionary.pl?if=en&char=${$('input[type="text"]').val()}`, 'target': '_blank'}).appendTo('#character-information').append(characterPronunciationDiv)
        }
      }
    )
  }

  // TITLE LOOKUP FUNCTIONALITY
  const lookUpTitles = () => {
    let titlesLink = `https://api.ctext.org/searchtexts?title=${$('input[type="text"]').val()}`
    event.preventDefault();
    $('.titles-container').children().detach()
    console.log(`titles button pressed + text input:: ${titlesLink}`);
    $.ajax({
      url: titlesLink,
    }).then(
      (data) => {
        // Get the URN of the first book returned
        for (books in data.books) {
          let $titleElement = $('<a>').text(data.books[books].title).appendTo('.titles-container').attr({'href': `https://api.ctext.org/getlink?redirect=1&urn=${data.books[books].urn}`, 'target': '_blank'})
        }
      }
    )
  }

  // ajax call on test button
  $('#definition-button').on('click', (event) => {
    lookUpDefinition();
    lookUpTitles();
  })




})
