export function removeBytes(res: Buffer): Buffer {
  if (res.length <= 1) {
    return res;
  }
  const pos0 = this.rand(res.length);
  const pos1 = pos0 + this.chooseLen(res.length - pos0);
  res.copy(res, pos0, pos1, res.length);
  res = res.slice(0, res.length - (pos1 - pos0));
}