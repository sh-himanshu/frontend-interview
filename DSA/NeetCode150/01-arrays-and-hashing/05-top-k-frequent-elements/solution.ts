/*
Title: Top K Frequent Elements
Category: Arrays & Hashing
Difficulty: Medium
LeetCode: https://leetcode.com/problems/top-k-frequent-elements/
NeetCode: https://neetcode.io/problems/top-k-elements-in-list?list=neetcode150
Status: Not Started

Notes:
- 

Complexity:
- Time: O()
- Space: O()
*/

// Write your solution here.
function topKFrequent(nums: number[], k: number): number[] {
    const freq: Map<number, number> = new Map();

    // count frequency
    for (const n of nums) {
        freq.set(n, (freq.get(n) || 0) + 1);
    }

    // bucket array
    const bucket: number[][] = new Array(nums.length + 1);
    for (let i = 0; i < bucket.length; i++) bucket[i] = [];

    for (const [num, f] of freq.entries()) {
        bucket[f].push(num);
    }

    const res: number[] = [];

    // iterate from highest frequency
    for (let i = bucket.length - 1; i >= 0 && res.length < k; i--) {
        for (const n of bucket[i]) {
            res.push(n);
            if (res.length === k) return res;
        }
    }

    return res;
}

// Input: nums = [1,2,1,2,1,2,3,1,3,2], k = 2

topKFrequent([1, 2, 1, 2, 1, 2, 3, 1, 3, 2, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 4], 2);
