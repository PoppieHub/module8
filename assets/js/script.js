let minValue;
let maxValue;
let answerNumber;
let orderNumber;
let gameRun;

const orderNumberField = document.querySelector('#orderNumberField');
const answerField = document.querySelector('#answerField');
let alert = document.querySelector('#alert');

startGame();

function startGame(){
    gameRun = true;
    orderNumber = 1;

    document.addEventListener('DOMContentLoaded', function() {
        const modal = new bootstrap.Modal(document.querySelector('#modal'));
        modal.show();
        alert.innerText = `Задайте минимальные и максимальные границы значений`;
    });

    document.querySelector('#send').addEventListener('click', function () {
        let min = document.querySelector('#min');
        let max = document.querySelector('#max');
        minValue = parseInt(min.value);
        maxValue = parseInt(max.value);

        checkForNumber();
        innerOrderNumber();
        answerNumber  = returnAnswerNumber();
        returnMessageAnswerNumber();
    });
    checkForNumber();
}



function returnRandom(n){
    return Math.round( Math.random() * n);
}

function returnAnswerNumber(){
    return Math.floor((minValue + maxValue) / 2);
}

function returnAnswerAddOne(){
    return answerNumber + 1;
}

function returnMessageAnswerNumber(){
    return answerField.innerText = `Вы загадали число ${convertNumberInString(answerNumber)}?`;
}

function innerOrderNumber(){
    return orderNumberField.innerText = orderNumber;
}

function checkBorderValue(){

    if(minValue > maxValue){
        minValue = returnRandom(-999);
        maxValue = returnRandom(999);

        return alert.innerText = `Вы перепутали границы минимального и максимального значения. Я сгенерировал их сам. Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`;

    } else {

        (maxValue >= 1000 || maxValue <= -1000) ? maxValue = 999 : maxValue;
        (minValue <= -1000 || minValue >= 1000) ? minValue = -999 : minValue;

        return alert.innerText = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`;
    }
}

function checkForNumber(){
    if (isNaN(minValue) || isNaN(maxValue)){
        (isNaN(minValue))? minValue = returnRandom(-999) : minValue;
        (isNaN(maxValue))? maxValue = returnRandom(999) : maxValue;
    }
    checkBorderValue();
}

function convertNumberInString(number){
    const firstGroup = ['ноль', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять',
        'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать' ];
    const secondGroup = ['', 'десять', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
    const thirdGroup = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];
    const minus = 'минус';

    let stringNumber;
    getString();
    let length = stringNumber.length;
    let result = '';
    let value = [];
    let firstNumber = number;

    function getString(){
        stringNumber  =  number.toString();
        return stringNumber;
    }

    if (stringNumber[0] === '-'){
        stringNumber = stringNumber.replace(stringNumber[0], '');
        number = parseInt(stringNumber);
        length--;

        value.push('минус ');
    }

    while (length !== 0){
        if (length === 1 || (length === 2 && stringNumber[0] === '1')){
            value.push(firstGroup[number] + ' ');
            length = 0;
        }
        else if (length === 2 && stringNumber[0] !== '1'){
            let keySecondGroup = parseInt(stringNumber[0]);
            value.push(secondGroup[keySecondGroup] + ' ');
            number = parseInt(stringNumber[1]);
            stringNumber = getString();
            (stringNumber[0] === '0')? length = 0: length--;
        }
        else if (length === 3){
            let keyThirdGroup = parseInt(stringNumber[0]);
            value.push(thirdGroup[keyThirdGroup] + ' ');
            number = parseInt( stringNumber[1] + stringNumber[2]);
            if (stringNumber[1] === '0' && stringNumber[2] === '0'){
                length = 0;
                break;
            }
            (stringNumber[1] === '0')? length -= 2: length--;
            stringNumber = getString();
        }
    }

    value.forEach((element) => {
        result += element;
    });

    return checkPermissibleLength(result, 20, firstNumber);
}

function checkPermissibleLength(result, n, number){
    let valueLength = result.length;

    if (valueLength < n){
        return result;
    } else
        return number;
}


function OverOrLess(border){
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = returnRandom(3);
            let answerPhrase = '';

            switch (phraseRandom){
                case 0:
                    answerPhrase = `Вы загадали неправильное число!\n\u{1F914}`;
                    break;
                case 1:
                     answerPhrase = `Я сдаюсь..\n\u{1F92F}`;
                    break;
                case 2:
                    answerPhrase = `Кажется меня пытаются обмануть..\n\u{1F613}`;
                    break;
                case 3:
                    answerPhrase = `Вот так вот и живем\n\u{1F616}`;
                    break;
            }

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            if (maxValue === border){
                maxValue = returnAnswerAddOne();
                answerNumber = returnAnswerNumber();
            } else if (minValue === border){
                minValue = returnAnswerAddOne();
                answerNumber = returnAnswerNumber();
            }
            orderNumber++;
            innerOrderNumber();
            returnMessageAnswerNumber();
        }
    }
}

document.querySelector('#btnRetry').addEventListener('click', function () {
    const modal = new bootstrap.Modal(document.querySelector('#modal'));
    modal.show();
    startGame();
})

document.querySelector('#btnOver').addEventListener('click', function () {
    OverOrLess(minValue);
})

document.querySelector('#btnLess').addEventListener('click', function () {
    OverOrLess(maxValue);
})

document.querySelector('#btnEqual').addEventListener('click', function () {
    if (gameRun){
        const equalRandom = returnRandom(3);
        let equalPhrase = '';

        switch (equalRandom){
            case 0:
                equalPhrase = `Я всегда одгадываю!\n\u{263B}`;
                break;
            case 1:
                equalPhrase = `Хех-изи!\n\u{1F617}`;
                break;
            case 2:
                equalPhrase = `Да-да, порвал\n\u{1F61D}`;
                break;
            case 3:
                equalPhrase = `Предсказатель или все-таки алгоритм?\n\u{1F632}`;
                break;
        }
        answerField.innerText = equalPhrase;
        gameRun = false;
    }
})
