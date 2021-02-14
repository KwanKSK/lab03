const ticTacToeGame = new TicTacToeGame();
ticTacToeGame.start();

function TicTacToeGame() {
  const board = new BoardGame();
  const humanTurn = new HumanTurn(board);
  const computerTurn = new ComputerTurn(board);
  let countTurn = 0;

  this.start = function() {
    const config = { childList: true };
    const observer = new MutationObserver(() => takeTurn());
    board.positions.forEach((el) => observer.observe(el, config));
    takeTurn();
  }

  function takeTurn() {
    if (board.checkForWinner()) {
      return;
    }

    if (countTurn % 2 === 0) {
      humanTurn.takeTurn();
    } 
    else {
      if(countTurn !== 9){
        computerTurn.takeTurn();
      }
      else{
        document.getElementById("result").innerHTML = 'Draw';
      }
    }
    countTurn++;
  };
}

function BoardGame() {
  this.positions = Array.from(document.querySelectorAll('.col'));

  this.checkForWinner = function() {
    let winner = false;

    const winCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8]
    ];

    const positions = this.positions;
    winCombinations.forEach((winCombo) => {
      const pos0InnerText = positions[winCombo[0]].innerText;
      const pos1InnerText = positions[winCombo[1]].innerText;
      const pos2InnerText = positions[winCombo[2]].innerText;
      const isWinCombo = pos0InnerText !== '' && pos0InnerText === pos1InnerText && pos1InnerText === pos2InnerText;
      if (isWinCombo) {
        winner = true;
        winCombo.forEach((index) => {
          positions[index].className += ' winner';

          if(positions[index].innerText === "X"){
            document.getElementById("result").innerHTML = "Player is winner.";
          }
          else{
            document.getElementById("result").innerHTML = "Computer is winner.";           
          }
            
        })
      }
    });
    return winner;
  }
}

function ComputerTurn(board) {
  this.takeTurn = function() {
    let availablePositions = board.positions.filter((p) => p.innerText === '');
    const moveO = Math.floor(Math.random() * (availablePositions.length - 0));
    availablePositions[moveO].innerText = 'O';
  }
}

function HumanTurn(board) {
  this.takeTurn = function() {
    board.positions.forEach(el => el.addEventListener('click', handleTurnTaken));
  }

  function handleTurnTaken(event) {
    if(event.target.innerText === '')
    {
      event.target.innerText = 'X';
      board.positions.forEach(el => el.removeEventListener('click', handleTurnTaken));
    }
  }
}
