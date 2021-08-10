import Bubble from './Bubble.js'
import { GradientSteps } from './Effects'
function Bubbles(props) {
    const colors = GradientSteps('#00e1ff', '#cf00c4', 10100)


    // Initialization
    const bubbleContainer = []

    for (var i = 0; i < 10000; i++) {
        const x = (Math.floor(Math.random() * window.innerWidth))
        const y = (Math.floor(Math.random() * window.innerHeight / 10 + (window.innerHeight /2.5)))
	const velocity = [((Math.random() * 8)), ((Math.random() * 20)+1)];
	const strokeStyle = i;

        bubbleContainer.push(new Bubble(
            {
                context: props.context,
                color: colors[i],
		strokeStyle: colors[strokeStyle],
                key: i,
                radius: '5',
                x: x,
                y: y,
		velocity: velocity 
            }
        ))
    }

    // console.log(`bubbleContainer: ${JSON.stringify(bubbleContainer[0])}`)


    return bubbleContainer;
}





export default Bubbles;
