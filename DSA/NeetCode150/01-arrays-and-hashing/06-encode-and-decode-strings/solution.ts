/*
Title: Encode and Decode Strings
Category: Arrays & Hashing
Difficulty: Medium
LeetCode: https://leetcode.com/problems/encode-and-decode-strings/
NeetCode: https://neetcode.io/problems/string-encode-and-decode?list=neetcode150
Status: Not Started

Notes:
- 

Complexity:
- Time: O()
- Space: O()
*/

// Write your solution here.

class Solution {
    static encode(arr: string[]): string {
        let out = "";
        for (const s of arr) {
            out += `${s.length}#${s}`;
        }
        console.log(out);
        return out;
    }

    static decode(str: string): string[] {
        const out: string[] = [];
        let chunkLength = 0;
        let chunk = "";
        for (let i of str) {
            // New chunk
            if (i === "#" && chunkLength === 0) {
                chunkLength = Number(chunk);
                chunk = "";
                // Edge case: new chunk length is zero
                if (chunkLength === 0) {
                    out.push(chunk);
                }
            } else if (chunkLength > 0) {
                // build chunk
                chunk += i;
                chunkLength--;
                if (chunkLength === 0) {
                    // Push complete chunk to output
                    out.push(chunk);
                    chunk = "";
                }
            } else {
                // build chunk length
                chunk += i;
            }
        }
        return out;
    }
}
const input1 = ["hello", "world", "!"];
const input2 = ["", "", "!"];
const input3 = ["Hi", "", "!"];
const input4 = ["#"];

console.log(Solution.decode(Solution.encode(input1)));
console.log(Solution.decode(Solution.encode(input2)));
console.log(Solution.decode(Solution.encode(input3)));
console.log(Solution.decode(Solution.encode(input4)));
