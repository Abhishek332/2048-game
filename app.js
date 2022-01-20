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

  //for move left to right
  function moveLeftRight(val) {
    for (let i = 0; i < width * width; i++) {
      if (i % width == 0) {
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

        Buttons[i].innerHTML = newRow[0];
        Buttons[i + 1].innerHTML = newRow[1];
        Buttons[i + 2].innerHTML = newRow[2];
        Buttons[i + 3].innerHTML = newRow[3];
      }
    }
  }
  moveLeftRight("left");
});
