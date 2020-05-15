$(() => {

  let randomBookUrn;

  $.ajax({
    url: 'https://api.ctext.org/gettexttitles'
  }).then(
    (data) => {
      randomBookUrn = data.books[0].urn
      console.log(randomBookUrn);
      return randomBookUrn;
      // let $newRadical = $('<div>').text(data.radical)
      // $('body').append($newRadical)
    },
    (error) => {
      console.log('error');
    }
  )


  const displayText = () => {
    $.ajax({
      url: `https://api.ctext.org/gettext?urn=ctp:mozi/befriending-the-learned`
    }).then(
      (data) => {
        console.log(data);
        let $newDiv = $('<div>').text(data.fulltext[0])
        $('body').append($newDiv)
      },
      (error) => {
        console.log('error');
      }
    )
  }

  $('button').on('click', () => {
    displayText()
  })


})
