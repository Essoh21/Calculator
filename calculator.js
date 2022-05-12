const outputScreen = document.querySelector('.calculatorOutputScreen');
const clear = document.querySelector('.clear');
const multiplication = document.querySelector('.multiplication');
const division = document.querySelector('.division');
const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const equal = document.querySelector('.equal');
const dot = document.querySelector('.dot');
const zero = document.querySelector('.zero');
const one = document.querySelector('.one');
const two = document.querySelector('.two');
const three = document.querySelector('.three');
const four = document.querySelector('.four');
const five = document.querySelector('.five');
const six = document.querySelector('.six');
const seven = document.querySelector('.seven');
const eight = document.querySelector('.eight');
const nine = document.querySelector('.nine');
const plusOrMinus = document.querySelector('.plusOrMinus')
const bs = document.querySelector('.back');
const ans = document.querySelector('.answer');


// usefull functions 
// find integer part length including the dot
function findIntegerPartLength(number) {
    let numberLength = findNumberLength(number);
    return numberLength - findDecimalPartLength(number);
}
// round  a number on 14 elements( digits and dot)
function roundNumber(number) {
    let tenExponent = 14 - findIntegerPartLength(number);
    return Math.round(number * (10 ** tenExponent)) / (10 ** tenExponent);
}
// a function to find number of element (digits and dot ) used to write it 
function findNumberLength(number) {
    number = `${number}`;
    return number.length;
}
// a function to find the lenght of decimal part of a number
function findDecimalPartLength(number) {
    number = `${number}`;
    let numberDecimalPartLength = 0;
    let numberLength = number.length;
    if (number.indexOf('.') === -1) {
        numberDecimalPartLength = 0;
    } else {
        numberDecimalPartLength = numberLength - (number.indexOf('.') + 1);
    }

    return numberDecimalPartLength;
}
// a function to return the maximal decimal part length of two numbers
function findMaximalDecimalPartLength(fNumber, sNumber) {
    let maximalDecimalPartLength;
    let fNumberDecimalPartLength = 0;
    let sNumberDecimalPartLength = 0;

    fNumber = `${fNumber}`;
    sNumber = `${sNumber}`;
    let fNumberLength = fNumber.length;
    let sNumberLength = sNumber.length;

    if (fNumber.indexOf('.') === -1 && sNumber.indexOf('.') === -1) {
        maximalDecimalPartLength = 0;
    }
    if (!(sNumber.indexOf('.') === -1)) {
        sNumberDecimalPartLength = sNumberLength - (sNumber.indexOf('.') + 1);
    }
    if (!(fNumber.indexOf('.') === -1)) {
        fNumberDecimalPartLength = fNumberLength - (fNumber.indexOf('.') + 1);
    }
    if (fNumberDecimalPartLength > sNumberDecimalPartLength) {
        maximalDecimalPartLength = fNumberDecimalPartLength
    }
    if (fNumberDecimalPartLength < sNumberDecimalPartLength) {
        maximalDecimalPartLength = sNumberDecimalPartLength;
    }
    if (fNumberDecimalPartLength = sNumberDecimalPartLength) {
        maximalDecimalPartLength = sNumberDecimalPartLength;
    }

    return maximalDecimalPartLength;

}

// addition
function add(FirstNumber, SecondNumber) {
    let i = findMaximalDecimalPartLength(FirstNumber, SecondNumber);
    let powerOfTen = 10 ** i
    FirstNumber = FirstNumber * powerOfTen;
    SecondNumber = SecondNumber * powerOfTen;
    return (FirstNumber + SecondNumber) / powerOfTen;
}
// substraction
function substract(FirstNumber, SecondNumber) {
    let i = findMaximalDecimalPartLength(FirstNumber, SecondNumber);
    let powerOfTen = 10 ** i
    FirstNumber = FirstNumber * powerOfTen;
    SecondNumber = SecondNumber * powerOfTen;
    return (FirstNumber - SecondNumber) / powerOfTen;
}
// multiplication
function multiply(FirstNumber, SecondNumber) {
    let i = findMaximalDecimalPartLength(FirstNumber, SecondNumber);
    let powerOfTen = 10 ** i
    FirstNumber = FirstNumber * powerOfTen;
    SecondNumber = SecondNumber * powerOfTen;
    return (firstNumber * SecondNumber) / powerOfTen;
}
// division 
function divide(FirstNumber, SecondNumber) {
    return (FirstNumber * 1) / (SecondNumber * 1);
}

// function operate that takes an operator and two numners
function operate(operator, FirstNumber, SecondNumber) {
    return operator(FirstNumber, SecondNumber);
}
// usefull variable
let answer = 0;
let firstNumber = undefined;
let secondNumber = undefined;
let functionsArray = [add, substract, multiply, divide];
let operatorsButtons = [plus, minus, multiplication, division];
//let beforOperator = true;
let valueDisplayed;
let operatorDisplayed;
let operatorf;

// functions that populate the display

//event listeners
let digits = [zero, one, two, three, four, five, six, seven, eight, nine];
for (let i = 0; i < 10; i += 1) {
    let element = digits[i];
    element.addEventListener('click', () => {

        if (valueDisplayed === 0 || valueDisplayed === undefined) {
            valueDisplayed = `${i}`;
        } else {
            if (valueDisplayed.length > 13) { return };
            valueDisplayed = `${valueDisplayed}${i}`;

        }
        outputScreen.innerHTML = `${valueDisplayed}`;

    });
}

for (let i = 0; i < 4; i++) {
    operatorsButtons[i].addEventListener('click', () => {

        if (firstNumber === undefined && secondNumber === undefined && valueDisplayed === undefined) {
            //   alert('all undefined')
            return; // do nothing 
        } else if (firstNumber === undefined && secondNumber === undefined && !(valueDisplayed === undefined)) {
            operatorf = functionsArray[i]; // the operator is multiplication
            firstNumber = valueDisplayed * 1; // get the first number
            valueDisplayed = undefined; // set back value displayed to undefined
        } else if (!(firstNumber === undefined) && secondNumber === undefined && !(valueDisplayed === undefined)) {
            secondNumber = valueDisplayed * 1;
            //   alert(`fn: ${firstNumber}`)

            outputScreen.innerHTML = `${operate(operatorf, firstNumber, secondNumber)}`;

            firstNumber = operate(operatorf, firstNumber, secondNumber);
            operatorf = functionsArray[i];
            //  alert(`fn: ${firstNumber} sn: ${secondNumber} vd:  ${valueDisplayed}`)
            secondNumber = undefined;
            valueDisplayed = undefined;
        }


    })
}


plusOrMinus.addEventListener('click', () => {

    valueDisplayed = `${valueDisplayed * (-1)}`;
    outputScreen.innerHTML = valueDisplayed;
})
dot.addEventListener('click', () => {
    if (valueDisplayed.includes('.')) { return; }
    valueDisplayed += '.';
    outputScreen.innerHTML = `${valueDisplayed}`;

})
clear.addEventListener('click', () => {
    valueDisplayed = undefined;
    firstNumber = undefined;
    secondNumber = undefined;
    operatorf = undefined;
    outputScreen.innerHTML = `0`
});

equal.addEventListener('click', () => {
    if ((firstNumber === undefined)) {

        return;
    } else {
        secondNumber = valueDisplayed;
        let operationValue = operate(operatorf, firstNumber, secondNumber);
        if (!(findNumberLength(operationValue) > 14)) {
            valueDisplayed = operationValue;

        } else if (findDecimalPartLength(operationValue) === 0) {
            valueDisplayed = 'Big Integer';

        } else if (findIntegerPartLength(operationValue) >= 14) {
            valueDisplayed = 'Big Number';

        } else {
            valueDisplayed = roundNumber(operationValue);

        }

        answer = valueDisplayed;
        outputScreen.innerHTML = `${valueDisplayed}`;
        //   alert(`vd:${valueDisplayed} fn: ${firstNumber} sn: ${secondNumber}`)
        firstNumber = undefined;
        secondNumber = undefined;
        valueDisplayed = undefined;

    }

});
ans.addEventListener('click', () => {
    valueDisplayed = answer;
    outputScreen.innerHTML = valueDisplayed;
})
bs.addEventListener('click', () => {
    valueDisplayed = 0;
    outputScreen.innerHTML = valueDisplayed;
})