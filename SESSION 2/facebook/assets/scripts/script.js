const firstSymbol = Symbol('first');
const secondSymbol = Symbol('first');


console.log(firstSymbol === secondSymbol);

const stringFromSymbol = firstSymbol.toString();

console.log(stringFromSymbol);
