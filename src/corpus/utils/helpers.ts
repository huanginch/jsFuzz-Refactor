export const rand = (n: number): number => {
  return Math.floor(Math.random() * Math.floor(n));
}

export const chooseLen = (n: number): number => {
  const x = rand(100);
  if (x < 90) {
    return rand(Math.min(8, n)) + 1
  } else if (x < 99) {
    return rand(Math.min(32, n)) + 1
  } else {
    return rand(n) + 1;
  }
}

export const randBool = (): boolean => {
  return Math.random() >= 0.5;
}