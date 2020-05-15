// One flexbox for the entire letter 'a' - this will be .a-container. It will have display: flex, flex-direction: row, and align-items: center; Contained inside will be:
  // 4 divs with the class name pixel-column. These will be id'd as a-column1, a-column2, a-column3, a-column4. Inside one of these divs will be:
    // 4 imgs each with the class pixel column. These will be id'd as a-column1-row1, a-column1-row2, etc
    // These will be assigned a class of either .on or .off


//     c1 2 3 4
// 1:   - # # -
// 2:   # - - #
// 3:   # # # #
// 4:   # - - #
// 4:   # - - $



// FIRST WRITE THE CODE FOR A ALL OFF block

// first you would need to get the body

$(() => {

  const $body = $('body');
  let counter = 1;

  const createAlphabetContainer = letter => {
    const $aContainer = $('<div>').attr({'class': 'a-container', 'id': `container${counter}`});
    createAlphabetColumns($aContainer, counter);
    $body.append($aContainer)
    letter(counter);
    counter++;

    // console.log($letter);

  }

  const createAlphabetRows = ($column, index, container) => {
    for(let i = 1; i < 6; i++) {
      // console.log('creating row');
      const $aColumnRow = $('<div>').attr({'class': 'a-column, pixel', 'id': 'a' + container + '-column' + index + '-row' + i})
      $column.append($aColumnRow)
    }
  }

  const createAlphabetColumns = ($container, counter) => {
    for(let i = 1; i < 6; i++) {
      // console.log('creating column');
      const $aColumn = $('<div>').attr({'class': 'pixel-column', 'id': 'a-column' + i})
      // console.log($aColumn);
      createAlphabetRows($aColumn, i, counter);
      $container.append($aColumn)
    }
  }

  let $letter;

  const printLetterA = (num) => {
    // To be turned off = c1r1, c2r2, c2r4, c2r5, c3r2, c3r4, c3r5, c4r1
    let $letterA = $(`#a${num}-column1-row1, #a${num}-column2-row2, #a${num}-column2-row4, #a${num}-column2-row5, #a${num}-column3-row2, #a${num}-column3-row4, #a${num}-column3-row5, #a${num}-column4-row1, #a${num}-column5-row1, #a${num}-column5-row2, #a${num}-column5-row3, #a${num}-column5-row4, #a${num}-column5-row5`);
    $letterA.addClass('off');
  }

  const printLetterB = (num) => {
    // To be turned off = 2-2, 2-4, 3-2, 3-4, 4-1, 4-3, 4-5
    let $letterB = $(`#a${num}-column2-row2, #a${num}-column2-row4, #a${num}-column3-row2, #a${num}-column3-row4, #a${num}-column4-row1, #a${num}-column4-row3, #a${num}-column4-row5, #a${num}-column5-row1, #a${num}-column5-row2, #a${num}-column5-row3, #a${num}-column5-row4, #a${num}-column5-row5`)
    $letterB.addClass('off');
  }

  const printLetterC = (num) => {
    let $letterC = $(`#a${num}-column1-row1, #a${num}-column1-row5, #a${num}-column2-row2, #a${num}-column2-row3, #a${num}-column2-row4, #a${num}-column3-row2, #a${num}-column3-row3, #a${num}-column3-row4, #a${num}-column4-row1, #a${num}-column4-row3, #a${num}-column4-row5, #a${num}-column5-row1, #a${num}-column5-row2, #a${num}-column5-row3, #a${num}-column5-row4, #a${num}-column5-row5`)
    $letterC.addClass('off');
  }

  const printLetterD = (num) => {
    let $letterD = $(`#a${num}-column2-row2, #a${num}-column2-row3, #a${num}-column2-row4, #a${num}-column3-row2, #a${num}-column3-row3, #a${num}-column3-row4, #a${num}-column4-row1, #a${num}-column4-row5, #a${num}-column5-row1, #a${num}-column5-row2, #a${num}-column5-row3, #a${num}-column5-row4, #a${num}-column5-row5`)
    $letterD.addClass('off');
  }

  const printLetterE = (num) => {
    let $letterE = $(`#a${num}-column2-row2, #a${num}-column2-row4, #a${num}-column3-row2, #a${num}-column3-row4, #a${num}-column4-row2, #a${num}-column4-row3, #a${num}-column4-row4, #a${num}-column5-row1, #a${num}-column5-row2, #a${num}-column5-row3, #a${num}-column5-row4, #a${num}-column5-row5`)
    $letterE.addClass('off');
  }

  const printLetterF = (num) => {
    let $letterF = $(`#a${num}-column2-row2, #a${num}-column2-row4, #a${num}-column2-row5, #a${num}-column3-row2, #a${num}-column3-row4, #a${num}-column3-row5, #a${num}-column4-row2, #a${num}-column4-row3, #a${num}-column4-row4, #a${num}-column4-row5, #a${num}-column5-row1, #a${num}-column5-row2, #a${num}-column5-row3, #a${num}-column5-row4, #a${num}-column5-row5`)
    $letterF.addClass('off');
  }

  const printLetterG = (num) => {
    let $letterG = $(`#a${num}-column1-row1, #a${num}-column1-row5, #a${num}-column2-row2, #a${num}-column2-row3, #a${num}-column2-row4, #a${num}-column3-row2, #a${num}-column3-row4, #a${num}-column4-row1, #a${num}-column4-row2, #a${num}-column4-row5, #a${num}-column5-row1, #a${num}-column5-row2, #a${num}-column5-row3, #a${num}-column5-row4, #a${num}-column5-row5`)
    $letterG.addClass('off');
  }

  const printLetterH = (num) => {
    let $letterH = $(`#a${num}-column2-row1, #a${num}-column2-row2, #a${num}-column2-row4, #a${num}-column2-row5, #a${num}-column3-row1, #a${num}-column3-row2, #a${num}-column3-row4, #a${num}-column3-row5, #a${num}-column5-row1, #a${num}-column5-row2, #a${num}-column5-row3, #a${num}-column5-row4, #a${num}-column5-row5`)
    $letterH.addClass('off');
  }

  const printLetterI = (num) => {
    let $letterI = $(`#a${num}-column1-row2, #a${num}-column1-row3, #a${num}-column1-row4, #a${num}-column3-row2, #a${num}-column3-row3, #a${num}-column3-row4, #a${num}-column4-row1, #a${num}-column4-row2, #a${num}-column4-row3, #a${num}-column4-row4, #a${num}-column4-row5, #a${num}-column5-row1, #a${num}-column5-row2, #a${num}-column5-row3, #a${num}-column5-row4, #a${num}-column5-row5`)
    $letterI.addClass('off');
  }

  const printLetterJ = (num) => {
    let $letterJ= $(`#a${num}-column1-row1, #a${num}-column1-row2, #a${num}-column1-row3, #a${num}-column1-row5, #a${num}-column2-row1, #a${num}-column2-row2, #a${num}-column2-row3, #a${num}-column2-row4, #a${num}-column3-row1, #a${num}-column3-row2, #a${num}-column3-row3, #a${num}-column3-row4, #a${num}-column4-row5, #a${num}-column5-row1, #a${num}-column5-row2, #a${num}-column5-row3, #a${num}-column5-row4, #a${num}-column5-row5`)
    $letterJ.addClass('off');
  }

  const printLetterK = (num) => {
    let $letterK = $(`#a${num}-column2-row1, #a${num}-column2-row2, #a${num}-column2-row4, #a${num}-column2-row5, #a${num}-column3-row1, #a${num}-column3-row3, #a${num}-column3-row5, #a${num}-column4-row2, #a${num}-column4-row3, #a${num}-column4-row4, #a${num}-column5-row1, #a${num}-column5-row2, #a${num}-column5-row3, #a${num}-column5-row4, #a${num}-column5-row5` )
    $letterK.addClass('off');
  }

  const printLetterL = (num) => {
    let $letterL = $(`#a${num}-column2-row1, #a${num}-column2-row2, #a${num}-column2-row3, #a${num}-column2-row4, #a${num}-column3-row1, #a${num}-column3-row2, #a${num}-column3-row3, #a${num}-column3-row4, #a${num}-column4-row1, #a${num}-column4-row2, #a${num}-column4-row3, #a${num}-column4-row4, #a${num}-column5-row1, #a${num}-column5-row2, #a${num}-column5-row3, #a${num}-column5-row4, #a${num}-column5-row5`)
    $letterL.addClass('off');
  }

  const printLetterM = (num) => {
    let $letterM = $(`#a${num}-column2-row1, #a${num}-column2-row3, #a${num}-column2-row4, #a${num}-column2-row5, #a${num}-column3-row1, #a${num}-column3-row2, #a${num}-column3-row4, #a${num}-column3-row5, #a${num}-column4-row1, #a${num}-column4-row3, #a${num}-column4-row4, #a${num}-column4-row5`);
    $letterM.addClass('off');
  }

  const printLetterN = (num) => {
    let $letterN = $(`#a${num}-column2-row1, #a${num}-column2-row3, #a${num}-column2-row4, #a${num}-column2-row5, #a${num}-column3-row1, #a${num}-column3-row2, #a${num}-column3-row4, #a${num}-column3-row5, #a${num}-column5-row1, #a${num}-column5-row2, #a${num}-column5-row3, #a${num}-column5-row4, #a${num}-column5-row5`)
    $letterN.addClass('off');
  }

  const printLetterO = (num) => {
    let $letterO = $(`#a${num}-column1-row1, #a${num}-column1-row5, #a${num}-column2-row2, #a${num}-column2-row3, #a${num}-column2-row4, #a${num}-column3-row2, #a${num}-column3-row3, #a${num}-column3-row4, #a${num}-column4-row1, #a${num}-column4-row5, #a${num}-column5-row1, #a${num}-column5-row2, #a${num}-column5-row3, #a${num}-column5-row4, #a${num}-column5-row5`)
    $letterO.addClass('off');
  }

  const printLetterP = (num) => {
    let $letterP = $(`#a${num}-column2-row2, #a${num}-column2-row4, #a${num}-column2-row5, #a${num}-column3-row2, #a${num}-column3-row4, #a${num}-column3-row5, #a${num}-column4-row4, #a${num}-column4-row5, #a${num}-column5-row1, #a${num}-column5-row2, #a${num}-column5-row3, #a${num}-column5-row4, #a${num}-column5-row5`)
    $letterP.addClass('off');
  }

  const printLetterQ = (num) => {
    let $letterQ = $(`#a${num}-column1-row1, #a${num}-column1-row5, #a${num}-column2-row2, #a${num}-column2-row3, #a${num}-column2-row4, #a${num}-column3-row2, #a${num}-column3-row3, #a${num}-column3-row5, #a${num}-column4-row1, #a${num}-column4-row4, #a${num}-column5-row1, #a${num}-column5-row2, #a${num}-column5-row3, #a${num}-column5-row4, #a${num}-column5-row5`)
    $letterQ.addClass('off');
  }

  const printLetterR = (num) => {
    let $letterR = $(`#a${num}-column2-row2, #a${num}-column2-row4, #a${num}-column2-row5, #a${num}-column3-row2, #a${num}-column3-row5, #a${num}-column4-row4, #a${num}-column5-row1, #a${num}-column5-row2, #a${num}-column5-row3, #a${num}-column5-row4, #a${num}-column5-row5`)
    $letterR.addClass('off');
  }

  const printLetterS = (num) => {
    let $letterS = $(`#a${num}-column1-row1, #a${num}-column1-row3, #a${num}-column1-row4, #a${num}-column2-row2, #a${num}-column2-row4, #a${num}-column3-row2, #a${num}-column3-row4, #a${num}-column4-row2, #a${num}-column4-row3, #a${num}-column4-row5, #a${num}-column5-row1, #a${num}-column5-row2, #a${num}-column5-row3, #a${num}-column5-row4, #a${num}-column5-row5`)
    $letterS.addClass('off');
  }

  const printLetterT = (num) => {
    let $letterT = $(`#a${num}-column1-row2, #a${num}-column1-row3, #a${num}-column1-row4, #a${num}-column1-row5, #a${num}-column2-row2, #a${num}-column2-row3, #a${num}-column2-row4, #a${num}-column2-row5, #a${num}-column4-row2, #a${num}-column4-row3, #a${num}-column4-row4, #a${num}-column4-row5, #a${num}-column5-row2, #a${num}-column5-row3, #a${num}-column5-row4, #a${num}-column5-row5`)
    $letterT.addClass('off');
  }

  const printLetterU = (num) => {
    let $letterU = $(`#a${num}-column1-row5, #a${num}-column2-row1, #a${num}-column2-row2, #a${num}-column2-row3, #a${num}-column2-row4, #a${num}-column3-row1, #a${num}-column3-row2, #a${num}-column3-row3, #a${num}-column3-row4, #a${num}-column4-row5, #a${num}-column5-row1, #a${num}-column5-row2, #a${num}-column5-row3, #a${num}-column5-row4, #a${num}-column5-row5`)
    $letterU.addClass('off');
  }

  const printLetterV = (num) => {
    let $letterV = $(`#a${num}-column1-row3, #a${num}-column1-row4, #a${num}-column1-row5, #a${num}-column2-row1, #a${num}-column2-row2, #a${num}-column2-row5, #a${num}-column3-row1, #a${num}-column3-row2, #a${num}-column3-row3, #a${num}-column3-row4, #a${num}-column4-row1, #a${num}-column4-row2, #a${num}-column4-row5, #a${num}-column5-row3, #a${num}-column5-row4, #a${num}-column5-row5`)
    $letterV.addClass('off');
  }

  const printLetterW = (num) => {
    let $letterW = $(`#a${num}-column2-row1, #a${num}-column2-row2, #a${num}-column2-row3, #a${num}-column2-row5, #a${num}-column3-row1, #a${num}-column3-row2, #a${num}-column3-row4, #a${num}-column3-row5, #a${num}-column4-row1, #a${num}-column4-row2, #a${num}-column4-row3, #a${num}-column4-row5`)
    $letterW.addClass('off');
  }

  const printLetterX = (num) => {
    let $letterX = $(`#a${num}-column1-row3, #a${num}-column2-row1, #a${num}-column2-row2, #a${num}-column2-row4, #a${num}-column2-row5, #a${num}-column3-row1, #a${num}-column3-row2, #a${num}-column3-row4, #a${num}-column3-row5, #a${num}-column4-row3, #a${num}-column5-row1, #a${num}-column5-row2, #a${num}-column5-row3, #a${num}-column5-row4, #a${num}-column5-row5`)
    $letterX.addClass('off');
  }

  const printLetterY = (num) => {
    let $letterY = $(`#a${num}-column1-row3, #a${num}-column1-row4, #a${num}-column1-row5, #a${num}-column2-row1, #a${num}-column2-row2, #a${num}-column2-row4, #a${num}-column2-row5, #a${num}-column3-row1, #a${num}-column3-row2, #a${num}-column4-row1, #a${num}-column4-row2, #a${num}-column4-row4, #a${num}-column4-row5, #a${num}-column5-row3, #a${num}-column5-row4, #a${num}-column5-row5`)
    $letterY.addClass('off');
  }

  const printLetterZ = (num) => {
    let $letterZ = $(`#a${num}-column1-row2, #a${num}-column1-row3, #a${num}-column2-row2, #a${num}-column2-row4, #a${num}-column3-row3, #a${num}-column3-row4, #a${num}-column4-row2, #a${num}-column4-row3, #a${num}-column4-row4, #a${num}-column5-row1, #a${num}-column5-row2, #a${num}-column5-row3, #a${num}-column5-row4, #a${num}-column5-row5`)
    $letterZ.addClass('off');
  }

  const printLetterSpace = (num) => {
    let $letterSpace = $(`#container${num}`).children().children();
    $letterSpace.addClass('off');
  }

  const printLetterSingleQuote = (num) => {
    printLetterSpace(num);
    let $letterSingleQuote = $(`#a${num}-column3-row1, #a${num}-column3-row2`);
    $letterSingleQuote.removeClass('off');
  }

  const printLetterBang = (num) => {
    printLetterSpace(num);
    let $letterSingleQuote = $(`#a${num}-column3-row1, #a${num}-column3-row2, #a${num}-column3-row3, #a${num}-column3-row5`);
    $letterSingleQuote.removeClass('off');
  }

  // let userResponse = prompt('Try typing something')
  let word = "Happy Mother's Day!";
  let characterArray = word.split('')
  console.log(characterArray);

  for (index in characterArray) {
    let currentChar = characterArray[index];
    if (currentChar.toLowerCase() === 'a' ){
      createAlphabetContainer(printLetterA)
    } else if (currentChar.toLowerCase() === 'b') {
      createAlphabetContainer(printLetterB)
    } else if (currentChar.toLowerCase() === 'c') {
      createAlphabetContainer(printLetterC)
    } else if (currentChar.toLowerCase() === 'd') {
      createAlphabetContainer(printLetterD)
    } else if (currentChar.toLowerCase() === 'e') {
      createAlphabetContainer(printLetterE)
    } else if (currentChar.toLowerCase() === 'f') {
      createAlphabetContainer(printLetterF)
    } else if (currentChar.toLowerCase() === 'g') {
      createAlphabetContainer(printLetterG)
    } else if (currentChar.toLowerCase() === 'h') {
      createAlphabetContainer(printLetterH)
    } else if (currentChar.toLowerCase() === 'i') {
      createAlphabetContainer(printLetterI)
    } else if (currentChar.toLowerCase() === 'j') {
      createAlphabetContainer(printLetterJ)
    } else if (currentChar.toLowerCase() === 'k') {
      createAlphabetContainer(printLetterK)
    } else if (currentChar.toLowerCase() === 'l') {
      createAlphabetContainer(printLetterL)
    } else if (currentChar.toLowerCase() === 'm') {
      createAlphabetContainer(printLetterM)
    } else if (currentChar.toLowerCase() === 'n') {
      createAlphabetContainer(printLetterN)
    } else if (currentChar.toLowerCase() === 'o') {
      createAlphabetContainer(printLetterO)
    } else if (currentChar.toLowerCase() === 'p') {
      createAlphabetContainer(printLetterP)
    } else if (currentChar.toLowerCase() === 'q') {
      createAlphabetContainer(printLetterQ)
    } else if (currentChar.toLowerCase() === 'r') {
      createAlphabetContainer(printLetterR)
    } else if (currentChar.toLowerCase() === 's') {
      createAlphabetContainer(printLetterS)
    } else if (currentChar.toLowerCase() === 't') {
      createAlphabetContainer(printLetterT)
    } else if (currentChar.toLowerCase() === 'u') {
      createAlphabetContainer(printLetterU)
    } else if (currentChar.toLowerCase() === 'v') {
      createAlphabetContainer(printLetterV)
    } else if (currentChar.toLowerCase() === 'w') {
      createAlphabetContainer(printLetterW)
    } else if (currentChar.toLowerCase() === 'x') {
      createAlphabetContainer(printLetterX)
    } else if (currentChar.toLowerCase() === 'y') {
      createAlphabetContainer(printLetterY)
    } else if (currentChar.toLowerCase() === 'z') {
      createAlphabetContainer(printLetterZ)
    } else if (currentChar === ' ') {
      createAlphabetContainer(printLetterSpace)
    } else if (currentChar === '\'') {
      createAlphabetContainer(printLetterSingleQuote)
    } else if (currentChar === '!') {
      createAlphabetContainer(printLetterBang)
    }
  }
  const changePicture = () => {
    let randomImageNumber = Math.ceil(Math.random() * 46);
    let imgUrl = `img/image${randomImageNumber}.jpg`;
    $('.pixel').not('.off').css('background-image', `url(${imgUrl})`);
    $('#big-image').attr('src', imgUrl);
    $body.scrollLeft(100)
  }

  var bigImage = $('<img id="big-image" class="big" src="img/image4.jpg">');
  $body.append(bigImage);
  var audio = document.createElement('audio');
  audio.setAttribute('src', 'audio/song.mp3');
  $body.click(() => audio.play())
  // var audio = $('<audio class="controls" controls loop autoplay preload="auto"><source src="audio/song.mp3" type="audio/mpeg"></audio>');
  $body.append(audio);
  $body.css('zoom','30%'); /* Webkit browsers */
  $body.css('zoom','0.3'); /* Other non-webkit browsers */

  setInterval(changePicture, 2000)



})
