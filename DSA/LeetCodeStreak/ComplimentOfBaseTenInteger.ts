/*
    Leetcode: https://leetcode.com/problems/complement-of-base-10-integer
*/

function bitwiseComplement(n: number): number {
    let binary = "";
    while (n > 0) {
        const r = n % 2;
        n = (n - r) / 2;
        binary = (r === 0 ? 1 : 0) + binary;
    }
    let decimal = 0;
    for (let i = 0; i < binary.length; i++) {
        decimal += Math.pow(2, binary.length - 1 - i) * Number(binary[i]);
    }
    return decimal;
}

console.log(bitwiseComplement(0));
