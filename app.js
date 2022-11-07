// inputs
const bill = document.getElementById("bill");
const customTip = document.getElementById("custom");
const people = document.getElementById("people");
// buttons
const btnTip = document.querySelectorAll(".tip");
const btnReset = document.querySelector(".reset");
// text
const tipAmountPerson = document.querySelector(".amount__sum");
const totalAmountPerson = document.querySelector(".total__sum");

let tipPercentage;

function calculateTip(e) {
  if (!e.target.classList.contains("active")) {
    btnTip.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");
  }
  tipPercentage = e.target.value;
  tipPercentage = parseFloat(tipPercentage) / 100;
  tipPercentage = tipPercentage.toFixed(2);
  calculateBill();
  customTip.value = "";
}

customTip.oninput = function () {
  if (customTip.value <= 0 || customTip.value === null) {
    console.log("work");
    tipAmountPerson.textContent = `$0.00`;
    totalAmountPerson.textContent = `$0.00`;
  } else {
    btnTip.forEach((btn) => btn.classList.remove("active"));

    tipPercentage = customTip.value;
    tipPercentage = parseFloat(tipPercentage) / 100;
    tipPercentage = tipPercentage.toFixed(2);
    calculateBill();
  }
};

function calculateBill() {
  let total;
  let tipTotal;
  let fullAmount;

  if (bill.value > 0 && people.value > 0) {
    total = bill.value / people.value;
    tipTotal = (bill.value * tipPercentage) / people.value;
    fullAmount = total + tipTotal;

    tipAmountPerson.textContent = `$${tipTotal.toFixed(2)}`;
    totalAmountPerson.textContent = `$${fullAmount.toFixed(2)}`;
  }
}

btnTip.forEach((tip) => tip.addEventListener("click", calculateTip));

function reset() {
  bill.value = "";
  people.value = "";
  customTip.value = "";
  tipAmountPerson.textContent = "$0.00";
  totalAmountPerson.textContent = "$0.00";
  tipPercentage = 0;
  btnTip.forEach((btn) => btn.classList.remove("active"));
}

function applyDisabled() {
  if (!bill.value || !people.value) {
    btnReset.disabled = true;
  } else {
    btnReset.disabled = false;
  }
}

setInterval(() => {
  applyDisabled();
}, 300);
btnReset.addEventListener("click", reset);
bill.addEventListener("input", calculateBill);
people.addEventListener("input", calculateBill);
customTip.addEventListener("input", calculateBill);
