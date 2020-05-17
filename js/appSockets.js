$(() => {

  console.log('linked!');

  // Creating Global variables
  let $userInput = '';
  let charArray = [];

          // HTML ELEMENTS // HTML ELEMENTS // HTML ELEMENTS // HTML ELEMENTS //


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
                  // https://www.w3schools.com/jsref/event_key_code.asp
                  if(event.code === 'Enter') {
                    $characterInfoContainer.children().detach()
                    captureUserInput(); // captures the user input and saves it to $userInput
                    console.log(`user input is ${$userInput}`); // In case user inputs several characters
                    charArray = $userInput.split(''); // splitting input into array
                    for (let index in charArray) {
                      $(callData(charArray[index]));
                    }
                  }
                })

  // Sample Characters for dev testing
  let $sampleCharacters = $('<div>').text('我 们 多 是 学生 和 我们是很好')

  // Character Information Container
  let $characterInfoContainer = $('<div>').addClass('character-info-container')

                  // APPENDING // APPENDING // APPENDING // APPENDING //

  // Appending items to $form
  $form.append($input, $sampleCharacters);


  // Appending items  to APP CONTAINER
  $('.app-container').append($form, $characterInfoContainer) // add final appended items here!



                // DICTIONARY FUNCTIONALITY // DICTIONARY FUNCTIONALITY //


// Save and reset input field on ENTER
  const captureUserInput = () => {
    event.preventDefault(); // preventing page refresh
    $userInput = $(event.currentTarget).val(); // saving user input to variable
    $(event.currentTarget).val('') // clearing user input field;
  }

// Calls on the website to provide information based on userInput
  const callData = (input) => {
    $.ajax({
      url: `https://api.ctext.org/getcharacter?char=${input}`
    }).then(
      (data) => {
        let charPinyin = data.char; // Set Pinyin of Character
        let charPronunciation = data.readings.mandarinpinyin[0]; // Set Pronunciation of Character
        setCharInformation(charPinyin, charPronunciation)
      }
    )
  }

  const setCharInformation = (pinyin, pronunciation) => {

    // Create Character Container:
    // Container div
    let $newCharContainer = $('<div>').addClass('character-container')

    // Character Information
    $('<a>').text(pinyin)
      .addClass('pinyin')
      .appendTo($newCharContainer)
      .attr({'href': `https://ctext.org/dictionary.pl?if=en&char=${pinyin}`, 'target': '_blank'})
    $('<a>').text(pronunciation)
      .addClass('pronunciation')
      .appendTo($newCharContainer)
      .attr({'href': `https://ctext.org/dictionary.pl?if=en&char=${pinyin}`, 'target': '_blank'})

    // Appending to the info container
    $characterInfoContainer.append($newCharContainer)
  }




})
