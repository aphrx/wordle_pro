import "../Styles/Keyboard.scss";
import React from "react";

function Keyboard(props) {
  const keys = ["qwertyuiop", "asdfghjkl", "0zxcvbnm1"];
  const spkeys = ["Enter", "Back"]

  return ( 
    <div className='keyboard'>
      {console.log(props.absent)}
      {
        keys.map((keyRow, ki) => (
          <div key={ki} className='key-row'>
            {
              keyRow.split('').map((char) => (
                <button 
                  key={keyRow.indexOf(char)} 
                  className={`
                    ${char in spkeys ? 'key-lg' : 'key'} 
                    ${props.absent.includes(char) ? 'absent':null}
                    ${props.correct.includes(char) ? 'correct':null}
                    ${props.present.includes(char) ? 'present':null}
                    `} 
                  onClick={() => props.onClick(char)}>
                    {char in spkeys ? spkeys[char]:char}
                  </button>
              ))
            }
          </div>
        ))
      }
    </div>
  );
}

export default Keyboard;
