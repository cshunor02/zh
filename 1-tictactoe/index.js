const task1 = document.querySelector('#task1');
const task2 = document.querySelector('#task2');
const task3 = document.querySelector('#task3');
const task4 = document.querySelector('#task4');

const game = [
  "XXOO",
  "O OX",
  "OOO ",
];

function checkLength()
{
  let hossz = game[0].split('').length;
  let temp = 0;
    for(let i = 1; i < game.length; i++)
    {
      temp = game[i].split('').length;
      if (temp != hossz) 
      {
        task1.innerHTML = "false"; 
        break;
      } else {
        task1.innerHTML = "true";
      }
    }
}

function onlyXorO()
{
  let char_tomb = game[0].split('');
  let hossz = char_tomb.length;
  let db = 0;

  for (let i = 0; i < hossz; i++)
  {
    if (char_tomb[i] == 'X' || char_tomb[i] == 'O') db++;
  }

  db == hossz ? task2.innerHTML = "true" : task2.innerHTML = "false";
}

function countXO()
{
  let x_db = 0;
  let y_db = 0;

    for(let i = 0; i < game.length; i++)
    {
      temp = game[i].split('');
      for (let j = 0; j < temp.length; j++)
      {
        if (temp[j] == 'X') x_db++;
        if (temp[j] == 'O') y_db++;
      }
    }
  
  task3.innerHTML = 'X / O = ' + x_db + ' / ' + y_db;
}

function checkIfWon()
{
  let counttimes = 0;
  let whichone = 'Z';
  let found = false;
  for (let i = 0; i < game.length && !found; i++)
  {
    let temp = game[i].split('');
    for (let j = 0; j < temp.length && !found; j++)
    {
      if (counttimes == 0)
      {
        whichone = temp[j];
        counttimes++;
      } else if (whichone == temp[j])
      {
        counttimes++;
      } else {
        counttimes = 1;
        whichone = temp[j];
      }

      if (counttimes == 3)
      {
        task4.innerHTML = i+1;
        found = true;
        break;
      }
    }
  }
}

function init()
{
  //1. feladat
  checkLength();

  //2. feladat
  onlyXorO();

  //3. feladat
  countXO();

  //4. feladat
  checkIfWon();
}

window.onload = init;

