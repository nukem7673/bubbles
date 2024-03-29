function PulsingCircle(ctx, frameCount, color) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = color //'#000000'
        ctx.beginPath()
        ctx.arc(50, 100, 10 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI)
        ctx.fill()
}




const DrawBubble = (context, frameCount, options) => {
        // console.log(`DrawBubble is now running . . .\noptions: ${JSON.stringify(options)}]`)
        const canvas = context.canvas
        const { x, y, radius, color } = options


        context.clearRect(0, 0, canvas.width, canvas.height)
        context.beginPath()
        context.arc(x, y, radius, 0, (2 * Math.PI), false)
        context.strokeStyle = color
        context.lineWidth = 10
        context.stroke()
}




const WhiteCircle = (options, ctx) => {
        const { x, y, radius, colors } = options;
        ctx.beginPath();
        ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, radius, 0, (2 * Math.PI));

        const circleColor = ctx.createRadialGradient(window.innerWidth / 2, window.innerHeight / 2, radius, x, y, radius);
        circleColor.addColorStop(0 , "#00ffffa0");
        circleColor.addColorStop(.2 , "#00fffaa0");
        circleColor.addColorStop(1 , "#ff00ffa0");

        ctx.strokeStyle = colors.stroke;
        ctx.lineWidth = options.lineWidth || 2;
        ctx.fillStyle = circleColor;
        // ctx.stroke();
        ctx.fill();
}



const DrawBubbles = (bubbleArray, frameCount) => {
        bubbleArray.forEach(bubble => bubble.update(frameCount))
}




module.exports = {
        PulsingCircle: PulsingCircle,
        DrawBubble: DrawBubble,
        DrawBubbles: DrawBubbles,
        WhiteCircle: WhiteCircle
}
