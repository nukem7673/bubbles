import './App.css';
import Move from './Move.jsx';
import Canvas from './Canvas.jsx';
import {PulsingCircle} from './Draw';


function App() {
	const bubbles =[0,0,0,0,0,0,0,0,0].map(el => (  
	<Move x={window.innerWidth - 200} y={Math.floor(Math.random() * 100)}> 
	  <Canvas 
	  	draw={PulsingCircle} 
		options={{}}
	  />
	</Move> 
	))
  return (
    <div className="App">
	  {bubbles}
    </div>
  );
}

export default App;
