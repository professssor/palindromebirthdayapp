import { useState } from "react";

import { FaTwitter, FaGithub } from "react-icons/fa";

import "./App.css";
import {
  previousPalindromeDate,
  nextPalindromeDate,
  palindromeAllformats,
} from "./Helpers";

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

    //new Date method has  month starting from 0 to 11 rather than 1 -12 ,hence the need to subtract 1 from month

    let month = enteredDate[1] - 1;

    let year = enteredDate[0];

    // ternery to check if there palindrome availible or search for next palindrome date

    const initiator = palindromeAllformats(date, month, year); //returns boolean if the entered date is palindrome or not
    initiator
      ? setResult("Bravo,  your 🎊 birthdate🎊 is a palindrome ")
      : nextOrPrevious(year, month, date);
    //  decides which palidrome date to show after checking which one was near
    function nextOrPrevious() {
      let [ctr1, nextPalinDate] = nextPalindromeDate(year, month, date);
      let [ctr2, prevPalinDate] = previousPalindromeDate(year, month, date);
      if (ctr1 > ctr2) {
        setResult(
          `you missed palindrome date by ${ctr2} days, closest palindrome date was  ${prevPalinDate.date} - ${prevPalinDate.month}   - ${prevPalinDate.year}`
        );
      } else if (ctr2 > ctr1) {
        setResult(
          `you missed palindrome date by ${ctr1} days, next palindrome date is  ${nextPalinDate.date} -${nextPalinDate.month}   - ${nextPalinDate.year}`
        );
      }
    }
  }

  return (
    <div className="App">
      <div className="header">
        <h1>Palindrome Birthday</h1>
        <img src="bg-min.jpg" alt="" />
      </div>
      <div className="input-container">
        <h4>
          <strong> enter </strong> your <strong> birth </strong> date
        </h4>
        <input onChange={handleChange} type="date" name="" id="" />
      </div>
      <div className="button-container">
        <button onClick={ClickHandler}>show</button>
      </div>
      <p>{result}</p>

      <footer>
        <section className="footer-links">
          {/* footer link */}
          <a href="https://twitter.com/coderGent">
            {" "}
            <FaTwitter />
          </a>
          <a href="https://github.com/professssor/">
            {" "}
            <FaGithub />
          </a>
        </section>
        <h6> © | 2022 | san</h6>
      </footer>
    </div>
  );
}

export default App;
