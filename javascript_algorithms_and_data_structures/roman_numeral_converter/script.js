const numberInputElem = document.getElementById("number");
const convertBtnElem  = document.getElementById("convert-btn");
const outputElem      = document.getElementById("output");

const ROMAN_KEY = [
    ['M',  1000],
    ['CM', 900],
    ['D',  500],
    ['CD', 400],
    ['C',  100],
    ['XC', 90],
    ['L',  50],
    ['XL', 40],
    ['X',  10],
    ['IX', 9],
    ['V',  5],
    ['IV', 4],
    ['I',  1]
];

const decimalToRoman = (decimal) => {
    const romanNumerals = [];

    for (let i = 0; i < ROMAN_KEY.length; i++) {
        const roman = ROMAN_KEY[i];

        const romanNumeral = ROMAN_KEY[i][0];
        const decimalValue = ROMAN_KEY[i][1];

        while (decimal >= roman[1]) {
            romanNumerals.push(romanNumeral);
            decimal -= decimalValue;
        }
    }

    return romanNumerals.join("");
};

const outputError = (msg) => {
    outputElem.classList.add("error");
    outputElem.classList.remove("hidden");
    outputElem.innerText = msg;
};

const handleConversion = () => {
    const numberStr = numberInputElem.value;
    const numberInt = parseInt(numberStr);

    outputElem.classList.add("hidden");
    outputElem.classList.remove("error");

    if (isNaN(numberInt)) {
        outputError("Please enter a valid number");

        return;
    } else if (numberInt < 0) {
        outputError("Please enter a number greater than or equal to 1");

        return;
    } else if (numberInt >= 4000) {
        outputError("Please enter a number less than or equal to 3999");

        return;
    }

    outputElem.innerText = decimalToRoman(numberInt);
    outputElem.classList.remove("hidden");
};

convertBtnElem.addEventListener("click", handleConversion);
numberInputElem.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleConversion();
});