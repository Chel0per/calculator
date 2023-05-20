let plusButton = document.querySelector(".plus");
let minusButton = document.querySelector(".minus");
let divButton = document.querySelector(".division");
let multButton = document.querySelector(".mult");
let equalButton = document.querySelector(".equal");
let powButton = document.querySelector(".pow");
let sqrButton = document.querySelector(".root");
let clearButton = document.querySelector(".clear");
let deleteButton = document.querySelector(".delete");
let dotButton = document.querySelector(".dot");
let numbers = document.querySelectorAll(".number");
let input = document.querySelector(".input");
let operation = document.querySelector(".operation");

let inputState = 0;
let hasDot = false;
let method = "";
let previousValue = 0;
let usePreviousValue = false;

function digitsAfterDot (string) {

    for(let i = 0; i < string.length; i++){
        if(string[i] === "."){
            let substring = string.slice(i + 1);
            return substring.length
        } 
    }
    return 0;

};

function digitsBeforeDot (string) {

    for(let i = 0; i < string.length; i++){
        if(string[i] === "."){
            let substring = string.slice(0,i);
            return substring.length
        } 
    }
    return string.length;

};

function trim (string) {

    let dotString = "";
    let startString = string;
    let counter = 0;

    for(let i = 0; i < string.length; i++){
        if(string[i] === "."){
            dotString = string.slice(i,string.length);
            startString = string.slice(0,i);
            break;
        }
    }

    if(startString === string) return string;

    for(let j = dotString.length - 1; j >= 0 ; j--){
        if(dotString[j] === "0" || dotString[j] === "."){
            counter++;  
        }
        else{
            break;
        }
    }

    return startString + dotString.slice(0,dotString.length-counter);
}

function handleStringSize (result){

    let string = result.toString();

    if (string.length > 14){
        previousValue = result;
        usePreviousValue = true;
    }
    else {
        previousValue = 0;
        usePreviousValue = false;
    }

    let numbersBeforeDot = digitsBeforeDot(string);
    let numbersAfterDot = digitsAfterDot(string);

    if(numbersAfterDot > 0){
        return result.toFixed(13 - numbersBeforeDot);  
    } 
    else return result.toString();

}

numbers.forEach((number) => {
    number.addEventListener("click", (e) => {
        let clickedNumber = e.target.innerHTML;
        
        if(inputState === 0 && clickedNumber !== "0"){
            input.innerHTML = clickedNumber;
            inputState = 1;
        }
        else if(inputState === 0 && clickedNumber === "0"){
            input.innerHTML = clickedNumber;
        }
        else{
            if (input.innerHTML.length < 14) input.innerHTML += clickedNumber;
        }
            
    });
});

dotButton.addEventListener("click", () => {
    let dot = ".";
    if(method !== "" && inputState === 0){
        input.innerHTML = 0; 
    }
    if(input.innerHTML.length < 14){
        if(hasDot === false){
            input.innerHTML += dot;
            hasDot = true;
            inputState = 1;   
        }
    }
})

deleteButton.addEventListener("click", () => {
    if(input.innerHTML.length <= 1 || input.innerHTML === "DON'T DO THIS!"){
        input.innerHTML = "0";
        operation.innerHTML = "";
        inputState = 0;
        hasDot = false;
        method = "";
        previousValue = 0;
        usePreviousValue = false;  
    }
    else{
        if(input.innerHTML[input.innerHTML.length - 1] === "."){
            input.innerHTML = input.innerHTML.slice(0,-1);
            hasDot = false;
        }
        else input.innerHTML = input.innerHTML.slice(0,-1);
    }
})

clearButton.addEventListener("click", () => {
    input.innerHTML = "0";
    operation.innerHTML = "";
    inputState = 0;
    hasDot = false;
    method = "";
    previousValue = 0;
    usePreviousValue = false;  
});

plusButton.addEventListener("click", () => {
    if(input.innerHTML === "DON'T DO THIS!") input.innerHTML = "0";
    operation.innerHTML = input.innerHTML + " +";
    method = "addition";
    inputState = 0;
    hasDot = false;
})

minusButton.addEventListener("click", () => {
    if(input.innerHTML === "DON'T DO THIS!") input.innerHTML = "0";
    operation.innerHTML = input.innerHTML + " -";
    method = "substraction";
    inputState = 0;
    hasDot = false;
})

multButton.addEventListener("click", () => {
    if(input.innerHTML === "DON'T DO THIS!") input.innerHTML = "0";
    operation.innerHTML = input.innerHTML + " x";
    method = "multiplication";
    inputState = 0;
    hasDot = false;
})

divButton.addEventListener("click", () => {
    if(input.innerHTML === "DON'T DO THIS!") input.innerHTML = "0";
    operation.innerHTML = input.innerHTML + " /";
    method = "division";
    inputState = 0;
    hasDot = false;
})

powButton.addEventListener("click", () => {
    
    let maxAfterDot = 0;
    
    if(input.innerHTML !== "DON'T DO THIS!"){
        maxAfterDot = 2*digitsAfterDot(input.innerHTML);
        operation.innerHTML = input.innerHTML + " ^2 =";
        let n = parseFloat(input.innerHTML);
        let result;
        if (usePreviousValue) result = previousValue*previousValue;
        else result = n*n;
        input.innerHTML = trim(handleStringSize(parseFloat(result.toFixed(maxAfterDot))));
        method = "waiting";
        inputState = 0;
        hasDot = false;
    }
})

sqrButton.addEventListener("click", () => {
    
    if(input.innerHTML !== "DON'T DO THIS!"){
        operation.innerHTML = input.innerHTML + " ^(1/2) =";
        let n = parseFloat(input.innerHTML);
        if (n >= 0){
            let result;
            if (usePreviousValue) result = Math.sqrt(previousValue);
            else result = Math.sqrt(n);
            input.innerHTML = trim(handleStringSize(result));
            method = "waiting";
            inputState = 0;
            hasDot = false;
        }
        else {
            operation.innerHTML =  "";
            input.innerHTML = "DON'T DO THIS!";
            method = "waiting";
            inputState = 0;
            hasDot = false;
        }  
    }
})

equalButton.addEventListener("click", () => {

    let maxAfterDot = 0;

    if(method === "addition"){
        let s1 = operation.innerHTML.slice(0,-2)
        let s2 = input.innerHTML;
        maxAfterDot = Math.max(digitsAfterDot(s1),digitsAfterDot(s2));
        let n1 = parseFloat(s1);
        let n2 = parseFloat(s2);
        let result;
        if (usePreviousValue) result = previousValue + n2;
        else result = n1 + n2;
        operation.innerHTML =  operation.innerHTML + " " + input.innerHTML + " =";
        input.innerHTML = trim(handleStringSize(parseFloat(result.toFixed(maxAfterDot))));
        method = "waiting";
        inputState = 0;
        hasDot = false;
    }
    else if(method === "substraction"){
        let s1 = operation.innerHTML.slice(0,-2);
        let s2 = input.innerHTML;
        maxAfterDot = Math.max(digitsAfterDot(s1),digitsAfterDot(s2));
        let n1 = parseFloat(s1);
        let n2 = parseFloat(s2);
        let result;
        if (usePreviousValue) result = previousValue - n2;
        else result = n1 - n2;
        operation.innerHTML =  operation.innerHTML + " " + input.innerHTML + " =";
        input.innerHTML = trim(handleStringSize(parseFloat(result.toFixed(maxAfterDot))));
        method = "waiting";
        inputState = 0;
        hasDot = false;
    }
    else if(method === "multiplication"){
        let s1 = operation.innerHTML.slice(0,-2);
        let s2 = input.innerHTML;
        maxAfterDot = digitsAfterDot(s1) + digitsAfterDot(s2);
        let n1 = parseFloat(s1);
        let n2 = parseFloat(s2);
        let result;
        if (usePreviousValue) result = previousValue*n2;
        else result = n1*n2;
        operation.innerHTML =  operation.innerHTML + " " + input.innerHTML + " =";
        input.innerHTML = trim(handleStringSize(parseFloat(result.toFixed(maxAfterDot))));
        method = "waiting";
        inputState = 0;
        hasDot = false;
    }
    else if(method === "division"){
        let s1 = operation.innerHTML.slice(0,-2);
        let s2 = input.innerHTML;
        let n1 = parseFloat(s1);
        let n2 = parseFloat(s2);
        if(n2 !== 0){
            let result;
            if (usePreviousValue) result = previousValue/n2;
            else result = result = n1/n2;
            operation.innerHTML =  operation.innerHTML + " " + input.innerHTML + " =";
            input.innerHTML = trim(handleStringSize(result));
            method = "waiting";
            inputState = 0;
            hasDot = false;
        }
        else{
            operation.innerHTML =  "";
            input.innerHTML = "DON'T DO THIS!";
            method = "waiting";
            inputState = 0;
            hasDot = false;
        }
    }
})