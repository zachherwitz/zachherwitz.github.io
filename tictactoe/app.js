$(() => {

  let counter = 0;
  let gameOver = false;

  const ticOrTac = () => {
    if(!gameOver){
      if(counter % 2 === 0){
        $(event.currentTarget).text('O').addClass('o')
      } else {
        $(event.currentTarget).text('X').addClass('x')
      }
    } else {
      console.log('the game is over, dummy');
    }
  }

  // OK I KNOW THIS IS THE DUMBEST WAY TO DO THIS BUT IM ABOUT TO DO IT, SORRY
  // Set the following to a switch statement
  //  Possible Wins:
  //  ROWS:
  // id(row1)class(location-1) id(row1)class(location-2) id(row1)class(location-3)
  // id(row2)class(location-1) id(row2)class(location-2) id(row2)class(location-3)
  // id(row3)class(location-1) id(row3)class(location-3) id(row3)class(location-3)
  //  COLUMNS:
  // id(row1)class(location-1) id(row2)class(location-1) id(row3)class(location-1)
  // id(row1)class(location-2) id(row2)class(location-2) id(row3)class(location-2)
  // id(row1)class(location-3) id(row2)class(location-3) id(row3)class(location-3)
  //  DIAGONALS:
  // id(row1)class(location-1) id(row2)class(location-2) id(row3)class(location-3)
  // id(row1)class(location-3) id(row2)class(location-2) id(row3)class(location-1)

  const determineWinner = () => {
    if($(event.currentTarget).css('background-color') === 'rgb(227, 234, 167)') {
      $(event.currentTarget).off()
      gameOver = true;
      $('.game-container').append($('<div>').text('X\'s Win! Click Here to Reload').css('font-size', '3em').click(() => {
        location.reload();
      }))
    } else if ($(event.currentTarget).css('background-color') === 'rgb(181, 231, 160)') {
      $(event.currentTarget).off()
      gameOver = true;
      $('.game-container').append($('<div>').text('O\'s Win! Click Here to Reload').css('font-size', '3em').click(() => {
        location.reload();
      }))
    }

  }

  const checkForWinOrTie = () => {
    console.log('checking for win or tie');

    // CHECKING FOR ROW WINS - YES I KNOW THIS IS GETTING STUPIDER AS I GO
    if($('.1-0').css('background-color') === $('.1-1').css('background-color') && $('.1-0').css('background-color') === $('.1-2').css('background-color') && $('.1-0').css('background-color') !== 'rgb(255, 255, 255)') {
      determineWinner()
    }
    else if ($('.2-0').css('background-color') === $('.2-1').css('background-color') && $('.2-0').css('background-color') === $('.2-2').css('background-color') && $('.2-0').css('background-color') !== 'rgb(255, 255, 255)') {
      determineWinner()
    }
    else if ($('.3-0').css('background-color') === $('.3-1').css('background-color') && $('.3-0').css('background-color') === $('.3-2').css('background-color') && $('.3-0').css('background-color') !== 'rgb(255, 255, 255)') {
      determineWinner()
    } // CHECKING FOR COLUMN WINS - OH BOY HERE WE GO
    else if ($('.1-0').css('background-color') === $('.2-0').css('background-color') && $('.1-0').css('background-color') === $('.3-0').css('background-color') && $('.1-0').css('background-color') !== 'rgb(255, 255, 255)') {
      determineWinner()
    }
    else if ($('.1-1').css('background-color') === $('.2-1').css('background-color') && $('.1-1').css('background-color') === $('.3-1').css('background-color') && $('.1-1').css('background-color') !== 'rgb(255, 255, 255)') {
      determineWinner()
    }
    else if ($('.1-2').css('background-color') === $('.2-2').css('background-color') && $('.1-2').css('background-color') === $('.3-2').css('background-color') && $('.1-2').css('background-color') !== 'rgb(255, 255, 255)') {
      determineWinner()
    } // CHECKING FOR DIAGONAL WINS - MIGHT AS WELL FINISH THIS OFF
    else if ($('.1-0').css('background-color') === $('.2-1').css('background-color') && $('.1-0').css('background-color') === $('.3-2').css('background-color') && $('.1-0').css('background-color') !== 'rgb(255, 255, 255)') {
      determineWinner()
    }
    else if ($('.1-2').css('background-color') === $('.2-1').css('background-color') && $('.1-2').css('background-color') === $('.3-0').css('background-color') && $('.1-2').css('background-color') !== 'rgb(255, 255, 255)') {
      determineWinner()
    }
  }


  // I had previously learned the .off() functionality from a previous homework, and by checking the documentation.
  const createDivs = (row, rowNum) => {
    for(let i = 0; i < 3; i++) {
      const $newDiv = $('<div>')
        .addClass('square')
        .addClass(`${rowNum}-${i}`)
        .on('click', () => {
          $(event.currentTarget).addClass(ticOrTac())
          counter++;
          $(event.currentTarget).off()
        })
        .on('click', () => {
          if(gameOver === false){
            checkForWinOrTie()
            console.log(counter);
            if(counter === 9) {
              $('.game-container')
              .append($('<div>')
              .text('TIE GAME. CLICK HERE TO RESTART')
              .css('font-size', '3em')
              .click(() => {
                location.reload();
              }))
            $(event.currentTarget).off()
          }
        }
      })
    $(row).append($newDiv)
    }
  }

  createDivs('#row1', 1)
  createDivs('#row2', 2)
  createDivs('#row3', 3)

})
