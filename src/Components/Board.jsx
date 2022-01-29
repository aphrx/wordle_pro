import '../Styles/Board.scss';

function Board(props) {
  return (
    <div className='board-container'>
        <div className='board'>{props.children}</div>
    </div>
  );
}

export default Board;
