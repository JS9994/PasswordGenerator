// Password Generator Logic

/* Targets text area to display generatePassword return or "Try again!" message for both writePassword() and generatePassword() functions */
const passwordText = document.querySelector("#password");

// generatePassword function declaration
const generatePassword = () => {
  
  /* Initializes finishedString variable at highest scope of function for later manipulation */
  let finishedString = "";

  // Initial window prompt to determine password length
  let passwordLength = window.prompt("Enter how long you would like your password: 8-12 characters.");
  
  // User hits "Cancel" on password length prompt -- passwordLength is null
  if (!passwordLength) {
    window.alert("No number entered! Please try again.");
    passwordText.setAttribute("placeholder", "Try again!");

  } else {
    // Removes spaces from input so evaluations don't need to filter for whitespace
    passwordLength = passwordLength.replace(/\s+/g, '');

    /* Regular expression to exclude passwordLength strings that contain letters or special characters */
    if (/^[A-Za-z!"#$%&'()*+,\-./:;<=>?@[\\\]^_\`{|}~]+$/.test(passwordLength)) {
      window.alert("Only numbers accepted in this box! Please try again.");
      passwordText.setAttribute("placeholder", "Try again!");

    // User enters number outside of 8-128 range
    } else if (
        (Number(passwordLength) < 8) ||
        (Number(passwordLength) > 12)
      ) {
      window.alert("Number out of range! Please try again.");
      passwordText.setAttribute("placeholder", "Try again!");

    // Ensures passwordLength is within 8-128 range before proceeding
    } else if (
        (Number(passwordLength) >= 8) &&
        (Number(passwordLength) <= 12)
    ) {
      /* Converts passwordLength string to number for use in passwordIterator function calls */
      passwordLength = Number(passwordLength);

      /* characterLibrary object to contain base character sets */
      const characterLibrary = {
        numbers: `0123456789`,
        lowercaseLetters: `abcdefghiklmnopqrstuvwxyz`,
        uppercaseLetters: `ABCDEFGHIJKLMNOPQRSTUVWXTZ`,
        specialCharacters: `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`
      };
  
      /* Variable declarations to create strings based off character combinations and then convert into arrays to pass into characterArray -- allows randomIndex in passwordIterator() to access indexes of each character combination and compile string under finishedString */
      const fullCharacters = (characterLibrary.numbers + characterLibrary.lowercaseLetters + characterLibrary.uppercaseLetters + characterLibrary.specialCharacters).split("");
  
      const noSpecials = (characterLibrary.numbers + characterLibrary.lowercaseLetters + characterLibrary.uppercaseLetters).split("");
  
      const noLowercase = (characterLibrary.numbers + characterLibrary.uppercaseLetters + characterLibrary.specialCharacters).split("");
  
      const noUppercase = (characterLibrary.numbers + characterLibrary.lowercaseLetters + characterLibrary.specialCharacters).split("");
  
      const noNumbers = (characterLibrary.lowercaseLetters + characterLibrary.uppercaseLetters + characterLibrary.specialCharacters).split("");
  
      const specialsAndLowercase = (characterLibrary.specialCharacters + characterLibrary.lowercaseLetters).split("");
  
      const specialsAndUppercase = (characterLibrary.specialCharacters + characterLibrary.uppercaseLetters).split("");
  
      const specialsAndNumbers = (characterLibrary.specialCharacters + characterLibrary.numbers).split("");
  
      const lowercaseAndUppercase = (characterLibrary.lowercaseLetters + characterLibrary.uppercaseLetters).split("");
  
      const lowercaseAndNumbers = (characterLibrary.lowercaseLetters + characterLibrary.numbers).split("");
  
      const uppercaseAndNumbers = (characterLibrary.uppercaseLetters + characterLibrary.numbers).split("");
  
      const specialsOnly = characterLibrary.specialCharacters.split("");
  
      const lowercaseOnly = characterLibrary.lowercaseLetters.split("");
  
      const uppercaseOnly = characterLibrary.uppercaseLetters.split("");
  
      const numbersOnly = characterLibrary.numbers.split("");
      // END variable declarations
  
      /* characterArray declaration to contain different combinations for simple index access after evaluations */
      const characterArray = [fullCharacters /* Index: 0 */, noSpecials /* 1 */, noLowercase /* 2 */, noUppercase /* 3 */, noNumbers /* 4 */, specialsAndLowercase /* 5 */, specialsAndUppercase /* 6 */, specialsAndNumbers /* 7 */, lowercaseAndUppercase /* 8 */, lowercaseAndNumbers /* 9 */, uppercaseAndNumbers /* 10 */, specialsOnly /* 11 */, lowercaseOnly /* 12 */, uppercaseOnly /* 13 */, numbersOnly /* 14 */];
  
      /* passwordIterator() function declaration for calling under if else evaluations. Accepts specified array based on characterArray index and specified length -- pulled from passwordLength */
      const passwordIterator = (array, inputLength) => {
        // Ensures string is as long as passwordLength specification
        for (let i = 0; i < inputLength; i++) {
          /* Generates random number to access random index point based on length of provided array */
          let randomIndex = Math.floor(Math.random() * array.length);
          /* Writes value of each array value at specified index to a string and concatenates onto finishedString string */
          finishedString += array[randomIndex].toString();
        }
      }
  
      // Window confirm creates boolean to determine if numbers are used
      const useNumbers = window.confirm(`Would you like to include numbers? (e.g. 1 2 3)`);
  
      // Window confirm creates boolean to determine if uppercase letters are used
      const useUpperCase = window.confirm(`Would you like to include upper case letters? (e.g. A B C)`);
  
      // Window confirm creates boolean to determine if lowercase letters are used
      const useLowerCase = window.confirm(`Would you like to include lower case letters? (e.g. a b c)`);
  
      // Window confirm creates boolean to determine if special characters are used
      const useSpecialCharacters = window.confirm(`Would you like to include special characters? (e.g. ^ * $)`);
  
      // Case: Use ALL characters to create finishedString (fullCharacters)
      if (useNumbers && 
        useUpperCase && 
        useLowerCase && 
        useSpecialCharacters) {
        passwordIterator(characterArray[0], passwordLength);
  
      // Case: Use all characters BUT special to create finishedString (noSpecials)
      } else if (useNumbers && 
        useUpperCase && 
        useLowerCase && 
        !useSpecialCharacters) {
        passwordIterator(characterArray[1], passwordLength);
  
      // Case: Use all characters BUT lowercase to create finishedString (noLowercase)
      } else if (useNumbers && 
        useUpperCase && 
        !useLowerCase && 
        useSpecialCharacters) {
        passwordIterator(characterArray[2], passwordLength);
  
      // Case: Use all characters BUT uppercase to create finishedString (noUppercase) 
      } else if (useNumbers && 
        !useUpperCase && 
        useLowerCase && 
        useSpecialCharacters) {
        passwordIterator(characterArray[3], passwordLength);
  
      // Case: Use all characters BUT numbers to create finishedString (noNumbers)
      } else if (!useNumbers && 
        useUpperCase && 
        useLowerCase && 
        useSpecialCharacters) {
        passwordIterator(characterArray[4], passwordLength);
  
      // Case: Use special + lowercase characters to create finishedString (specialsAndLowercase)
      } else if (!useNumbers && 
        !useUpperCase && 
        useLowerCase && 
        useSpecialCharacters) {
        passwordIterator(characterArray[5], passwordLength);
  
      // Case: Use special + uppercase characters to create finishedString (specialsAndUppercase)
      } else if (!useNumbers && 
        useUpperCase && 
        !useLowerCase && 
        useSpecialCharacters) {
        passwordIterator(characterArray[6], passwordLength);
  
      // Case: Use special + number characters to create finishedString (specialsAndNumbers)
      } else if (useNumbers && 
        !useUpperCase && 
        !useLowerCase && 
        useSpecialCharacters) {
        passwordIterator(characterArray[7], passwordLength);
  
      // Case: Use lowercase + uppercase characters to create finishedString (lowercaseAndUppercase)
      } else if (!useNumbers && 
        useUpperCase && 
        useLowerCase && 
        !useSpecialCharacters) {
        passwordIterator(characterArray[8], passwordLength);
  
      // Case: Use special + number characters to create finishedString (lowercaseAndNumbers)
      } else if (useNumbers && 
        !useUpperCase && 
        useLowerCase && 
        !useSpecialCharacters) {
        passwordIterator(characterArray[9], passwordLength);
  
      // Case: Use uppercase + number characters to create finishedString (uppercaseAndNumbers)
      } else if (useNumbers && 
        useUpperCase && 
        !useLowerCase && 
        !useSpecialCharacters) {
        passwordIterator(characterArray[10], passwordLength);
  
      // Case: Use special characters ONLY to create finishedString (specialsOnly)
      } else if (!useNumbers && 
        !useUpperCase && 
        !useLowerCase && 
        useSpecialCharacters) {
        passwordIterator(characterArray[11], passwordLength);
  
      // Case: Use lowercase characters ONLY to create finishedString (lowercaseOnly)
      } else if (!useNumbers && 
        !useUpperCase && 
        useLowerCase && 
        !useSpecialCharacters) {
        passwordIterator(characterArray[12], passwordLength);
  
      // Case: Use uppercase characters ONLY to create finishedString (uppercaseOnly)
      } else if (!useNumbers && 
        useUpperCase && 
        !useLowerCase && 
        !useSpecialCharacters) {
        passwordIterator(characterArray[13], passwordLength);
  
      // Case: Use number characters ONLY to create finishedString (numbersOnly)
      } else if (useNumbers && 
        !useUpperCase && 
        !useLowerCase && 
        !useSpecialCharacters) {
        passwordIterator(characterArray[14], passwordLength);
  
      /* Catch all in case user says "no" to ALL parameters (presses Cancel on all prompts after passwordLength) */
      } else {
        window.alert("No parameters specified! Please try again.");
        passwordText.setAttribute("placeholder", "Try again!");
      }
  
    }
  }

  /* Ensures password variable under writePassword() is returned finishedString value to display on page */
  return finishedString;
}

// writePassword() declaration to write password to the page
const writePassword = () => {
  // Calls generatePassword function for returned value
  const password = generatePassword();

  // Sets text area to display value of password variable
  passwordText.value = password;
}

// Targets generate button for later event listener assignment
const generateBtn = document.querySelector("#generate");

// Add event listener to generate button -- runs on page load
generateBtn.addEventListener("click", writePassword);