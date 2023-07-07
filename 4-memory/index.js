const inputCircleNumber = document.querySelector("#circle-number");
const buttonStart = document.querySelector("#start");
const divContainer = document.querySelector("#container");
const divOutput = document.querySelector("#output");

// Application state

let canGuess = false;
let solution = [];
let series = [];

function drawCircles()
{
  let db = inputCircleNumber.value;
  divContainer.innerHTML = "";

  for (let i = 0; i < db; i++)
  {
    divContainer.innerHTML += '<a class="circle"></a>';
  }
}

function randomNumbers()
{
  for (let i = 0; i < 7; i++)
  {
    series.push(random(1, inputCircleNumber.value));
  }
  console.log(series);

  orderOfAppearance(0);
}

function orderOfAppearance(j)
{
  if (j < 7)
  {
    const nthelem = document.querySelector('#container :nth-child(' + series[j] + ')');
    toggleHighlight(nthelem);
    divOutput.innerHTML = "Flashing circles...";
    setTimeout(() => orderOfAppearance(j + 1), 1000);
  } else {
    divOutput.innerHTML = "Now, your turn...";
    canGuess = true;
  }
}

function buttonsClick(e)
{
  if (canGuess == false) return;
  const handlerElement = this;
  const sourceElement = e.target;
  const selector = 'a';

  const closestElement = sourceElement.closest(selector);

  if (handlerElement.contains(closestElement)) 
  {
    const targetElement = closestElement;
  
    const allButton = document.querySelectorAll('#container a');

    for (let j = 0; j < allButton.length; j++)
    {
      if (targetElement === allButton[j])
      {
        solution.push(j+1);
      }
    }
    if (solution.length == series.length)
    {
      let dbb = 0;
      for (let k = 0; k < solution.length; k++)
      {
        if (solution[k] === series[k]) dbb++;
      }
      if (dbb == 7)
      {
        divOutput.innerHTML = "Nice job!";
      } else {
        divOutput.innerHTML = "Failed!";
      }
      console.log(dbb == 7);
    }

  }
}

// ========= Utility functions =========

function random(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

function toggleHighlight(node) {
  node.classList.toggle("highlight")
  node.addEventListener("animationend", function (e) {
    node.classList.remove("highlight");
  }, {once: true});
}

// =====================================

function init()
{
 inputCircleNumber.addEventListener('input', drawCircles, false);
 buttonStart.addEventListener('click', randomNumbers, false);
 divContainer.addEventListener('click', buttonsClick, false);
}

window.onload = init;