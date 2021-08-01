function PulsingCircle(ctx, frameCount, color) {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
	ctx.fillStyle = color //'#000000'
	ctx.beginPath()
	ctx.arc(50, 100, 40*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
	ctx.fill()
}

function gradient(startColor, endColor, steps) {
             var start = {
                     'Hex'   : startColor,
                     'R'     : parseInt(startColor.slice(1,3), 16),
                     'G'     : parseInt(startColor.slice(3,5), 16),
                     'B'     : parseInt(startColor.slice(5,7), 16)
             }
             var end = {
                     'Hex'   : endColor,
                     'R'     : parseInt(endColor.slice(1,3), 16),
                     'G'     : parseInt(endColor.slice(3,5), 16),
                     'B'     : parseInt(endColor.slice(5,7), 16)
             }
             let diffR = end['R'] - start['R'];
             let diffG = end['G'] - start['G'];
             let diffB = end['B'] - start['B'];

             let stepsHex  = new Array();
             let stepsR    = new Array();
             let stepsG    = new Array();
             let stepsB    = new Array();

             for(var i = 0; i <= steps; i++) {
                     stepsR[i] = start['R'] + ((diffR / steps) * i);
                     stepsG[i] = start['G'] + ((diffG / steps) * i);
                     stepsB[i] = start['B'] + ((diffB / steps) * i);
                     stepsHex[i] = '#' + Math.round(stepsR[i]).toString(16) + '' + Math.round(stepsG[i]).toString(16) + '' + Math.round(stepsB[i]).toString(16);
             }
             return stepsHex;

}

module.exports = {
	PulsingCircle: PulsingCircle
}
