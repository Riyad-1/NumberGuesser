/*
GAME FUNCTION
- Player must guess a number between a min and max
- Player gets a certain number of guesses
- Notify player of guesses remaining
- Notify the player with correct answer if lose
- Let player to choose again
*/

// Game values
let min = 1, 
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

  // Validate
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red')
  }

  // Check if Won
  if(guess === winningNum){
    // Game over, won
    gameOver(true, `${winningNum} is Correct, You Win!`);

  } else {
    // Wrong number
    guessesLeft -= 1;

    if(guessesLeft === 0){
      // Game over, lost
      gameOver(false, `Game Over, You Lost. The Correct Number Was ${winningNum}`);

    } else {
      // Game continues - answer wrong
      
      // Change border colour
      guessInput.style.borderColor = 'red';

      // Clear input
      guessInput.value = '';
      
      // Tell user its the wrong number
      setMessage(`${guess} is not correct, ${guess} guesses left`, 'red');
    }

  }
});

// Game over
function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red'

  // Disable input
  guessInput.disabled = true;
  // Change border colour
  guessInput.style.borderColor = color;
  // Set text colour
  message.style.color = color;
  // Set Message
  setMessage(msg);

  // Play Again
  guessBtn.value = 'Play Again';
  guessBtn.style.borderColor = 'blue';
  guessBtn.className +='play-again'; 
}

// Get winning number
function getRandomNum(min, max){
  return Math.floor(Math.random()*(max - min + 1) + min);
}

// Set Message
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}
