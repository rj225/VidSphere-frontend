
function FirstCapital(head) {
    const heading = head.charAt(0).toUpperCase() + head.slice(1);
    return heading;
}

export default FirstCapital
