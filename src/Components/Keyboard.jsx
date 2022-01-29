import '../Styles/Keyboard.scss';

function Keyboard(props) {

  const keys = ['qwertyuiop', 'asdfghjkl', '1zxcvbnm3']
    
  return (
    <div className='keyboard'>
        {
            keys.map((keyRow) => (
                <div className='key-row'>
                    {
                        keyRow.split('').map((char) => (
                            <button className='key'>{char}</button>
                        ))
                    }
                </div>
            ))
        }
    </div>
  );
}

export default Keyboard;
