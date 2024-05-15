const userInput = document.getElementById("text-input");
const checkBtn  = document.getElementById("check-btn");
const resultDiv = document.getElementById("result");

const checkPalindrome = (str) => {
    // Regex pattern that will match all alphanumeric characters.
    const washPattern = /[a-zA-Z0-9]/gm;

    // originalWash: The original input string, washed to remove disallowed
    //  characters. Once "washed", array is combined into a string and converted
    //  to lowercase.
    //
    // reversedWash: The original input string, washed to remove disallowed
    //  characters. Once "washed", array is reversed, and combined into a string
    //  and converted to lowercase.
    const originalWash = (str.match(washPattern) || [""]).join("").toLowerCase();
    const reversedWash = (str.match(washPattern) || [""]).reverse().join("").toLowerCase();

    return originalWash === reversedWash;
};

const checkUserInput = () => {
    let inputStr = userInput.value;
    let isPalindrome = false;

    resultDiv.classList.remove("good");
    resultDiv.classList.remove("bad");

    if (inputStr == "") {
        alert("Please input a value!");

        return;
    }

    isPalindrome = checkPalindrome(inputStr);

    resultDiv.innerText = `${inputStr} ` + (isPalindrome ? "is" : "is not") + " a palindrome";
    resultDiv.classList.add(isPalindrome ? "good" : "bad");
};

checkBtn.addEventListener("click", checkUserInput);