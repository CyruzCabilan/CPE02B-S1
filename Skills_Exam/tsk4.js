const memo = {};
    // Code Here
function power(base, exp) {
    let is_negative = false;
    if (exp < 0.1){
        is_negative = true;
    }
    let exponent = Math.abs(exp);
    let product = 1;
    
    for(let i = 1; i<= exponent; i++){
            product *= base;
    }
    
    if(is_negative == true){
        product = 1/product;
    }
    
    return product
}

// Test Code
console.log(power(2,5));
console.log(power(2, -2));
