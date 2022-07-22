import { useState } from "react";

import "./App.css";
import { convert, palindromeAllformats } from "./Helpers";

function App() {
  const [input, setInput] = useState("");

  const [result, setResult] = useState("");
  //  function to handle onchange event of input
  function handleChange(e) {
    setInput(e.target.value);
  }

  // function to render input date into  yyyymmdd format

  function ClickHandler(enteredDate) {
    //triggered on button click

    enteredDate = input.split("-"); //used to get an array for getNewDatefunction

    let date = enteredDate[2];
    // let monthForNewDate = "0" + parseInt(enteredDate[1]);
    //new Date method has  month starting from 0 to 11 rather than 1 -12 ,hence the need to subtract 1 from month

    let month = enteredDate[1];

    let year = enteredDate[0];
    let monthForNewDate = parseInt(enteredDate[1]);

    // let monthforPrev = parseInt(enteredDate[1]) + 1;

    // ternery to check if there palindrome availible or search for next palindrome date

    const initiator = palindromeAllformats(date, month, year); //
    initiator
      ? setResult("ravo,  your 🎊 birthdate🎊 is a palindrome ")
      : nextOrPrevious(year, month, date);

    function nextOrPrevious() {
      let [ctr1, nextPalinDate] = nextPalindromeDate(year, month, date);
      let [ctr2, prevPalinDate] = previousPalindromeDate(
        year,
        monthForNewDate,
        date
      );
      if (ctr1 > ctr2) {
        setResult(
          `you missed palindrome date by ${ctr2} days, closest palindrome date was  ${
            prevPalinDate.date
          } / ${prevPalinDate.month + 1}   / ${prevPalinDate.year}`
        );
      } else if (ctr2 > ctr1) {
        setResult(
          `you missed palindrome date by ${ctr1} days, next palindrome date is  ${nextPalinDate.date} / ${nextPalinDate.month}   / ${nextPalinDate.year}`
        );
      }
    }
  }

  //  function to get the next date
  function getNextDate(year, month, date) {
    const today = new Date(year, month, date); //new Date js function

    const tomorrow = new Date(today);

    tomorrow.setDate(tomorrow.getDate() + 1); // this line generates the next date
    const formattedTomorrowDate = convert(tomorrow).split("-"); //convert function to convert the date  into yyyymmdd format| eg output=>[2000,05,22]

    let nextDate = formattedTomorrowDate[2];
    let nextMonth = formattedTomorrowDate[1];
    let nextYear = formattedTomorrowDate[0];

    const naveliDate = { date: nextDate, month: nextMonth, year: nextYear };

    return naveliDate;
  }
  // ******************************to get previous date

  function getPreviousDate(year, month, date) {
    const today = new Date(year, month, date); //new Date js function

    const yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    // this line generates the previous date
    const formattedYesterdayDate = convert(yesterday).split("-"); //convert function to convert the date  into yyyymmdd format| eg output=>[2000,05,22]

    let previousDate = formattedYesterdayDate[2];
    let previousMonth = parseInt(formattedYesterdayDate[1]);

    let previousYear = formattedYesterdayDate[0];

    const puraniDate = {
      date: previousDate,
      month: previousMonth,
      year: previousYear,
    };

    return puraniDate;
  }

  // function to find the next palindrome date

  function nextPalindromeDate(nextYear, nextMonth, nextDate) {
    let nextPalinDate = getNextDate(nextYear, nextMonth, nextDate);

    let ctr1 = 0;
    while (1) {
      ctr1++;
      let isPalindromeBoolean = palindromeAllformats(
        nextPalinDate.date,
        nextPalinDate.month,
        nextPalinDate.year
      );
      if (isPalindromeBoolean == true) {
        break;
      }
      nextPalinDate = getNextDate(
        nextPalinDate.year,
        nextPalinDate.month,
        nextPalinDate.date
      );
    }

    return [ctr1, nextPalinDate];
  }

  // for previous palindrom date function*********************

  function previousPalindromeDate(Year, Month, Date) {
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
        prevPalinDate.month,
        prevPalinDate.date
      );
    }

    return [ctr2, prevPalinDate];
  }

  return (
    <div className="App">
      <div className="header">
        <h1>Palindrome Birthday</h1>
        <img src="bg.jpg" alt="" />
      </div>
      <div className="input-container">
        <h4>enter your birth date</h4>
        <input onChange={handleChange} type="date" name="" id="" />
      </div>
      <div className="button-container">
        <button onClick={ClickHandler}>show</button>
      </div>
      <p>{result}</p>
    </div>
  );
}

export default App;
