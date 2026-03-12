/*
    Title: Find Kth Bit in Nth Binary String
    LC: https://leetcode.com/problems/find-kth-bit-in-nth-binary-string/description/
    Neercode: https://www.youtube.com/watch?v=h9DOEqeb_ZA&t=1108s


    s1 = 0 
    s2 = 011   
    s3 = 0111001 7.     
    s4 = 011100110110001   
*/

// Brute force
class Solution1 {
    static findKthBit(s: number, k: number): string {
        if (s === 1) {
            return "0";
        }

        let n: number = 1;
        let str: string = "0";

        while (n <= s) {
            let strLength = str.length;

            if (k <= strLength) {
                return str.charAt(k - 1);
            } else if (k === strLength + 1) {
                return "1";
            }

            let ri = this.reverseAndInvert(str);

            if (k <= 2 * strLength + 1) {
                return ri.charAt(k - strLength - 2);
            }

            str = str + "1" + ri;
            n++;
        }

        return "0";
    }

    private static reverseAndInvert(st: string): string {
        let ri = "";
        for (let i = st.length - 1; i >= 0; i--) {
            if (st.charAt(i) === "0") {
                ri += "1";
            } else {
                ri += "0";
            }
        }
        return ri;
    }
}

const n = 4,
    k = 12;
// const n = 4,
//     k = 11;

console.log(Solution1.findKthBit(n, k));
class Solution2 {
    static findKthBit(n: number, k: number): string {
        return this.solve(n, k);
    }

    static solve(n: number, k: number): string {
        // s1 =
        let length = Math.pow(2, n) - 1;
        let invert = false;

        while (true) {
            if (k === 1) return invert ? "1" : "0";

            const mid = Math.floor(length / 2) + 1;

            if (k === mid) return invert ? "0" : "1";

            if (k > mid) {
                k = length - k + 1;
                invert = !invert;
            }

            length = mid - 1;
        }
    }
}
console.log(Solution2.findKthBit(n, k));
