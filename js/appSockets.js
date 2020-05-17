$(() => {

  console.log('linked!');

  // Creating Global variables
  let $userInput = '';


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
                    captureUserInput(); // captures the user input and saves it to $userInput
                    callData($userInput);
                  }
                })


                  // APPENDING // APPENDING // APPENDING // APPENDING //

  // Appending items to $form
  $form.append($input);


  // Appending items  to APP CONTAINER
  $('.app-container').append($form) // add final appended items here!


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
        console.log(data);
      }
    )
  }






})
