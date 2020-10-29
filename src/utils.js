function random(max) {
    return Math.floor(Math.random() * max);
}

function generate(length, set) {
    const result = [];
    while (length--) {
        result.push(set[random(set.length - 1)]);
    }
    return result;
}

module.exports = {
    generate
}
