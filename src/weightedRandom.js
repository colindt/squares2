export default function weightedRandom(items, weights) {
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
