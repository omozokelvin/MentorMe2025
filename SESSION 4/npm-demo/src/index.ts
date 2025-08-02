const add = (...args: number[]) => args.reduce((a, b) => a + b, 0);

console.log(add(1, 2, 3, 4, 5, 6));
