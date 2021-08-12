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

        if (stepsHex[i].length < 7) {
            console.warn(`${stepsHex[i]} value not long enough.`)
            console.warn(`R: ${stepsR[i]}, G: ${stepsG[i]}, B: ${stepsB[i]}`);
            console.warn('#' + Math.round(stepsR[i]).toString(16) + '  ' + Math.round(stepsG[i]).toString(16) + '  ' + Math.round(stepsB[i]).toString(16));
            stepsHex[i] = stepsHex[i].replace("0", "00");
            console.warn(`Now: ${stepsHex[i]}`);
        }
    }
    return stepsHex;
}



module.exports = {
    GradientSteps: GradientSteps
}