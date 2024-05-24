const userInputElem = document.getElementById("user-input");
const checkBtnElem  = document.getElementById("check-btn");
const clearBtnElem  = document.getElementById("clear-btn");
const resultsElem   = document.getElementById("results-div");

const PHONE_NUM_REGEX = /^1?[\s]*?(?:\([0-9]{3}\)|[0-9]{3})+[\-\.\s]?[0-9]{3}[\-\.\s]?[0-9]{4}$/gm;

const handleCheckClick = () => {
    const userInputValue = userInputElem.value;

    if (!userInputValue) {
        alert("Please provide a phone number");

        return;
    }

    const phoneNumMatches = userInputValue.match(PHONE_NUM_REGEX);

    if (phoneNumMatches) {
        resultsElem.innerHTML += `<p class="valid">Valid US number: ${userInputValue}</p>`;
    } else {
        resultsElem.innerHTML += `<p class="invalid">Invalid US number: ${userInputValue}</p>`;
    }
};
const handleClearClick = () => {
    resultsElem.innerHTML = "";
};

checkBtnElem.addEventListener("click", handleCheckClick);
clearBtnElem.addEventListener("click", handleClearClick);
userInputElem.addEventListener("keydown", e => e.key === "Enter" ? handleCheckClick() : null);