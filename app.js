var qwerty = document.querySelector('#qwerty');
var phrase = document.getElementById('phrase');
var startButton = document.getElementById('overlay');
var startButtonLink = document.getElementsByClassName('btn__reset');

//---------------------------Miss counter
var missed = 0;

//---------------------------Phrase array


var phrases = [
  'hello there',
  'html is easy',
  'code is fun',
  'javascript is tough',
  'css is cool'
];

//---------------------------------------Functions
function getRandomPhraseAsArray(arr) {
  var i = Math.floor(Math.random() * arr.length);
  var letterArray = arr[i].split("");
  return letterArray;
}

//-------------------------------------------------------------

function addPhrasetoDisplay(letterarr) {
  for (var i = 0; i < letterarr.length; i++) {
    var li = document.createElement('li');
    var letter = document.createTextNode(letterarr[i]);
    li.appendChild(letter);

    //------------------Check is a space, then add the right class
    if ( li.innerText.indexOf(' ') >= 0) {
      li.className = 'space';
      document.getElementsByTagName('ul')[0].appendChild(li);

    //----------------------------------------------------------
    } else {
      li.className = 'letter';
      document.getElementsByTagName('ul')[0].appendChild(li);
    }
  }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhrasetoDisplay(phraseArray);

//---------------------------------------------------------------
//---------------------------------------------------------------------------------------



function checkLetter(input) {

  var letter = document.getElementsByClassName('letter');
  var letterFound = 0;
  var correct = false;


  for (var i = 0; i < letter.length ; i++) {


    if ( input == letter[i].innerText ) {
      letter[i].className += ' show';
      letterFound += 1;
      correct = true;
      if ( i == letter.length) {
        return correct;
      }
    }

    //-----------------------------------------------------
    else if ( i == letter.length - 1 && correct == true ) {
      return correct;
    }

    //---------------------------------------------------------
    else if ( i == letter.length - 1 && correct == false ) {
      return null;
    }

  }
};

//---------------------------------------------------------------------------------------

qwerty.addEventListener("click", function(e) {
  const target = e.target;
//----------------------------------------
  if ( target.nodeName == 'BUTTON'  ) {
    target.className += ' chosen';
    target.disabled = true;
//----------------------------------------
    if ( checkLetter(target.innerText) === null ) {
      var scoreboard = document.getElementsByTagName('ol');
      var tries = document.getElementsByClassName('tries');
      scoreboard[0].removeChild(tries[0]);
      missed += 1;
      checkWin();
    //-----------------------------------------------------------------------
    } else {
      checkWin();
    }

  }
});

function checkWin() {
  var show = document.getElementsByClassName('show');
  var letter = document.getElementsByClassName('letter');
  //--------------------------------------------------------------------
  if (show.length == letter.length) {
    startButton.style.display = 'flex';
    startButton.className = 'win';
    startButtonLink[0].innerText = 'You Won!'

  //-------------------------------------------------------------------
  } else if (missed >= 5 ) {
    startButton.style.display = 'flex';
    startButton.className = 'lose';
    startButtonLink[0].innerText = 'You Lost!';
  }
}


//----------------------------Overlay hide
startButton.addEventListener("click", function() {
  startButton.style.display = 'none';
})
