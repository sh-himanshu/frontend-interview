/*
Title: Two Sum
Category: Arrays & Hashing
Difficulty: Easy
LeetCode: https://leetcode.com/problems/two-sum/
NeetCode: https://neetcode.io/problems/two-integer-sum?list=neetcode150
Status: Not Started

Notes:
- 

Complexity:
- Time: O()
- Space: O()
*/

// Write your solution here.
function twoSum(nums: number[], target: number): number[] {
    // nums = [2,7,11,15], target = 9
    const mp: Map<number, number> = new Map();
    for (let i = 0; i < nums.length; i++) {
        const n = target - nums[i];
        if (mp.has(n)) return [i, mp.get(n)!];
        mp.set(nums[i], i);
    }
    return [];
}

console.log(twoSum([2, 7, 11, 15], 9));
