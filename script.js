// Assignment code here
// Create object to store password specs
var passwordInfo = {
  length: "",
  lowercase: false,
  uppercase: false,
  numeric: false,
  special: false,
};

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  passwordInfo.length = window.prompt(
    "🐱‍💻 Greetings! How long do you want your password to be? (Please enter a number between 8 and 128)"
  );

  // Turn length value into a number
  passwordInfo.length = parseInt(passwordInfo.length);

  // Ensure length value meets requirements
  switch (true) {
    case isNaN(passwordInfo.length):
    case passwordInfo.length < 8:
    case passwordInfo.length > 128:
      writePassword();
  }

  // Collect prompt information from user while updating info object
  function characterTypes() {
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
  }
  characterTypes();

  // Ensure at least one character type is selected
  function checkArray() {
    console.log(passwordInfo);

    // Convert object values into an array
    var passwordArray = Object.values(passwordInfo);

    // Removes length value
    passwordArray.shift();
    console.log(passwordArray);

    // Checks whether all prompts were false
    var allFalse = true;
    for (let i = 0; i < passwordArray.length; i++) {
      // If even one value is true then move on
      if (passwordArray[i] === true) {
        allFalse = false;
        break;
      }
    }

    // If all are still false, then...
    if (allFalse) {
      // ...alert user...
      window.alert(
        "🐱‍💻 Wuh oh! You need to select at least one character type!"
      );

      // ...re-run prompts...
      characterTypes();

      // ...and re-run check
      checkArray();
    }
  }

  // Original function call to check prompts
  checkArray();

  // If prompts are successful alert user
  window.alert("🐱‍💻 Alright, alright, alright! Enjoy your new password!");

  // Password Generator
  function generatePassword() {
    // Declare character types
    const lowercaseCharacters = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numericCharacters = "0123456789";
    const specialCharacters = ` !"#$%&'()*+,-./:;<=>?@[\]^_\u0060{|}~`;

    // An alternate list of special characters for stricter password systems,
    // as is the case with Oracle Identity Manager and Microsoft Active Directory
    // const altSpecialCharacters = `@%+\/'!#$^?:,(){}[]~\u0060-_.`;

    // Declare empty container to store final string
    var str = "";

    // Declare empty container to store character choices
    var choices = [];

    // Check user choices and add selected characters to the array
    if (passwordInfo.lowercase === true) {
      choices += lowercaseCharacters;
    }
    if (passwordInfo.uppercase === true) {
      choices += uppercaseCharacters;
    }
    if (passwordInfo.numeric === true) {
      choices += numericCharacters;
    }
    if (passwordInfo.special === true) {
      choices += specialCharacters;
    }

    console.log(choices);

    // Add random character based on desired password length
    function addCharacters() {
      // Resets string to empty in case of re-running
      str = "";

      // Loops through password, adding random characters from selected choices
      for (let i = 0; i < passwordInfo.length; i++) {
        str += choices.charAt(Math.floor(Math.random() * choices.length));
      }
    }
    addCharacters();

    // Convert each string into an array for comparison
    var lowArr = lowercaseCharacters.split("");
    var upperArr = uppercaseCharacters.split("");
    var numArr = numericCharacters.split("");
    var specialArr = specialCharacters.split("");

    // Check password to ensure it has array choices
    function checkPassword(arr1, arr2) {
      return arr1.some((characters) => arr2.includes(characters));
    };

    // Checks to ensure string includes all character types selected
    function finalCheck() {

      // Logs the string to be checked
      console.log(str);

      // converts string to be checked into an array for comparison
      var strArr = str.split("");

      // Checks string against earlier prompt choices, and...
      if (passwordInfo.lowercase === true) {

        // ...returns true if string doesn't contain any characters from specified array
        if (!checkPassword(strArr, lowArr)) {

          // alerts developer
          console.log("string did not include lowercase characters.");

          // rebuilds a new string
          addCharacters();

          // and checks it again for posterity ;D
          finalCheck();
        }
      }
      if (passwordInfo.uppercase === true) {
        if (!checkPassword(strArr, upperArr)) {
          console.log("string did not include uppercase characters.");
          addCharacters();
          finalCheck();
        }
      }
      if (passwordInfo.numeric === true) {
        if (!checkPassword(strArr, numArr)) {
          console.log("string did not include numeric characters.");
          addCharacters();
          finalCheck();
        }
      }
      if (passwordInfo.special === true) {
        if (!checkPassword(strArr, specialArr)) {
          console.log("string did not include special characters.");
          addCharacters();
          finalCheck();
        }
      }
    }
    finalCheck();

    // outputs final string value
    return str;
  }
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
};

// Add event listener to copy button
copyBtn.addEventListener("click", copyPassword);