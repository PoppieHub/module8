let minValue = parseInt(prompt('Минимальное значение числа для игры','0'));
let maxValue = parseInt(prompt('Максимальное значение числа для игры','100'));
alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
let answerNumber  = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.querySelector('#orderNumberField');
const answerField = document.querySelector('#answerField');

orderNumberField.innerText = orderNumber;
answerField.innerText = `Вы загадали число ${answerNumber }?`;

document.querySelector('#btnRetry').addEventListener('click', function () {
    gameRun = true;
    //minValue = parseInt(prompt('Минимальное значение числа для игры','0'));
    //maxValue = parseInt(prompt('Максимальное значение числа для игры','100'));
    orderNumber = 1;
    orderNumberField.innerText = orderNumber;
    answerNumber  = Math.floor((minValue + maxValue) / 2);
    answerField.innerText = `Вы загадали число ${answerNumber }?`;
})

function returnRandom(n){
    return Math.round( Math.random() * n);
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
                maxValue = answerNumber  + 1;
                answerNumber = Math.floor((minValue + maxValue) / 2);
            } else if (minValue === border){
                minValue = answerNumber  + 1;
                answerNumber = Math.floor((minValue + maxValue) / 2);
            }
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = `Вы загадали число ${answerNumber }?`;
        }
    }
}

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

