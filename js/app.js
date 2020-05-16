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
  // let searchTextsLink = `https://api.ctext.org/searchtexts?title=${testChar}`

  // SEARCH FOR A CHARACHTER, GET A TITLE AND URN BACK WITH A LINK TO IT -
  // TODO:: getlink?
  // const getBookInfo = (data) => {
  //   console.log(data.books[0].title);
  //   console.log(data.books[0].urn);
  // }

  // clearing input field on click
  $('#input-field').on('click', (event) => {
    $(event.currentTarget).val('')
  })

  // pull all data when clicking 'pull data' button
  $('#context-button').on('click', (event) => {
    let contextLink = `https://api.ctext.org/searchtexts?title=${$('input[type="text"]').val()}`
    event.preventDefault();
    $('.context-container').children().detach()
    console.log(`context button pressed + text input:: ${contextLink}`);
    $.ajax({
      url: contextLink,
    }).then(
      (data) => {
        // Get the URN of the first book returned
        console.log(data.books[0].title);
        for (books in data.books) {
          let $contextTitleElement = $('<a>').text(data.books[books].title).appendTo('.context-container')
        }
      }
    )
  })

  // ajax call on test button
  $('#definition-button').on('click', (event) => {
    let dictionaryLink = `https://api.ctext.org/getcharacter?char=${$('input[type="text"]').val()}`
    event.preventDefault()
    console.log(`get definition button pressed + text input:: ${$('input[type="text"]').val()}`);
    $.ajax({
      url: dictionaryLink,
    }).then(
      (data) => {
        // Resetting character info box
        $('#character-information').children().detach();
        $('#radical-information').off().hide();

        if($('input[type="text"]').val() && !data.error) {
          // CALL THIS CODEBLOCK WHEN DATA HAS BEEN RETRIEVED AND IS READY TO BE MANIPULATED
          console.log(data);

          // Creating character link
          $('<a>').text(`${data.char}`).attr('href', `${data.url}`).addClass('character').appendTo($('#character-information'))

          // Creating Mandarin Pronunciation Display
          $('<div>').text(`'${data.readings.mandarinpinyin[0]}'`).addClass('pronunciation').appendTo('#character-information')

          // Creating and appending radical information
          $('#radical-information').show().text('More Information').on('click', (event) => {
            console.log(`clicked!`);
            $(event.currentTarget).children().toggle('fast', 'swing')

          })


          // Create More Information content
          $('<div>').text(`Radical Character: ${data.radical}`).appendTo($('#radical-information')).addClass('off')
          $('<div>').text(`Radical Strokes: ${data.radicalstrokes}`).appendTo($('#radical-information')).addClass('off')


        }
      }
    )
  })




})
