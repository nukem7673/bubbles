import Bubble from './Bubble.js'
import { GradientSteps } from './Effects'


function Bubbles(props) {
    const colors = GradientSteps('#00ffff', '#ff00e1', 14);
    const wh = window.innerHeight;
    const ww = window.innerWidth;
    props.context.canvas.width = ww;
    props.context.canvas.height = wh;
    const center = [ww / 2, wh / 2];
    const quantity = ww / 4;

    // Initialization
    const bubbleContainer = []

    
    for (var i = 0; i < quantity; i++) {
        const x = ww/2;
        const y = wh/2;
        const velocity = [((Math.random() * 10) - 5), ((Math.random() * 10) - 5)];
        const strokeStyle = i+10;

        bubbleContainer.push(new Bubble(
            {
                circle: {
                    cp: [ww / 2, wh / 2],
                    radius: Math.min(ww, wh) / 2.75
                },
                context: props.context,
                color: colors[i],
                strokeStyle: colors[strokeStyle],
                key: i,
                radius: '16',
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
