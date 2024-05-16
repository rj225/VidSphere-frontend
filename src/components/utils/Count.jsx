function Count(number) {
    if (number < 1000) {
        return number;
    } else if (number >= 1000 && number < 1000000) {
        number = number / 1000;
        return `${number.toFixed(2)}k`;
    } else if (number >= 1000000 && number < 1000000000) {
        number = number / 1000000;
        return `${number.toFixed(1)}m`;
    } else if (number >= 1000000000 && number < 1000000000000) {
        number = number / 1000000000;
        return `${number.toFixed(1)}b`;
    } else if (number >= 1000000000000) {
        number = number / 1000000000000;
        return `${number.toFixed(2)}t`;
    }
    return number;
}

export default Count;
