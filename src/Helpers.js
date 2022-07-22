// all the required function will be initialized here and exported on to the app ,js

//function to reverse any entered string
export function reverseDateFunction(str) {
  let reversedString = str.split("").reverse().join("");
  return reversedString;
}

//function to check whether entered string is palindrome

// export function isPalindrome(str) {
//   let returnedString = reverseDateFunction(str);
//   if (str === returnedString) {
//     return true;
//   } else {
//     return false;
//   }
// }

//get diffeent date variations of date entered like ddmmyy etc

export function dateVariations(date, month, year) {
  const ddmmyy = date + month + year; // eg: 22082011
  const mmddyy = month + date + year; // eg:  08222011
  const yymmdd = year + month + date; // eg: 20110822
  const ddmmyyyy = date + month + year.slice(-2); // eg: 220811
  const mmddyyyy = month + date + year.slice(-2); // eg: 082211
  const yyyymmdd = year.slice(-2) + month + date;

  // eg: 110822
  const variationArray = [ddmmyy, ddmmyyyy, yyyymmdd, mmddyy, yymmdd, mmddyyyy];

  return variationArray;
}

// function to check if any of the above returned date formats is palindrome or not

export function palindromeAllformats(date, month, year) {
  const instantCrush = dateVariations(date, month, year);

  let workIt = false;
  for (let value of instantCrush) {
    if (value === reverseDateFunction(value)) {
      workIt = true;
      // console.log(value);
      break;
    }
  }
  return workIt;
}

// function to find the next palindrome date

// helper function to convert the next date into yyyymmdd format
export function convert(str) {
  var date = new Date(str),
    mnth = ("0" + parseInt(date.getMonth())).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}
