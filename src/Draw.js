function PulsingCircle(ctx, frameCount, color) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = color //'#000000'
        ctx.beginPath()
        ctx.arc(50, 100, 10 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI)
        ctx.fill()
}

function GradientSteps(startColor, endColor, steps) {
        var start = {
                'Hex': startColor,
                'R': parseInt(startColor.slice(1, 3), 16),
                'G': parseInt(startColor.slice(3, 5), 16),
                'B': parseInt(startColor.slice(5, 7), 16)
        }
        var end = {
                'Hex': endColor,
                'R': parseInt(endColor.slice(1, 3), 16),
                'G': parseInt(endColor.slice(3, 5), 16),
                'B': parseInt(endColor.slice(5, 7), 16)
        }
        let diffR = end['R'] - start['R'];
        let diffG = end['G'] - start['G'];
        let diffB = end['B'] - start['B'];

        let stepsHex = [];
        let stepsR = [];
        let stepsG = [];
        let stepsB = [];

        for (var i = 0; i <= steps; i++) {
                stepsR[i] = start['R'] + ((diffR / steps) * i);
                stepsG[i] = start['G'] + ((diffG / steps) * i);
                stepsB[i] = start['B'] + ((diffB / steps) * i);
                stepsHex[i] = '#' + Math.round(stepsR[i]).toString(16) + '' + Math.round(stepsG[i]).toString(16) + '' + Math.round(stepsB[i]).toString(16);
        }
        return stepsHex;

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








const DrawBubbles = (bubbleArray) => {
        bubbleArray.forEach(bubble => bubble.update())
}




module.exports = {
        PulsingCircle: PulsingCircle,
        GradientSteps: GradientSteps,
        DrawBubble: DrawBubble,
        DrawBubbles: DrawBubbles
}
