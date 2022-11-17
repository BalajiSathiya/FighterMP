let timerID;
let timer = 30;

function rectangleCollision({rectangle, rectangle2}) {
  return (
      rectangle.attackBox.position.x + rectangle.attackBox.width >= rectangle2.position.x &&
      rectangle.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
      rectangle.attackBox.position.y + rectangle.attackBox.height >= rectangle2.position.y &&
      rectangle.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  )
}

function determineWinner({player, player2}) {
  clearTimeout(timerID)
  document.querySelector('#tie').style.display = 'flex'
  if (player.health === player2.health) {
    document.querySelector('#tie').innerHTML = 'Tie'
  } else if (player.health > player2.health) {
    document.querySelector('#tie').innerHTML = 'Player 1 Wins'
  } else if (player.health < player2.health) {
    document.querySelector('#tie').innerHTML = 'Player 2 Wins'
  }
}

function decreaseTimer(player, player2) {
  if (timer > 0) {
    timerID = setTimeout(decreaseTimer, 1000)
    timer--;
    document.querySelector('#timer').innerHTML = timer
  }
  if (timer === 0) {
    determineWinner({player, player2})
  }
}

export {rectangleCollision, determineWinner, decreaseTimer};