function fibonacciMemo(n, memo = {}) {
  // Check if the result is already in the cache
  if (n in memo) {
    return memo[n];
  }

  // Base case
  if (n <= 1) {
    return n;
  }

  // Calculate and store the result in the cache
  memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);

  return memo[n];
}

// Example usage

console.time();
console.log(fibonacciMemo(1000));
console.timeEnd();
