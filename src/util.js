export function weightedRandom(items, weights) {
    if (items.length !== weights.length) {
        throw new RangeError(`items and weights must be the same length (${items.length} vs ${weights.length})`);
    }

    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let rand = Math.random() * totalWeight;

    for (let i = 0; i < items.length; i++) {
        if (rand < weights[i]) {return items[i];}
        rand -= weights[i];
    }
}



export function hexToRGB(hexColor) {
    let r, g, b;
    
    let digits = hexColor;
    if (digits[0] === '#') {
        digits = digits.slice(1);
    }

    if (digits.length === 3) {
        r = parseInt(digits[0], 16);
        g = parseInt(digits[1], 16);
        b = parseInt(digits[2], 16);
    }
    else if (digits.length === 6) {
        r = parseInt(digits.slice(0,2), 16);
        g = parseInt(digits.slice(2,4), 16);
        b = parseInt(digits.slice(4,6), 16);
    }
    else {
        throw new RangeError(`${hexColor} is not a valid color`);
    }

    return [r, g, b];
}



export function contrast(hexColor) {
    const [r, g, b] = hexToRGB(hexColor);

    // https://www.w3.org/TR/AERT/#color-contrast
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000
    
    return brightness >= 128 ? "black" : "white";
}
