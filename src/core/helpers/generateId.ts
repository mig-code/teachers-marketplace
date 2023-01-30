export function generateId() {
    const aNumbers = new Uint32Array(1);
    window.crypto?.getRandomValues(aNumbers);
    return ('000000' + aNumbers[0]).slice(-6);
}
