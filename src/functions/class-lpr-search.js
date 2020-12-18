// convert to hindi digits function
String.prototype.toIndiaDigits = function() {
  var id = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return this.replace(/[0-9]/g, function(w) {
    return id[+w];
  });
};

// convert string to unicode
function toUnicode(theString) {
  var unicodeString = "";

  for (var i = 0; i < theString.length; i++) {
    var theUnicode = theString
      .charCodeAt(i)
      .toString(16)
      .toUpperCase();

    while (theUnicode.length < 4) {
      theUnicode = "0" + theUnicode;
    }

    theUnicode = "\\u" + theUnicode;
    unicodeString += theUnicode;
  }
  //console.log('your plate: ' + theString + ' converted to: ' + unicodeString);
  return unicodeString;
}

// function to convert unicode to string
function unicodeToChar(text) {
  return text.replace(/\\u[\dA-F]{4}/gi, function(match) {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16));
  });
}

/**
 * Search lpr::-
 *  - check if plate number is not empty
 *  - clear chars array
 *  - clear numbers array
 *  - convert any english number to in plate number to india digits
 *  - convert plate number to unicode !!!
 *  - convert unicode to plate number !!!
 *  - validating each character in chars array
 *  -  concatenate numbers and chars back
 */
export class SearchLpr {
  constructor(plateNumber) {
    this.plateNumber = plateNumber;
    this.chars = [];
    this.numbers = [];
    this.finalPlateNumber = "";
    this.arabicCharsPattern = /[؀-ٟ,*]/g;
    this.hindiDigitsPattern = /['٠','١','٢','٣','٤','٥','٦','٧','٨','٩',_]/g;
    //fixes
    this.prefix = "\\u202D";
    this.postfix = "\\u202C";
    this.betweenfix = "\\u200C";
    this.prefixChar = "\\u202E";
  }

  test() {
    console.log(
      "searching :: ",
      this.plateNumber,
      " final plate:: ",
      this.finalPlateNumber,
      toUnicode(this.finalPlateNumber)
    );
  }

  initialize() {
    // check if input plate number is not empty
    if (this.plateNumber.length == 0) {
      console.log("cannot search empty string");
      return false;
    }

    // clear chars and numbers array
    this.chars.splice(0, this.chars.length);
    this.numbers.splice(0, this.numbers.length);
    //console.log("initalizing ...");
    return true;
  }

  conversions() {
    this.plateNumber = this.plateNumber.toIndiaDigits(); // convert any number to hindi digits
  }

  patternMatching() {
    this.chars = this.plateNumber.match(this.arabicCharsPattern);
    this.numbers = this.plateNumber.match(this.hindiDigitsPattern);
    //console.log("pattern matching");
  }

  concatenation() {
    let finalNumbers = "";
    let finalChars = "";

    if (this.numbers != null && this.numbers.length > 0) {    // check if user input numbers
      this.numbers.forEach(num => {   // handling numbers array
        finalNumbers = finalNumbers + num;
      });

      finalNumbers =
        unicodeToChar(this.prefix) + finalNumbers + unicodeToChar(this.postfix);

      //console.log("final number::", finalNumbers, toUnicode(finalNumbers));
    }

    if (this.chars != null && this.chars.length > 0) {     // check if user input characters
      this.chars = this.chars.slice().reverse();    // inverse chars array

      this.chars.forEach((char, index) => {    // handling chars array
        
        if (char == "*")    // if char == * replace it with _
          char = "_";
        
        if (char == "ه" || char == "ة")   // if char == هـ || ة and replace it with هـ
          char = unicodeToChar("\\u06be");

        
        if (index == 0)  // if this is the first char don't add betweenfix
          finalChars = finalChars + char;
        else 
          finalChars = finalChars + unicodeToChar(this.betweenfix) + char;  
      });

      finalChars =
        unicodeToChar(this.prefix) + finalChars + unicodeToChar(this.postfix);
      //console.log("final chars::", finalChars, toUnicode(finalChars));
    }

    // final plate number
    this.finalPlateNumber = finalNumbers + finalChars;
  }

  output() {
    return this.finalPlateNumber
  }

  search() {
    if (!this.initialize()) return; // initialize data and arrays

    this.conversions(); // make conversions to english numbers to hindi numbers

    this.patternMatching(); // match numbers with hindi pattern and chars with arabic pattern

    this.concatenation(); //concatenate numbers and chars and add prefixes and postfixes

    return this.output();  // return output plate number
    
    this.test();
  }
}
