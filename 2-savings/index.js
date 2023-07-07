const form = document.querySelector("form");
const divContainer = document.querySelector(".container");

function allinput()
{
    let inputok = document.querySelectorAll('form fieldset div input');
    let M = 0;
    for (let i = 0; i < inputok.length; i++)
    {
        let temp = parseInt(inputok[i].dataset.consumption);
        M += temp;
    }
    return M;
}

function upToDateData()
{
    let inputok = document.querySelectorAll('form fieldset div input');
    let ci = 0;
    let tomb = [];

    for (let i = 0; i < inputok.length; i++)
    {
        let temp1 = parseInt(inputok[i].value);
        let maximum = parseInt(inputok[i].max);
        let temp = parseInt(inputok[i].dataset.consumption);
        ci = (temp1/maximum)*temp;
        tomb.push(ci);
    }

    console.log(tomb);
}

function setStyle()
{
    let nagym = allinput();

    let inputok = document.querySelectorAll('form fieldset div input');
    let ci = 0;

    let labelek = document.querySelectorAll('.container label');

    for (let i = 0; i < inputok.length; i++)
    {
        let temp1 = parseInt(inputok[i].value);
        let maximum = parseInt(inputok[i].max);
        let temp = parseInt(inputok[i].dataset.consumption);
        ci = (temp1/maximum)*temp;

        
        for (let j = 0; j < labelek.length; j++)
        {
            if (labelek[j].htmlFor == inputok[i].id)
            {
                labelek[j].style.width = (ci / nagym * 100) + "%";
                break;
            }
        }
    }
}

function refreshDiagram()
{
    upToDateData();
    setStyle();
}

function init()
{
    //1. feladat
    console.log("M: " + allinput());

    //2. feladat
    upToDateData();

    //3. feladat
    setStyle();

    //4. feladat
    form.addEventListener('input', refreshDiagram, false);
}

window.onload = init;