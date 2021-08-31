import Bubble from './Bubble.js'
import { GradientSteps } from './Effects'


const wh = window.innerHeight;
const ww = window.innerWidth;

function Bubbles(props) {
    const colors = GradientSteps('#00ffff', '#ff00e1', 14);

    props.context.canvas.width = ww;
    props.context.canvas.height = wh;
    const center = [ww / 2, wh / 2];
    const quantity = wh / 10;
    // Props
    const radius = Math.min(ww, wh) / 2.75;

    // Initialization
    const bubbleContainer = []

    
    for (var i = 0; i < quantity; i++) {
        // Create an offset otherwise the reflections are just back and forth
        const offsets = [randomXY(), randomXY()];
        const x = ww/2 + offsets[0];
        const y = wh/2 + offsets[1];
        const velocity = [((Math.random() * 5) - 2.5), ((Math.random() * 5) - 2.5)];
        const strokeStyle = i+10;

        bubbleContainer.push(new Bubble(
            {
                circle: {
                    cp: [ww / 2, wh / 2],
                    radius: radius
                },
                context: props.context,
                color: colors[i],
                strokeStyle: colors[strokeStyle],
                key: i,
                radius: '4',
                tailLength: 1,
                x: x,
                y: y,
                z: 1,
                velocity: velocity
            }
        ))
    }
    
    const refBubble = new Bubble(
        {
            circle: {
                cp: [ww / 2, wh / 2],
                radius: radius
            },
            context: props.context,
            color: "#fffffff0",
            strokeStyle: "#ffffff",
            key: "center",
            radius: radius + 14,
            tailLength: 1,
            x: ww / 2,
            y: wh / 2,
            z: 0,
            velocity: [0, 0]
        }
    )

    bubbleContainer[49] = refBubble;
    return bubbleContainer;
}



function randomXY() {
    return Math.floor(Math.random() * (ww/8)) - (ww/16);
}

export default Bubbles;
