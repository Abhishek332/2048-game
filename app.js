document.addEventListener("DOMContentLoaded", () => {
  const outer = document.getElementById("outer-box");
  const scoreDisplay = document.getElementById("score");
  const width = 4;
  const target = 2048;
  const Buttons = [];
  outer.style.height = 100 * width + "px";
  outer.style.width = 100 * width + "px";

  //dynamically buttons display
  function ButtonMaker() {
    for (let i = 0; i < width * width; i++) {
      const Btn = document.createElement("div");
      Btn.innerHTML = 0;
      outer.appendChild(Btn);
      Buttons.push(Btn);
    }
    let occuranceOfTwo = width / 2;
    for (let i = 0; i < occuranceOfTwo; i++) {
      randomNumberGenerator();
    }
  }
  ButtonMaker();

  // hide Zeros
  function HideZeros() {
    for (let i = 0; i < Buttons.length; i++) {
      if (Buttons[i].innerHTML == 0)
        Buttons[i].style.color = "rgba(0, 255, 255, 0.904)";
      else Buttons[i].style.color = "white";
    }
  }
  HideZeros();

  // random no. generate
  function randomNumberGenerator() {
    let randomNumber = Math.floor(Math.random() * Buttons.length);
    if (Buttons[randomNumber].innerHTML == 0) {
      Buttons[randomNumber].innerHTML = 2;
      loseCheck();
    } else randomNumberGenerator();
  }

  //for Left - Right move
  function moveLeftRight(val) {
    for (let i = 0; i < width * width; i = i + width) {
      let row = [];
      for (let k = 0; k < width; k++) {
        row.push(parseInt(Buttons[k + i].innerHTML));
      }
      console.log("Row", row);

      let filteredRow = row.filter((num) => num);
      console.log("Filtered Row", filteredRow);

      let Number_Of_Blank_Boxes = width - filteredRow.length;
      let fillZero = Array(Number_Of_Blank_Boxes).fill(0);
      console.log("Blank Row", fillZero);

      let newRow =
        val == "left"
          ? filteredRow.concat(fillZero)
          : fillZero.concat(filteredRow);
      console.log("New Row", newRow);

      for (let j = 0; j < width; j++) {
        Buttons[i + j].innerHTML = newRow[j];
      }
    }
  }

  //combine Row
  function combineRow() {
    for (let i = 0; i < Buttons.length - 1; i++) {
      if (Buttons[i].innerHTML == Buttons[i + 1].innerHTML) {
        Buttons[i + 1].innerHTML =
          parseInt(Buttons[i].innerHTML) + parseInt(Buttons[i + 1].innerHTML);
        Buttons[i].innerHTML = 0;
      }
    }
    winCheck();
  }

  //combine Column
  function combineCol() {
    for (let i = 0; i < Buttons.length - width; i++) {
      if (Buttons[i].innerHTML == Buttons[i + width].innerHTML) {
        Buttons[i + width].innerHTML =
          parseInt(Buttons[i].innerHTML) +
          parseInt(Buttons[i + width].innerHTML);
        Buttons[i].innerHTML = 0;
      }
    }
    winCheck();
  }

  //Button Click Call
  function InputControl(e) {
    if (e.keyCode === 37) {
      keyLeftRightUpDown("left");
      HideZeros();
    } else if (e.keyCode === 38) {
      keyLeftRightUpDown("up");
      HideZeros();
    } else if (e.keyCode === 39) {
      keyLeftRightUpDown("right");
      HideZeros();
    } else if (e.keyCode === 40) {
      keyLeftRightUpDown("down");
      HideZeros();
    }
  }
  document.addEventListener("keyup", InputControl);

  //Left - Right, Up - Down Button Control
  function keyLeftRightUpDown(val) {
    val === "left" || val === "right" ? moveLeftRight(val) : moveUpDown(val);
    val === "left" || val === "right" ? combineRow() : combineCol();
    val === "left" || val === "right" ? moveLeftRight(val) : moveUpDown(val);
    randomNumberGenerator();
  }

  //for Up - Down Move
  function moveUpDown(val) {
    for (let i = 0; i < width; i++) {
      let column = [];
      for (let j = i; j < Buttons.length; j = j + width) {
        column.push(parseInt(Buttons[j].innerHTML));
      }
      console.log("Column", column);

      let filteredColumn = column.filter((num) => num);
      console.log("Filtered Column", filteredColumn);

      let Number_Of_Blank_Boxes = width - filteredColumn.length;
      let fillZero = Array(Number_Of_Blank_Boxes).fill(0);
      console.log("Blank Row", fillZero);

      let newColumn =
        val == "up"
          ? filteredColumn.concat(fillZero)
          : fillZero.concat(filteredColumn);
      console.log("New Column", newColumn);

      for (let j = i; j < Buttons.length; j = j + width) {
        Buttons[j].innerHTML = newColumn[Math.floor(j / width)];
      }
    }
  }

  //check for win
  function winCheck() {
    let flag = false;
    for (let i = 0; i < Buttons.length; i++) {
      if (parseInt(Buttons[i].innerHTML) == target) flag = true;
    }
    if (flag) {
      alert("You Win the Game");
      document.removeEventListener("keyup", InputControl);
    }
  }

  //check for lose
  function loseCheck() {
    let flag = false;
    for (let i = 0; i < Buttons.length; i++) {
      if (parseInt(Buttons[i].innerHTML) == 0) flag = true;
    }
    if (!flag) {
      alert("You Lose the Game");
      document.removeEventListener("keyup", InputControl);
    }
  }
});
