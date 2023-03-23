

let sum = (a, b) => {
    if (a && b) {
        if (typeof (a) == 'string' || typeof (b) == 'string') {
            return "please enter numbers"
        }
        return a + b;
    }
    return 0;
}

let square = (a) => {

    if (a && typeof (a) === 'number') {

        return a * a;

    }
    return 'please pass the number'

}

module.exports = { sum, square }
