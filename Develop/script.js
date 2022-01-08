// Assignment code here
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
  passwordInfo.length = parseInt(passwordInfo.length);
  switch (true) {
      case isNaN(passwordInfo.length):
      case passwordInfo.length < 8:
      case passwordInfo.length > 128:
        writePassword();
  };
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
  };

  // START HERE TOMORROW (today)
  characterTypes();
  console.log(passwordInfo);
  var passwordArray = Object.values(passwordInfo);
  passwordArray.shift();
  passwordArray.toString();
  console.log(passwordArray)
  if (!passwordArray) {
    window.alert("🐱‍💻 Wuh oh! You need to select at least one character type!");
    characterTypes();
  }


  window.alert("🐱‍💻 Alright, alright, alright! Enjoy your new password!");
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

};

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
