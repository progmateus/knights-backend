export const calcMod = (value: number): number => {
  if (value >= 0 && value <= 8) return -2;
  if (value >= 9 && value <= 10) return -1;
  if (value >= 11 && value <= 12) return 0;
  if (value >= 13 && value <= 15) return +1;
  if (value >= 16 && value <= 18) return +2;
  if (value >= 19 && value <= 20) return +3;

  return 0
}