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
        stepsR[i] = Math.round(start['R'] + ((diffR / steps) * i)).toString(16);
        stepsG[i] = Math.round(start['G'] + ((diffG / steps) * i)).toString(16);
        stepsB[i] = Math.round(start['B'] + ((diffB / steps) * i)).toString(16);
        stepsHex[i] = '#' + stepsR[i] + '' + stepsG[i] + '' + stepsB[i];

        if (stepsHex[i].length < 7) {
            // Often, the value is not long enough. We loop to ensure each RGB value is 2 in length
            const stepColors = [stepsR[i], stepsG[i], stepsB[i]];

            for (var hex in stepColors){
                if (stepColors[hex].length < 2) {
                    stepColors[hex] = '0' + stepColors[hex];
                }
                stepsHex[i] = `#${stepColors.join("")}`;
                console.log(`Final ${stepsHex[i]}`)
            }
        }
    }
    return stepsHex;
}



module.exports = {
    GradientSteps: GradientSteps
}