// USE LOOP O(n)
function sum_to_n_a(n: number) {
  var sum = 0;
  for (var i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// USE FORMULA O(1)
function sum_to_n_b(n: number) {
  return (n * (n + 1)) / 2;
}

// USE RECURSION O(n)
function sum_to_n_c(n: number): number {
  if (n == 1) {
    return 1;
  }
  return n + sum_to_n_c(n - 1);
}