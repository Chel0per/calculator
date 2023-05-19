let plusButton = document.querySelector(".plus");
let minusButton = document.querySelector(".minus");
let divButton = document.querySelector(".division");
let multButton = document.querySelector(".mult");
let equalButton = document.querySelector(".equal");
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

clearButton.addEventListener("click", () => {
    input.innerHTML = "0";
    operation.innerHTML = "";
    inputState = 0;
    hasDot = false;
    method = "";  
});

plusButton.addEventListener("click", () => {
    operation.innerHTML = input.innerHTML + " +";
    method = "addition";
    inputState = 0;
    hasDot = false;
})

minusButton.addEventListener("click", () => {
    operation.innerHTML = input.innerHTML + " -";
    method = "substraction";
    inputState = 0;
    hasDot = false;
})

equalButton.addEventListener("click", () => {

    let maxAfterDot = 0;

    if(method === "addition"){
        let s1 = operation.innerHTML.slice(0,-2);
        if (digitsAfterDot(s1) > maxAfterDot) maxAfterDot = digitsAfterDot(s1);
        let s2 = input.innerHTML;
        if (digitsAfterDot(s2) > maxAfterDot) maxAfterDot = digitsAfterDot(s2);
        let n1 = parseFloat(s1);
        let n2 = parseFloat(s2);
        let result = n1 + n2;
        operation.innerHTML =  operation.innerHTML + " " + input.innerHTML + " =";
        input.innerHTML = result.toFixed(maxAfterDot).toString();
        method = "waiting";
        inputState = 0;
        hasDot = false;
    }
    else if(method === "substraction"){
        let s1 = operation.innerHTML.slice(0,-2);
        if (digitsAfterDot(s1) > maxAfterDot) maxAfterDot = digitsAfterDot(s1);
        let s2 = input.innerHTML;
        if (digitsAfterDot(s2) > maxAfterDot) maxAfterDot = digitsAfterDot(s2);
        let n1 = parseFloat(s1);
        let n2 = parseFloat(s2);
        let result = n1 - n2;
        operation.innerHTML =  operation.innerHTML + " " + input.innerHTML + " =";
        input.innerHTML = result.toFixed(maxAfterDot).toString();
        method = "waiting";
        inputState = 0;
        hasDot = false;
    }
    else if(method === "multiply"){
        
    }
})