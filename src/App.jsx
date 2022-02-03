import "./Styles/App.scss";
import React, { useState, useEffect } from "react";
import Board from "./Components/Board";
import Keyboard from "./Components/Keyboard";
import { LegibleWords, Words } from "./Data/Words";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faTimes } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Option from "./Components/Option";

function Wordle(props) {
  const createEmptyBoard = (dimensions) => {
    return Array(dimensions[0])
      .fill(null)
      .map(() => new Array(dimensions[1]).fill(null));
  };

  const [grid, setGrid] = useState(createEmptyBoard([6, 5]));
  const [evalGrid, setEvalGrid] = useState([]);
  const [pointer, setPointer] = useState([0, 0]);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [randomWord, setRandomWord] = useState(
    LegibleWords[Math.floor(Math.random() * LegibleWords.length)]
  );
  const [correctLetters, setCorrectLetters] = useState([]);
  const [presentLetters, setPresentLetters] = useState([]);
  const [absentLetters, setAbsentLetters] = useState([]);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    if (toastVisible) {
      setTimeout(() => {
        setToastVisible(false);
      }, 2000);
    }
    console.log(randomWord)
  }, [toastVisible]);

  const handleSubmit = () => {
    if (pointer[1] === grid[0].length) {
      let sword = grid[pointer[0]];
      if (verifyWord(sword)) {
        let evalG = [...evalGrid];
        let res = flipWord(sword)
        console.log(res)
        if(res === false){
          return
        }
        evalG.push(res);
        setEvalGrid(evalG);
        pointer[1] = 0;
        if (pointer[0] < grid.length) {
          pointer[0] += 1;
        }
        if (
          JSON.stringify(evalG[evalG.length - 1]) === JSON.stringify(new Array(5).fill("correct"))
        ) {
          setHasWon(true);
          setToastMessage("You won.");
          setToastVisible(true);
        }
        if (pointer[0] === grid.length && !hasWon) {
          setToastMessage("You lost. Refresh to try again.");
          setToastVisible(true);
        }
      }
    } else {
      setToastMessage("Not enough letters");
      setToastVisible(true);
    }
  };

  const handleLetter = (char) => {
    if (!hasWon && pointer[0] < grid.length) {
      let temp = [...grid];
      if (char === "0") {
        return handleSubmit();
      } else if (char === "1" && pointer[1] > 0) {
        temp[pointer[0]][pointer[1] - 1] = null;
        pointer[1] -= 1;
        setGrid(temp);
      } else if (pointer[1] < grid[1].length && char !== "1") {
        temp[pointer[0]][pointer[1]] = char;
        pointer[1] += 1;
        setGrid(temp);
      }
    }
  };

  const verifyWord = (word) => {
    let vword = word.join("");
    if (Words.includes(vword)) {
      return true;
    } else {
      setToastMessage("Not in word list");
      setToastVisible(true);
      return false;
    }
  };

  //0 - Grey
  //1 - Green
  //2 - Amber

  const flipWord = (word) => {
    let temp = [];
    let a = [];
    let p = [];
    let c = [];
    for (var i = 0; i < word.length; i++) {
      if(props.isHardMode){
        for(var j = 0; j < correctLetters.length; j++){
          let ix = randomWord.indexOf(correctLetters[j])
          if(randomWord[ix] != word[ix]){
            setToastMessage(`${correctLetters[j].toUpperCase()} must be in the ${ix+1} position`);
            setToastVisible(true);
            return false
          }
        }
        for(var k = 0; k < presentLetters.length; k++){
          if(!word.includes(presentLetters[k])){
            setToastMessage(`Guess must contain ${presentLetters[k].toUpperCase()}`);
            setToastVisible(true);
            return false
          }
        }
      }
      if (word[i] === randomWord[i]) {
        temp.push("correct");
        c.push(word[i]);
      } else if (randomWord.includes(word[i])) {
        temp.push("present");
        p.push(word[i]);
      } else {
        temp.push("absent");
        a.push(word[i]);
      }
    }
    console.log(absentLetters);
    setAbsentLetters([...absentLetters, ...a]);
    setPresentLetters([...presentLetters, ...p]);
    setCorrectLetters([...correctLetters, ...c]);
    return temp;
  };

  return (
    <>
      <div
        className={"toast"}
        style={
          toastVisible ? { visibility: "visible" } : { visibility: "hidden" }
        }
      >
        <div className={"toast-container"}>{toastMessage}</div>
      </div>
      <Board grid={grid} eval={evalGrid} />
      <Keyboard
        onClick={handleLetter}
        correct={correctLetters}
        present={presentLetters}
        absent={absentLetters}
      />
    </>
  );
}

function Settings(props) {
  return (
    <>
      <Option title={"Hard Mode"} desc={"Any revealed hints must be used in subsequent guesses"} status={props.hardMode} toggle={props.toggleHardMode}/>
    </>
  );
}

function App() {
  const [inSetting, setInSetting] = useState(false);
  const [isHardMode, setIsHardMode] = useState(false)

  const toggleHardMode = () => {
    setIsHardMode(!isHardMode)
  }

  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <div className={"icon"}>
            <FontAwesomeIcon icon={faCog} style={{ visibility: "hidden" }} />
          </div>
          <div className="title">Wordle</div>

          {inSetting ? (
            <Link to="/settings" onClick={() => setInSetting(!inSetting)}>
              <div className={"icon"}>
                <FontAwesomeIcon icon={faCog} />
              </div>
            </Link>
          ) : (
            <Link to="/" onClick={() => setInSetting(!inSetting)}>
              <div className={"icon"}>
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </Link>
          )}
        </div>
        <Routes>
          <Route path="/" element={<Wordle isHardMode={isHardMode}/>} />
          <Route path="/settings" element={<Settings hardMode={isHardMode} toggleHardMode={toggleHardMode}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
