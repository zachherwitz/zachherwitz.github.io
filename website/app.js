
$(() => {

  // Set Up Background Colors
  let backgroundColors = ['images/blue.jpg', 'images/green.jpg', 'images/lightblue.jpg', 'images/orange.jpg', 'images/pink.jpg', 'images/yellow.jpg']

  const changeBackground = () => {
    console.log('changing background');
    let randomBackgroundColor = Math.floor(Math.random() * backgroundColors.length)
    $('.site-container').css('background-image', `url(${backgroundColors[randomBackgroundColor]})`)
  }


  setInterval(changeBackground, 2000)


  // Set Up Project Links
  let donutGame = 'donut/index.html'
  let friendsGame = 'friends/index.html'
  let gatekeeperGame = 'gatekeeper/index.html'
  let landscaperGame = 'landscaper/index.html'
  let mothersdayGame = 'mothersday/index.html'
  let spacebattleGame = 'spacebattle/index.html'
  let tictactocGame = 'tictactoe/index.html'

  let projectArray = [donutGame, friendsGame, gatekeeperGame, landscaperGame, mothersdayGame, spacebattleGame, tictactocGame]

  let projectUrl = ''

  for(project in projectArray) {
      projectUrl = projectArray[project];
      const $newLink = $('<a>').addClass('project-card').attr('href', `${projectUrl}`)
      $('.project-container').append($newLink)
  }


})
