// Assignment code here

// Object for storing password details
var passwordInfo = {
  length: "",
  lowercase: false,
  uppercase: false,
  numeric: false,
  special: false,
};

// Empty containers for storing chosen character types and password string
let choices = [];
let str = "";

// Declare character types
const charTypes = [
  "abcdefghijklmnopqrstuvwxyz",
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "0123456789",
  ` !"#$%&'()*+,-./:;<=>?@[\]^_\u0060{|}~`,
];

// An alternate list of special characters for stricter password systems,
// as is the case with Oracle Identity Manager and Microsoft Active Directory
// const specialCharacters = `@%+\/'!#$^?:,(){}[]~\u0060-_.`;

// Convert each string into an array for later comparison
var lowArr = charTypes[0].split("");
var upperArr = charTypes[1].split("");
var numArr = charTypes[2].split("");
var specialArr = charTypes[3].split("");

var typeArr = [lowArr, upperArr, numArr, specialArr];
var nameArr = ["lowercase", "uppercase", "numeric", "special"];

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

function getLength() {
  passwordInfo.length = window.prompt(
    "🐱‍💻 Greetings! How long do you want your password to be? (Please enter a number between 8 and 128)"
  );

   // Ensure length value meets requirements
   while (
    isNaN(passwordInfo.length) ||
    passwordInfo.length < 8 ||
    passwordInfo.length > 128
  ) {
    getLength();
  }
}

// Collect prompt information from user while updating info object
function passPrompts() {
  getLength();
  passwordInfo.lowercase = window.confirm(
    "🐱‍💻 Rad. Would you like lowercase characters included in your password?"
  );
  passwordInfo.uppercase = window.confirm(
    "🐱‍💻 Ok, how about uppercase characters?"
  );
  passwordInfo.numeric = window.confirm(
    "🐱‍💻 I like your style! Should we include numbers?"
  );
  passwordInfo.special = window.confirm(
    "🐱‍💻 Almost done. Wanna throw some special characters into the mix?"
  );

  // Prevent user from not choosing any parameters
  while (
    !passwordInfo.lowercase &&
    !passwordInfo.uppercase &&
    !passwordInfo.numeric &&
    !passwordInfo.special
  ) {
    window.alert(
      "🐱‍💻 Wuh oh! You need to select at least one character type!"
    );
    passPrompts();
  }
  // If prompts are successful alert user
  window.alert("🐱‍💻 Alright, alright, alright! Enjoy your new password!");
}

function generatePassword() {
  compileChoices();
  finalCheck();
  return str;
}

// Checks earlier choices and adds selected character types to the
function compileChoices() {
  // References the values in passwordInfo object
  var passChoices = Object.values(passwordInfo);

  // Removes the length key-value pair
  passChoices.shift();

  // A loop that updates the choices container with the user selections
  for (let i = 0; i < charTypes.length; i++) {
    if (passChoices[i]) {
      choices += charTypes[i];
    }
  }
  console.log(choices);
  addCharacters();
}

// Adds random characters to string based on our choices
function addCharacters() {
  // Resets string to empty in case of re-running
  str = "";

  // Loops through password, adding random characters from selected choices
  for (let i = 0; i < passwordInfo.length; i++) {
    str += choices.charAt(Math.floor(Math.random() * choices.length));
  }
}

// Checks to ensure string includes all character types selected
function finalCheck() {
  // Logs the string to be checked
  console.log(str);

  // converts string to be checked into an array for comparison
  var strArr = str.split("");

  // References booleans in passwordInfo object
  var passChoices = Object.values(passwordInfo);
  passChoices.shift();

  // Loops through user-selected booleans
  for (let i = 0; i < passChoices.length; i++) {

    // If they selected a certain criteria...
    if (passChoices[i]) {

      // ...check our password for that criteria, and if it's not there...
      if (!checkPassword(strArr, typeArr[i])) {

        // ...alert the developer...
        console.log("string did not include " + nameArr[i] + " characters.");

        // ...rebuild a new string...
        addCharacters();

        // ...and check it again for posterity 🐱‍💻
        finalCheck();
      }
    }
  }
}

// Checks password to ensure it has array choices
function checkPassword(arr1, arr2) {
  return arr1.some((characters) => arr2.includes(characters));
}

// Write password to the #password input
function writePassword() {
  passPrompts();

  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Reference the copy button
const copyBtn = document.getElementById("copy-btn");
const copyPass = document.getElementById("password");

// Copy function
function copyPassword() {
  copyPass.select();
  document.execCommand("copy");
}

// Add event listener to copy button
copyBtn.addEventListener("click", copyPassword);
