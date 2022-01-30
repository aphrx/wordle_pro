import '../Styles/Board.scss';
// import React, { useState } from 'react';

function Board(props) {

  // const [grid, setGrid] = useState([6,5])

  return (
    <div className='board-container'>
      {console.log(props.grid)}
      <div className='board'>
        {
          props.grid.map((row, i) => {
            return (
            <div className='row' key={i}>
              {
                row.map((e, ei) => {
                  return <div key={ei} className='tile empty'>{e}</div>
                })
              }
            </div>)
          })
        }
      </div>
    </div>
  );
}

export default Board;
