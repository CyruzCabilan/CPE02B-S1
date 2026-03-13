function sumDeepStrictNumbers(arr) {
    let sum = 0;

    if (!Array.isArray(arr)) return 0; 
    for (let i = 0; i < arr.length; i++) {
        const value = arr[i];
        if (Array.isArray(value)) {
            sum += sumDeepStrictNumbers(value);
        } else if (typeof value === 'number' && Number.isFinite(value)) {
            sum += value;
        }
    }

    return sum;
}

// Test Code
const testArray1 = [10, ['5', [true, 5]], null, [undefined, [10, NaN]]];
console.log(sumDeepStrictNumbers(testArray1));

