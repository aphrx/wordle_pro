import './Styles/App.scss';
import React, { useState, useEffect } from 'react';
import Board from './Components/Board';
import Keyboard from './Components/Keyboard';
import { LegibleWords, Words } from './Data/Words';

function App() {
  const createEmptyBoard = (dimensions) => {
    return Array(dimensions[0]).fill(null).map(() => new Array(dimensions[1]).fill(null));
  }

  const [grid, setGrid] = useState(createEmptyBoard([6,5]))
  const [evalGrid, setEvalGrid] = useState([])
  const [pointer, setPointer] = useState([0,0])
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)
  const [randomWord, setRandomWord] = useState(LegibleWords[Math.floor(Math.random()*LegibleWords.length)])
  const [correctLetters, setCorrectLetters] = useState([])
  const [presentLetters, setPresentLetters] = useState([])
  const [absentLetters, setAbsentLetters] = useState([])
  const [hasWon, setHasWon] = useState(false)

  useEffect(() => {
    console.log(randomWord)
    if(toastVisible){
      setTimeout(() => {
        setToastVisible(false)
      }, 2000)
    }
  }, [toastVisible])


  
  const handleSubmit = () => {
    if(pointer[1] === grid[0].length){
      let sword = grid[pointer[0]]
      if(verifyWord(sword)){
        let evalG = [...evalGrid]
        evalG.push(flipWord(sword))
        setEvalGrid(evalG)
        pointer[1] = 0
        if(pointer[0] < grid.length){
          pointer[0] += 1
        }
        console.log(evalG[evalG.length-1])
        console.log(Array(5).fill('correct'))
        if(JSON.stringify(evalG[evalG.length-1]) == JSON.stringify(new Array(5).fill('correct'))){
          console.log("done")
          setHasWon(true)
          setToastMessage("You won.")
          setToastVisible(true)
        }
        if(pointer[0] == grid.length && !hasWon){
          setToastMessage("You lost. Refresh to try again.")
          setToastVisible(true)
        }
      }
    }
    else{
      setToastMessage("Not enough letters")
      setToastVisible(true)
    }
  }

  const handleLetter = (char) => {
    if(!hasWon && pointer[0] < grid.length){
      let temp = [...grid]
      if(char === '0'){
        return handleSubmit()
      }
      else if(char === '1' && pointer[1] > 0){   
        temp[pointer[0]][pointer[1]-1] = null
        pointer[1] -= 1
        setGrid(temp)
      }
      else if(pointer[1] < grid[1].length && char !== '1'){
        temp[pointer[0]][pointer[1]] = char
        pointer[1] += 1
        setGrid(temp)
      }
    }
  };

  const verifyWord = (word) => {
    let vword = word.join('')
    if(Words.includes(vword)){
      return true
    }
    else {
      setToastMessage("Not in word list")
      setToastVisible(true)
      return false
    }
  }

  //0 - Grey
  //1 - Green
  //2 - Amber

  const flipWord = (word) => {
    let temp = []
    let a = []
    let p = []
    let c =[]
    for(var i = 0; i < word.length; i++){
      if(word[i] === randomWord[i]){
        temp.push('correct')
        // if(!correctLetters.includes(word[i])){
        //   setCorrectLetters([...correctLetters].push(word[i]))
        // }
        c.push(word[i])
      }
      else if(randomWord.includes(word[i])){
        temp.push('present')
        // if(!presentLetters.includes(word[i])){
        //   setPresentLetters([...presentLetters].push(word[i]))
        // }
        p.push(word[i])
      }
      else{
        temp.push('absent')
        // if(!absentLetters.includes(word[i])){
        a.push(word[i])
        // }
      }
    }
    console.log(absentLetters)
    setAbsentLetters([...absentLetters, ...a])
    setPresentLetters([...presentLetters, ...p])
    setCorrectLetters([...correctLetters, ...c])
    return temp
  }

  return (
    <div className='App'>
      <div className='App-header'>
        <div className='title'>Wordle</div>
      </div>
      <div className={'toast'} style={toastVisible? {visibility:'visible'}:{visibility:'hidden'}}>
        <div className={'toast-container'}>
          {toastMessage}
        </div>
      </div>
      <Board grid={grid} eval={evalGrid}/>
      <Keyboard onClick={handleLetter} correct={correctLetters} present={presentLetters} absent={absentLetters}/>
    </div>
  );
}

export default App;
