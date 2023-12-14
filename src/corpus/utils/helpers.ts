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

export const toAscii = (buf: Buffer): void => {
  let x;
  for (let i = 0; i < buf.length; i++) {
    x = buf[i] & 127;
    if ((x < 0x20 || x > 0x7E) && x !== 0x09 && (x < 0xA || x > 0xD)) {
      buf[i] = 0x20;
    }
  }
}