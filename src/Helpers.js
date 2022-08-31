
// all the required function will be initialized here and exported on to the app ,js

//function to reverse any entered string
export function reverseDateFunction(str) {
  let reversedString = str.split("").reverse().join("");
  return reversedString;
}

// function to get date variations i.e. date in all possible formats
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
  const dateVariationArray = dateVariations(date, month, year);

  let checker = false;
  for (let value of dateVariationArray) {
    if (value === reverseDateFunction(value)) {
      checker = true;

      break;
    }
  }

  return checker;
}

// ********************************************************

//   FUNCTION TO GENERATE NEXT DATE

function getNextDate(year, month, date) {
  const today = new Date(year, month, date); //new Date js function

  const tomorrow = new Date(today);
  // this line generates the next date
  tomorrow.setDate(tomorrow.getDate() + 1);

  //converts the string date format into mm/dd/yyyy format
  const changeDateFormat = tomorrow.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const formattedTomorrowDate = changeDateFormat.split("/");

  let nextDate = formattedTomorrowDate[1];
  let nextMonth = formattedTomorrowDate[0];
  let nextYear = formattedTomorrowDate[2];
  // date object to be retuned by this function
  const newDateObject = {
    date: nextDate,
    month: nextMonth,
    year: nextYear,
  };

  return newDateObject;
}

// ******************************NEXT PALINDROME FUNCTION

export function nextPalindromeDate(nextYear, nextMonth, nextDate) {
  let nextPalinDate = getNextDate(nextYear, nextMonth, nextDate);

  let ctr1 = 0;
  while (1) {
    ctr1++;
    let isPalindromeBoolean = palindromeAllformats(
      nextPalinDate.date,
      nextPalinDate.month,
      nextPalinDate.year
    );
    if (isPalindromeBoolean) {
      break;
    }
    nextPalinDate = getNextDate(
      nextPalinDate.year,
      nextPalinDate.month - 1,
      nextPalinDate.date
    );
  }

  return [ctr1, nextPalinDate];
}

/****************************************************** */

//  **** FUNCTION TO GET PREVIOUS DATE
function getPreviousDate(year, month, date) {
  const today = new Date(year, month, date); //new Date js function
  // this line generates the previous date
  const yesterday = new Date(today);
  //converts the string date format into mm/dd/yyyy format
  yesterday.setDate(yesterday.getDate() - 1);

  //converts the string date format into mm/dd/yyyy format
  const changeDateFormat = yesterday.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  //slashes the mm/dd/yyyy  into ["mm", "dd", "yyyy"]
  const formattedYesterdayDate = changeDateFormat.split("/");

  let previousDate = formattedYesterdayDate[1];

  let previousMonth = formattedYesterdayDate[0];

  let previousYear = formattedYesterdayDate[2];
  // date object to be retuned by this function
  const previousDateObject = {
    date: previousDate,
    month: previousMonth,
    year: previousYear,
  };

  return previousDateObject;
}

//   ******* FUNCTION TO GET PREVIOUS PALINDROME DATE
export function previousPalindromeDate(Year, Month, Date) {
  let prevPalinDate = getPreviousDate(Year, Month, Date);

  let ctr2 = 0;

  while (1) {
    ctr2++;
    const isPalindrome = palindromeAllformats(
      prevPalinDate.date,
      prevPalinDate.month,
      prevPalinDate.year
    );

    if (isPalindrome == true) {
      break;
    }
    prevPalinDate = getPreviousDate(
      prevPalinDate.year,
      prevPalinDate.month - 1,
      prevPalinDate.date
    );
  }

  return [ctr2, prevPalinDate];
}
