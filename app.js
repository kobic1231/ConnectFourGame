  (rowInput = document.querySelector(".Row")),
  (colInput = document.querySelector(".Col")),
  (pointstoWin = document.querySelector(".Win")),
  (btn = document.querySelector(".str_btn")),
  (btn_new = document.querySelector(".newGameBtn")),
  (begin = document.getElementById("begin")),
  (play = document.getElementById("play"));

btn.addEventListener("click", getInput);
btn_new.addEventListener('click', () => location.reload());

function getInput() {
  var gameTbl = {
    row: 0,
    col: 0,
    ptw: 0,
    victory : true,
    activePlayer: false
  };

  gameTbl.row = rowInput.value;
  gameTbl.col = colInput.value;
  gameTbl.ptw = pointstoWin.value;

  rulesCheck(gameTbl);
  if(gameTbl.err){
    play.classList.remove("remove");
    begin.classList.add("remove");
    generate_table(gameTbl);
    create_arr(gameTbl);
    playing(gameTbl);
  }
}

function rulesCheck(gameTbl) {
  gameTbl.err = true;
  if (gameTbl.row > 20 || gameTbl.col > 20) {
    document.getElementById("er").classList.remove('remove');
    gameTbl.err = false;
  } if (gameTbl.row < 4 || gameTbl.col < 4) {
    document.getElementById("er").classList.remove('remove');
    gameTbl.err = false;
  } if ((gameTbl.col - gameTbl.ptw) <= 0 || (gameTbl.row - gameTbl.ptw) <= 0 || gameTbl.ptw <= 0) {
    document.getElementById("er").classList.remove('remove');
    gameTbl.err = false;
  } if (gameTbl.row == NaN || gameTbl.col == NaN || gameTbl.ptw == NaN) {
    document.getElementById("er").classList.remove('remove');
    gameTbl.err = false;
  }
    return gameTbl;  
}

function generate_table (gameTbl) { 
    var gt = document.getElementById("gt");
    var tbl = document.createElement("table"); 
    tbl.className = "trow";

    for (let i = 0 ; i < gameTbl.col ; i++){
        tbl.appendChild(addtr(gameTbl.row , i));
    }
    console.log(tbl);
    gt.appendChild(tbl);
}

function addtr(row , trIndex){
    var tr = document.createElement("tr")
    for( let j = 0 ; j < row ; j ++){
        tr.appendChild(addtd(j , trIndex));
        tr.classList.add('tcol');   
        tr.id = 'tr' + trIndex;
    }
    return tr;
}

function addtd(tdIndex , trIndex) {
    var td = document.createElement('td');
    td.classList.add('circleStyle');   
    td.id ='tr' + trIndex + 'td' + tdIndex;
    return td;                                     
}

function create_arr(gameTbl) {
  gameTbl.gameArr = [];
  for (let x = 0; x < gameTbl.row; x++) {
    gameTbl.gameArr[x] = []; // set up inner array
    for (let y = 0; y < gameTbl.col; y++) {
      gameTbl.gameArr[x][y] = 0;    }
  }
  return gameTbl;
}

  function playing(gameTbl) {
    for (let i = 0; i < gameTbl.col; i++) {
      let elementMouseIsOver = document.querySelector("#tr" + i);
      elementMouseIsOver.addEventListener("click", function () { 
        el = elLocation(i, gameTbl.gameArr, gameTbl.row);
        painting(el,i,gameTbl);
      });
        elementMouseIsOver.addEventListener("mouseover", function () {
          el = elLocation(i, gameTbl.gameArr, gameTbl.row);
          color = setPlayersColor(gameTbl.activePlayer);
          MouseOverColorChanging(el, i, color, gameTbl.row, gameTbl.victory);
      });
      elementMouseIsOver.addEventListener("mouseout", function () {
          el = elLocation(i, gameTbl.gameArr, gameTbl.row);
          MouseOverColorChanging(el, i, "rgb(187, 187, 187)", gameTbl.row, gameTbl.victory);
      });
    }
  }

function elLocation(td, gameArr, row) { 
  for (let i = 0; i < row; i++){
      if (gameArr[i][td] == 0) {
      return i;
      }    
  }     
}

function nextPlayer(gameTbl) {
  if (gameTbl.victory == true) { 
     document.querySelector('.player-0-panel').classList.toggle('active');
     document.querySelector('.player-1-panel').classList.toggle('active');
     gameTbl.activePlayer = !gameTbl.activePlayer;
  }
}

function painting(td, tr,gameTbl){
  if (td < gameTbl.row && gameTbl.victory) {
    setColor(td, tr,gameTbl);
    checkWin(td, tr, gameTbl);
    nextPlayer(gameTbl);  
    endGame(gameTbl);
  }       
} 
function setColor(td, tr,gameTbl){
  color = setPlayersColor(gameTbl.activePlayer);
  document.getElementById("tr" + tr + "td" + td).style.background = color;
  gameTbl.gameArr[td][tr] = color; 
}

function setPlayersColor(activePlayer){
  if(activePlayer){
      return "blue" ; 
  } else {
      return "red";
  }
} 

function checkWin (td,tr,gameTbl){
  let Winner;
  let cell, winArr = [];
  gameTbl.cell = cell;
  gameTbl.winArr = winArr;
  gameTbl.tableColumnCnt = 0;
  if (gameTbl.activePlayer == true) {
    Winner = 1;
  } else {
    Winner = 0;
  }
  if ((td + 1) == gameTbl.row) {
    gameTbl.tableColumnCnt+=1;
    console.log(gameTbl.tableColumnCnt);
  }
  testingArr = [1, 1, -1, -1, -1, 1, 1, -1, 0, 1, 0, -1, 1, 0, -1, 0];
  for (let i = 0; i < 16; i+=4) {
    gameTbl.cell = 0
    gameTbl.winArr[gameTbl.cell] = [td, tr];
    gameTbl.cell++;
    check(gameTbl, td, tr, testingArr[i], testingArr[i + 1]);
    check(gameTbl, td, tr, testingArr[i + 2], testingArr[i + 3]);
    PrintWinner(winArr, Winner, gameTbl);
    winArr.length = 0;
  } 
}

function check(gameTbl, td, tr, testingArr1, testingArr2) {
  let cond;
  for (let i = 1; i <= (gameTbl.ptw + 1); i++) {
      if (testingArr1 == 1) {
          cond = (td + i) < gameTbl.row;
      } else if (testingArr1 == -1) {
          cond = (td - i) >= 0;
      } else {
          cond = true;
      }
      if (testingArr2 == 1) {
          cond2 = (tr + i) < gameTbl.col;
      } else if (testingArr2 == -1) {
        cond2 = (tr - i) >= 0;
      } else {
        cond2 = true;
      }
      if (cond && cond2) {
          if (gameTbl.gameArr[td + (i * testingArr1)][tr + (i * testingArr2)] == color) {
            gameTbl.winArr[gameTbl.cell] = [(td + (i * testingArr1)), (tr + (i * testingArr2))];
            gameTbl.cell++;
          } else break;
      }
  }
}


function PrintWinner(winArr, Winner ,gameTbl){
  if (winArr.length >= gameTbl.ptw) {
    gameTbl.victory = false;
      document.querySelector('#name-' + Winner).textContent = 'Winner!';
      for( var j = 0 ; j < winArr.length ; j++){
          document.getElementById("tr" + (winArr[j][1]) + "td" + (winArr[j][0])).style.borderColor = "white";  
      }
  }
  return gameTbl;     
}

function MouseOverColorChanging(tr, el, color, row,victory) {
  if(victory && tr < row) {
  document.getElementById("tr" + el + "td" + tr).style.background = color;
  }  
}

function endGame(gameTbl) {
  if (gameTbl.victory == false) {  // || equality(gameTbl.tableColumnCnt, gameTbl.col
    if(gameTbl.tableColumnCnt == gameTbl.col)  
    {
      document.querySelector('#name-0').textContent = 'equality';
      document.querySelector('#name-1').textContent = 'equality';
      document.querySelector('.player-0-panel').classList.add('active');
      document.querySelector('.player-1-panel').classList.add('active');
    }
    gameTbl.victory = false;
      return gameTbl;
  } else {
      gameTbl.victory = true;
      return gameTbl;   
  }  
}

