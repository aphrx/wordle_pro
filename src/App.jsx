import './Styles/App.scss';
import React, { useState, useEffect } from 'react';
import Board from './Components/Board';
import Keyboard from './Components/Keyboard';
import { Words } from './Data/Words';

function App() {
  const createEmptyBoard = (dimensions) => {
    return Array(dimensions[0]).fill(null).map(() => new Array(dimensions[1]).fill(null));
  }

  const [grid, setGrid] = useState(createEmptyBoard([6,5]))
  const [pointer, setPointer] = useState([0,0])
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)
  const [randomWord, setRandomWord] = useState(Words[Math.floor(Math.random()*Words.length)])

  useEffect(() => {
    console.log(randomWord)
    if(toastVisible){
      const timeId = setTimeout(() => {
        setToastVisible(false)
      }, 2000)
    }
  }, [toastVisible])

  
  
  const handleSubmit = () => {
    if(pointer[1] === grid[0].length){
      let sword = grid[pointer[0]]
      if(verifyWord(sword)){
        flipWord(sword, pointer[0])
        pointer[1] = 0
        if(pointer[0] < grid.length){
          pointer[0] += 1
        }
      }
    }
    else{
      setToastMessage("Not enough letters")
      setToastVisible(true)
    }
  }

  const handleLetter = (char) => {
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
      console.log(char);
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

  const flipWord = (word, row) => {
    let temp = []
    for(var i = 0; i < word.length; i++){
      if(word[i] === randomWord[i]){
        temp.push(1)
      }
      else if(randomWord.includes(word[i])){
        temp.push(2)
      }
      else{
        temp.push(0)
      }
    }
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
      <Board grid={grid} />
      <Keyboard onClick={handleLetter}/>
    </div>
  );
}

export default App;
