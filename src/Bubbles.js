import Bubble from './Bubble.js'
import { GradientSteps } from './Effects'


function Bubbles(props) {
    const colors = GradientSteps('#00ffff', '#ff00e1', 14)
    const wh = window.innerHeight;
    const ww = window.innerWidth;
    const center = [ww / 2, wh / 2]

    // Initialization
    const bubbleContainer = []

    for (var i = 0; i < 400; i++) {
        // const x = Math.floor((Math.random() * 200) + (ww / 2 - 100))
        // const y = Math.floor((Math.random() * 200) + (wh / 2 - 100))
        const x = ww/2;
        const y = wh/3;
        const velocity = [((Math.random() * 10) - 5), ((Math.random() * 10) - 5)];
        const strokeStyle = i+10;
        console.log(`pushing new bubble with the color of ${colors[i]}`)
        bubbleContainer.push(new Bubble(
            {
                circle: {
                    cp: [ww / 2, wh / 3],
                    radius: Math.min(ww, wh) / 4
                },
                context: props.context,
                color: colors[i],
                strokeStyle: colors[strokeStyle],
                key: i,
                radius: '4',
                tailLength: 20,
                x: x,
                y: y,
                velocity: velocity
            }
        ))
    }
    return bubbleContainer;
}





export default Bubbles;
