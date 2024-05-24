// BEGIN VARIABLES REQUIRED FOR FREECODECAMP TESTS
let price = 3.26;
let cid   = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
];
// END VARIABLES REQUIRED FOR FREECODECAMP TESTS

const CHANGE_VALUES = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.10],
    ["QUARTER", 0.25],
    ["ONE", 1.00],
    ["FIVE", 5.00],
    ["TEN", 10.00],
    ["TWENTY", 20.00],
    ["ONE HUNDRED", 100.00]
].reverse();

const cashInputElem  = document.getElementById("cash");
const buttonElems    = document.querySelectorAll(".btn");
const changeListElem = document.getElementById("change-items");
const priceElem      = document.getElementById("item-price");
const changeElem     = document.getElementById("total-change");
const changeDueElem  = document.getElementById("change-due");

const getTotalChangeAmount = () => {
    let total = 0.00;

    cid.forEach(c => total += c[1]);

    return Number(total).toFixed(2);
};

const giveChange = (changeToGive) => {
    const availableChange = cid.reverse();
    const givenChange = [];

    const originalToGive =  parseFloat(changeToGive).toFixed(2);
    let totalGivenChange = 0;

    changeToGive = parseFloat(changeToGive).toFixed(2);

    if (changeToGive <= 0) return;

    for (let i = 0; i < CHANGE_VALUES.length; i++) {
        let cv = CHANGE_VALUES[i];
        let c = cv[0];
        let v = cv[1];

        if (changeToGive > 0 && changeToGive >= v) {
            let numberGiven = 0;
            let amountAvail = availableChange[i][1];

            while (amountAvail > 0 && changeToGive >= v) {
                amountAvail -= v;
                changeToGive = parseFloat((changeToGive - v)).toFixed(2);
                numberGiven++;
            }

            if (numberGiven > 0) {
                givenChange.push([
                    c, numberGiven * v
                ]);
            }

            totalGivenChange += numberGiven * v;
        }
    }

    totalGivenChange = parseFloat(totalGivenChange).toFixed(2);
    return (totalGivenChange === originalToGive ? givenChange : []);
};

const handleCompute = () => {
    let customerCash = Number(cashInputElem.value).toFixed(2);
    let changeOwed = Number(customerCash) - price;
    let availableChange = getTotalChangeAmount();

    changeDueElem.innerHTML = "";

    if (changeOwed < 0) {
        alert("Customer does not have enough money to purchase the item");

        return;
    } else if (changeOwed == 0) {
        changeDueElem.textContent = "No change due - customer paid with exact cash";

        return;
    } else if (changeOwed > availableChange) {
        changeDueElem.textContent = "Status: INSUFFICIENT_FUNDS";

        return;
    }

    let givenChange = giveChange(changeOwed);

    if (!givenChange.length) {
        changeDueElem.textContent = "Status: INSUFFICIENT_FUNDS";

        return;
    }

    changeDueElem.innerHTML += `<p>Status: ${changeOwed == availableChange ? "CLOSED" : "OPEN"}</p>`;
    givenChange.map(arr => {
        changeDueElem.innerHTML += `<p><small>${arr[0]}: $${arr[1]}</small></p>`;
    });
};

buttonElems.forEach((btnElem) => {
    btnElem.addEventListener("click", () => {
        if (btnElem.classList.contains("clear")) {
            cashInputElem.value = "0.0";

            return;
        } else if (btnElem.classList.contains("enter")) {
            handleCompute();

            return;
        }

        if (cashInputElem.value === "0.0") {
            cashInputElem.value = btnElem.textContent;
        } else {
            cashInputElem.value += btnElem.textContent;
        }
    });
});

cid.forEach((arr) => {
    const changeType   = arr[0];
    const dollarAmount = arr[1];

    let prettyType = "";

    switch (changeType) {
        case "PENNY":
            prettyType = "PENNIES";
            break;
        case "TWENTY":
            prettyType = "TWENTIES";
            break;
        case "ONE HUNDRED":
            prettyType = "HUNDREDS";
            break;
        default:
            prettyType = changeType + "S";
            break;
    }

    const changeItem = document.createElement("li");
    changeItem.textContent = `${prettyType}: $${dollarAmount}`;

    changeListElem.appendChild(changeItem);
});

priceElem.textContent = `$${price}`;
changeElem.textContent = `$${getTotalChangeAmount()}`;