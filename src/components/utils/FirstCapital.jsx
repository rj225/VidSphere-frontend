
function FirstCapital(head) {
    if (typeof head !== 'undefined' && head !== null) {
    const heading = head.charAt(0).toUpperCase() + head.slice(1);
    return heading;
    }
    else{
        return head;
    }
}

export default FirstCapital
