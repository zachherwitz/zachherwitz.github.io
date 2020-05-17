$(() => {

  console.log('linked!');


          // HTML ELEMENTS // HTML ELEMENTS // HTML ELEMENTS // HTML ELEMENTS //


  // Creating Form:
  let $form = $('<form>')

  // Creating Form Innards:
  let $input = $('<input>')
                .attr({'type': 'text', 'id': 'inputField', 'name': 'inputField', 'value': '我'})
                .click(
                  (event) => {
                    event.preventDefault()
                  })


                  // APPENDING // APPENDING // APPENDING // APPENDING //

  // Appending items to $form
  $form.append($input);


  // Appending items  to APP CONTAINER
  $('.app-container').append($form) // add final appended items here!


                // DICTIONARY FUNCTIONALITY // DICTIONARY FUNCTIONALITY //

  const callData = (userInput) => {
    $.ajax({
      url: `https://api.ctext.org/getcharacter?char=${}`
    }).then(
      (data) => {
        console.log(data);
      }
    )
  }






})
