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

    let numbersBeforeDot = digitsBeforeDot(string);
    let numbersAfterDot = digitsAfterDot(string);

    if(numbersAfterDot > 0) return result.toFixed(13 - numbersBeforeDot).toString();
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
    if(input.innerHTML.length <= 1 || input.innerHTML === "DON'T DO THAT!"){
        input.innerHTML = "0";
        operation.innerHTML = "";
        inputState = 0;
        hasDot = false;
        method = "";  
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
});

plusButton.addEventListener("click", () => {
    if(input.innerHTML === "DON'T DO THAT!") input.innerHTML = "0";
    operation.innerHTML = input.innerHTML + " +";
    method = "addition";
    inputState = 0;
    hasDot = false;
})

minusButton.addEventListener("click", () => {
    if(input.innerHTML === "DON'T DO THAT!") input.innerHTML = "0";
    operation.innerHTML = input.innerHTML + " -";
    method = "substraction";
    inputState = 0;
    hasDot = false;
})

multButton.addEventListener("click", () => {
    if(input.innerHTML === "DON'T DO THAT!") input.innerHTML = "0";
    operation.innerHTML = input.innerHTML + " x";
    method = "multiplication";
    inputState = 0;
    hasDot = false;
})

powButton.addEventListener("click", () => {
    
    let maxAfterDot = 0;
    
    if(input.innerHTML !== "DON'T DO THAT!"){
        maxAfterDot = 2*digitsAfterDot(input.innerHTML);
        operation.innerHTML = input.innerHTML + " ^2 =";
        n = parseFloat(input.innerHTML);
        result = n*n;
        input.innerHTML = trim(result.toFixed(maxAfterDot).toString());
        method = "waiting";
        inputState = 0;
        hasDot = false;
    }
})

divButton.addEventListener("click", () => {
    if(input.innerHTML === "DON'T DO THAT!") input.innerHTML = "0";
    operation.innerHTML = input.innerHTML + " /";
    method = "division";
    inputState = 0;
    hasDot = false;
})



equalButton.addEventListener("click", () => {

    let maxAfterDot = 0;

    if(method === "addition"){
        let s1 = operation.innerHTML.slice(0,-2)
        let s2 = input.innerHTML;
        maxAfterDot = Math.max(digitsAfterDot(s1),digitsAfterDot(s2));
        let n1 = parseFloat(s1);
        let n2 = parseFloat(s2);
        let result = n1 + n2;
        operation.innerHTML =  operation.innerHTML + " " + input.innerHTML + " =";
        input.innerHTML = trim(result.toFixed(maxAfterDot).toString());
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
        let result = n1 - n2;
        operation.innerHTML =  operation.innerHTML + " " + input.innerHTML + " =";
        input.innerHTML = trim(result.toFixed(maxAfterDot).toString());
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
        let result = n1 * n2;
        operation.innerHTML =  operation.innerHTML + " " + input.innerHTML + " =";
        input.innerHTML = trim(result.toFixed(maxAfterDot).toString());
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
            let result = n1 / n2;
            operation.innerHTML =  operation.innerHTML + " " + input.innerHTML + " =";
            input.innerHTML = trim(handleStringSize(result));
            method = "waiting";
            inputState = 0;
            hasDot = false;
        }
        else{
            operation.innerHTML =  "";
            input.innerHTML = "DON'T DO THAT!";
            method = "waiting";
            inputState = 0;
            hasDot = false;
        } 
    }
})