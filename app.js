var nextInput = document.getElementById("nextInput");
var nextBtn = document.getElementById("nextBtn");

var checkContainer = document.getElementById("checkContainer");
var checkInput = document.getElementById("checkInput");
var checkBtn = document.getElementById("checkBtn");

var errorMsg = document.getElementById("errorMsg");

var outputContainer = document.getElementById("outputContainer");
var output = document.getElementById("output");
var noOfNotes = document.querySelectorAll(".noOfNotes");

var notesArray = [2000, 500, 100, 20, 10, 5, 1];

nextBtn.addEventListener("click", () => {
  hideErrorHandler();
  if (nextInput.value > 0) {
    nextBtn.style.display = "none";
    checkContainer.style.display = "block";
  } else {
    showError("Enter Valid Bill Amount");
  }
});

checkBtn.addEventListener("click", () => {
  clearNoOfNotes();
  hideErrorHandler();

  var billValue = Number(nextInput.value);
  var cashValue = Number(checkInput.value);
  if (billValue > 0 && cashValue > 0) {
    console.log(billValue, cashValue);
    if (billValue > cashValue) {
      showError("Cash is less than bill amount, please enter right amount!");
    } else {
      calculateNoOfNotes(billValue, cashValue);
    }
  }
});

function calculateNoOfNotes(bill, cash) {
  if (cash >= bill) {
    var returnAmt = cash - bill;
    if (returnAmt < 1) {
      showError("We don't need to return any amount!");
    } else {
      outputContainer.style.display = "block";
      for (let i = 0; i < notesArray.length; i++) {
        returnAmt = calculation(returnAmt, notesArray[i], i);
      }
    }
  }
}

function calculation(remainder, noteAmt, index) {
  if (remainder >= noteAmt) {
    var note = Math.floor(remainder / noteAmt);
    remainder = remainder - note * noteAmt;
    noOfNotes[index].innerText = `${note}`;
  }
  return remainder;
}

function clearNoOfNotes() {
  for (let notes of noOfNotes) {
    notes.innerText = "";
  }
}

function showError(text) {
  errorMsg.style.display = "block";
  errorMsg.innerText = text;
  outputContainer.style.display = "none";
}

function hideErrorHandler() {
  errorMsg.style.display = "none";
}