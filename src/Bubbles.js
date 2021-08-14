import Bubble from './Bubble.js'
import { GradientSteps } from './Effects'


function Bubbles(props) {
    const colors = GradientSteps('#00ffff', '#ff00e1', 400)
    const wh = window.innerHeight;
    const ww = window.innerWidth;
    const center = [ww / 2, wh / 2]

    // Initialization
    const bubbleContainer = []

    for (var i = 0; i < 400; i++) {
        const x = Math.floor((Math.random() * 200) + (ww / 2 - 100))
        const y = Math.floor((Math.random() * 200) + (wh / 2 - 100))
        const velocity = [((Math.random() * 4) - 2), ((Math.random() * 10) - 5)];
        const strokeStyle = i;
        console.log(`pushing new bubble with the color of ${colors[i]}`)
        bubbleContainer.push(new Bubble(
            {
                circle: {
                    cp: [ww / 2, wh / 2],
                    radius: Math.min(ww, wh) / 4
                },
                context: props.context,
                color: colors[i],
                strokeStyle: colors[strokeStyle],
                key: i,
                radius: '4',
                x: x,
                y: y,
                velocity: velocity
            }
        ))
    }
    return bubbleContainer;
}





export default Bubbles;
