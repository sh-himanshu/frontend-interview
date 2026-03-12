/*
    Title: 1980. Find Unique Binary String
    LC: https://leetcode.com/problems/find-unique-binary-string/description
    Neetcode: https://www.youtube.com/watch?v=aHqn4Dynd1k

    ["111","011","001"]
*/

const solve = (n: number, arr: string[]) => {
    if (n === 1) return arr;
    const newArr: string[] = [];
    for (const i of ["1", "0"]) {
        for (const j of arr) {
            newArr.push(`${i}${j}`);
        }
    }
    return solve(n - 1, newArr);
};
// O(n * 2^n)
function findDifferentBinaryString1(nums: string[]): string {
    const k = new Set(nums);
    const n = nums[0].length;
    for (const j of solve(n - 1, ["1", "0"])) {
        for (const i of ["1", "0"]) {
            const str = `${i}${j}`;
            if (!k.has(str)) return str;
            k.add(str);
        }
    }
    return "";
}

// Cantor’s Diagonal Argument O(n)
function findDifferentBinaryString2(nums: string[]): string {
    let result = "";

    for (let i = 0; i < nums.length; i++) {
        result += nums[i][i] === "0" ? "1" : "0";
    }

    return result;
}

console.log(findDifferentBinaryString1(["111", "011", "001"]));
console.log(findDifferentBinaryString2(["111", "011", "001"]));
