function composePipeline(fns) {
    //Code Here
    return function(value) {
        let result = value;
        for (let i = 0; i < fns.length; i++) {
            result = fns[i](result);
        }
        return result;
    };
}

// Test Code
const add2 = x => x + 2;
const sqr = x => x * x;
const half = x => x / 2;
const pipeline = composePipeline([add2, sqr, half]);
console.log(pipeline(4));


