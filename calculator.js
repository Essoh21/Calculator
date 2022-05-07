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
const back = document.querySelector('.back');


// usefull functions 

// addition
function add(FirstNumber, SecondNumber) {
    return FirstNumber + SecondNumber;
}
// substraction
function substract(FirstNumber, SecondNumber) {
    return FirstNumber - SecondNumber;
}
// multiplication
function multiply(firstNumber, SecondNumber) {
    return firstNumber * SecondNumber;
}
// division 
function divide(FirstNumber, SecondNumber) {
    return FirstNumber / SecondNumber;
}

// function operate thaat takes an operator and two numners
function operate(operator, FirstNumber, SecondNumber) {
    return operator(FirstNumber, SecondNumber);
}
// usefull variable
let firstNumber = undefined;
let secondNumber = undefined;
let functionsArray = [add, substract, multiply, divide];
let operatorsButtons = [plus, minus, multiplication, division];
//let beforOperator = true;
let valueDisplayed;
let operatorDisplayed;
let operatorf;

// functions that populate the display
//displayDigit()

//event listeners
let digits = [zero, one, two, three, four, five, six, seven, eight, nine];
for (let i = 0; i < 10; i += 1) {
    let element = digits[i];
    element.addEventListener('click', () => {
        if (valueDisplayed === 0 || valueDisplayed === undefined) {
            valueDisplayed = i;
        } else {
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

dot.addEventListener('click', () => {
    operatorDisplayed = '.';
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
        //    alert('before');
        return;
    } else {
        secondNumber = valueDisplayed;
        valueDisplayed = operate(operatorf, firstNumber, secondNumber);
        outputScreen.innerHTML = `${valueDisplayed}`;
        //   alert(`vd:${valueDisplayed} fn: ${firstNumber} sn: ${secondNumber}`)
        firstNumber = undefined;
        secondNumber = undefined;
        valueDisplayed = undefined;
        //   alert('=');
    }

});