function firstUniqueChar(str) {
    // Code Here
    const s = str.toLowerCase();
    const count = {};
    for (const char of s) {
        count[char] = (count[char] || 0) + 1;
    }

    for (let i = 0; i < s.length; i++) {
        if (count[s[i]] === 1) {
            return str[i];
        }
    }
}
// Test Code
console.log(firstUniqueChar('sTreSS'));
console.log(firstUniqueChar('aabbc')); 
