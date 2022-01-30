import "../Styles/Keyboard.scss";
import React from "react";

function Keyboard(props) {
  const keys = ["qwertyuiop", "asdfghjkl", "0zxcvbnm1"];
  const spkeys = ["Enter", "Back"]

  return ( 
    <div className='keyboard'>
      {
        keys.map((keyRow, ki) => (
          <div key={ki} className='key-row'>
            {
              keyRow.split('').map((char) => (
                <button key={keyRow.indexOf(char)} className={char in spkeys ? 'key-lg' : 'key' } onClick={() => props.onClick(char)}>{char in spkeys ? spkeys[char]:char}</button>
              ))
            }
          </div>
        ))
      }
    </div>
  );
}

export default Keyboard;
