/*
Title: Group Anagrams
Category: Arrays & Hashing
Difficulty: Medium
LeetCode: https://leetcode.com/prob/list/combinedlems/group-anagrams/
NeetCode: https://neetcode.io/problems/anagram-groups?list=neetcode150
Status: Not Started

Notes:
- 

Complexity:
- Time: O()
- Space: O()
*/

// Write your solution here.

// Input: strs = ["eat","tea","tan","ate","nat","bat"]

// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

const isValidAnagram = (str1: string, str2: string): boolean => {
    if (str1.length !== str2.length) return false;
    if (!str1 || !str2) {
        return str1 === str2;
    }
    const arr = new Array(26).fill(0);
    const diff = "a".charCodeAt(0);
    for (let i = 0; i < str1.length; i++) {
        const a = str1.charCodeAt(i);
        const b = str2.charCodeAt(i);
        arr[a - diff]++;
        arr[b - diff]--;
    }
    return arr.every((item) => item === 0);
};

const getUniqueKey = (str: string) => {
    const arr: number[] = new Array(26).fill(0);
    const diff = "a".charCodeAt(0);
    for (let i = 0; i < str.length; i++) {
        arr[str.charCodeAt(i) - diff]++;
    }
    return arr.join();
};

function groupAnagrams(strs: string[]): string[][] {
    const mp = new Map();

    for (const i of strs) {
        const key = getUniqueKey(i);
        if (mp.has(key)) {
            mp.set(key, [...mp.get(key), i]);
        } else {
            mp.set(key, [i]);
        }
    }

    return Array.from(mp.values());
}

console.log(groupAnagrams(["bdddddddddd", "bbbbbbbbbbc"]));
console.log(groupAnagrams(["", "abcd"]));
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
