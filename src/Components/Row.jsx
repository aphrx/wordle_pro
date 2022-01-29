import '../Styles/Row.scss';

function Row(props) {
  return (
    <div className='row'>{props.children}</div>
  );
}

export default Row;
