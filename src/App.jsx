import './Styles/App.scss';
import Tile from './Components/Tile.jsx';
import Board from './Components/Board.jsx';
import Row from './Components/Row.jsx';
import Keyboard from './Components/Keyboard';

function App() {
  return (
    <div className='App'>
      <div className='App-header'>
        <div className='title'>Wordle</div>
      </div>
      <Board>
        <Row>
          <Tile/>
          <Tile/>
          <Tile/>
          <Tile/>
          <Tile/>
        </Row>
        <Row>
          <Tile/>
          <Tile/>
          <Tile/>
          <Tile/>
          <Tile/>
        </Row>
        <Row>
          <Tile/>
          <Tile/>
          <Tile/>
          <Tile/>
          <Tile/>
        </Row>
        <Row>
          <Tile/>
          <Tile/>
          <Tile/>
          <Tile/>
          <Tile/>
        </Row>
        <Row>
          <Tile/>
          <Tile/>
          <Tile/>
          <Tile/>
          <Tile/>
        </Row>
        <Row>
          <Tile/>
          <Tile/>
          <Tile/>
          <Tile/>
          <Tile/>
        </Row>
      </Board>
      <Keyboard/>
    </div>
  );
}

export default App;
