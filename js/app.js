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

  // ajax call on test button
  $('#test-button').on('click', (event) => {
    let dictionaryLink = `https://api.ctext.org/getcharacter?char=${$('input[type="text"]').val()}`
    event.preventDefault()
    console.log(`button pressed + text input:: ${$('input[type="text"]').val()}`);
    $.ajax({
      url: dictionaryLink,
    }).then(
      (data) => {
        if($('input[type="text"]').val()) {
          // CALL THIS CODEBLOCK WHEN DATA HAS BEEN RETRIEVED AND IS READY TO BE MANIPULATED
          console.log(data);
          $('#character-information').children().detach();
          $('<li>').text(`${data.char}`).addClass('character-li').appendTo($('#character-information'))
          $('<li>').text(`Radical Character: ${data.radical}`).appendTo($('#character-information'))
          $('<li>').text(`Radical Strokes: ${data.radicalstrokes}`).appendTo($('#character-information'))
          $('<a>').attr('href', `${data.url}`).text(`Definition`).appendTo($('#character-information'))


        }
      }
    )
  })




})
