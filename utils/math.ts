
// Memoized factorial for performance
const factorialCache: { [key: number]: number } = {};

export function factorial(n: number): number {
  if (n < 0) {
    return NaN; // Or throw an error
  }
  if (n === 0) {
    return 1;
  }
  if (factorialCache[n]) {
    return factorialCache[n];
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  factorialCache[n] = result;
  return result;
}

export function combinations(n: number, k: number): number {
  if (k < 0 || k > n) {
    return 0;
  }
  if (k === 0 || k === n) {
    return 1;
  }
  if (k > n / 2) {
    k = n - k;
  }
  
  let res = 1;
  for (let i = 1; i <= k; i++) {
    res = (res * (n - i + 1)) / i;
  }
  
  return res;
}
