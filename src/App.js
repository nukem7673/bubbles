import './App.css';
import { DrawBubbles } from './Draw';
import Canvas from './Canvas';


function App() {


	// // Initialization
	// useEffect(() => {
	// 	const bubbleContainer = []

	// 	for (var i = 0; i < 100; i++) {
	// 		const x = (Math.floor(Math.random() * window.innerWidth))
	// 		const y = (Math.floor(Math.random() * window.innerHeight))

	// 		bubbleContainer.push(
	// 			<Bubble
	// 				context={c}
	// 				color={colors[i]}
	// 				key={i}
	// 				radius={'50'}
	// 				x={x}
	// 				y={y}
	// 			/>
	// 		)
	// 	}

	// 	updateBubbles(bubbleContainer)

	// }, [])

	
	// useEffect(() => {
	// 	const canvas = document.getElementById("test")
	// 	updateC(canvas.getContext('2d'))
	// }, [])

	return (
		<div className="App" >
			<Canvas
				draw={DrawBubbles}
				id="test"
				height={window.innerHeight}
				width={window.innerWidth}
			/>

		</div>
	);
}

export default App;










// <Move key={el} x={x} y={y}> 
//   <Canvas 
//   	draw={PulsingCircle} 
// 	color={colors[el]}
// 	options={{}}
//   />
// </Move> 
