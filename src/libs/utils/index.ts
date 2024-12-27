/**
 * Create a range iterator from start to end
 */
export function range(start: number, end: number) {
  return Array.from({ length: end - start }, (_, i) => i);
}

/**
 * Repeat character, ch, n times. Defaults to 2.
 */
export function repeatChar(ch: string, n: number = 2): string {
  let repeated = ch;

  for (const _ of range(0, n - 1)) {
    repeated += ch;
  }

  return repeated;
}
