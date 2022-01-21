document.addEventListener("DOMContentLoaded", () => {
  const outer = document.getElementById("outer-box");
  const scoreDisplay = document.getElementById("score");
  const width = 4;
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

  // random no. generate
  function randomNumberGenerator() {
    let randomNumber = Math.floor(Math.random() * Buttons.length);
    if (Buttons[randomNumber].innerHTML == 0) {
      Buttons[randomNumber].innerHTML = 2;
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

      for (let k = 0; k < width; k++) {
        Buttons[i + k].innerHTML = newRow[k];
      }
    }
  }

  //combine Row
  function combineRow() {
    for (let i = 0; i < Buttons.length - 1; i++) {
      if (
        parseInt(Buttons[i].innerHTML) == parseInt(Buttons[i + 1].innerHTML)
      ) {
        Buttons[i + 1].innerHTML =
          parseInt(Buttons[i].innerHTML) + parseInt(Buttons[i + 1].innerHTML);
        Buttons[i].innerHTML = 0;
      }
    }
  }

  //combine Column
  function combineCol() {}

  //Button Click Call
  function InputControl(e) {
    if (e.keyCode === 37) {
      keyLeftRightUpDown("left");
    } else if (e.keyCode === 38) {
      keyLeftRightUpDown("up");
    } else if (e.keyCode === 39) {
      keyLeftRightUpDown("right");
    } else if (e.keyCode === 40) {
      keyLeftRightUpDown("down");
    }
  }
  document.addEventListener("keyup", InputControl);

  //Left - Right, Up - Down Button Control
  function keyLeftRightUpDown(val) {
    val == "left" || val === "right" ? moveLeftRight(val) : moveUpDown(val);
    val == "left" || val === "right" ? combineRow() : combineCol();
    val == "left" || val === "right" ? moveLeftRight(val) : moveUpDown(val);
    randomNumberGenerator();
  }

  //for Up - Down Move
  function moveUpDown(val) {
    for (let i = 0; i < width; i = i++) {
      let column = [];
      for (let k = i; k < Buttons.length; k = k + width) {
        column.push(parseInt(Buttons[k].innerHTML));
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

      for (let k = 0; k < width; k++, j = j + width) {
        Buttons[i + k * width].innerHTML = newColumn[k];
      }
    }
  }
});
