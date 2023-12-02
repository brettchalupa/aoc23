// run with:
// deno run --allow-read calibration.ts input.txt
// Solution: 54208
// https://adventofcode.com/2023/day/1#part2

interface WordDigit {
  word: string;
  digit: number;
}

const WordDigits: WordDigit[] = [
  { word: "one", digit: 1 },
  { word: "two", digit: 2 },
  { word: "three", digit: 3 },
  { word: "four", digit: 4 },
  { word: "five", digit: 5 },
  { word: "six", digit: 6 },
  { word: "seven", digit: 7 },
  { word: "eight", digit: 8 },
  { word: "nine", digit: 9 },
];

export function firstDigit(str: string): number | undefined {
  for (const [i, c] of Array.from(str).entries()) {
    if (Number.parseInt(c)) {
      return Number.parseInt(c);
    }
    for (const wd of WordDigits) {
      if (str.slice(i).indexOf(wd.word) === 0) {
        return wd.digit;
      }
    }
  }

  return undefined;
}

export function lastDigit(str: string): number | undefined {
  const chars = Array.from(str);
  let reverseI = chars.length;

  while (reverseI > -1) {
    const c = chars[reverseI];

    if (Number.parseInt(c)) {
      return Number.parseInt(c);
    }
    for (const wd of WordDigits) {
      if (str.slice(reverseI).indexOf(wd.word) === 0) {
        return wd.digit;
      }
    }

    reverseI--;
  }

  return undefined;
}

export function calibration(str: string): number {
  return Number.parseInt(`${firstDigit(str)}${lastDigit(str)}`);
}

export async function sumDocumentCalibration(path: string): Promise<number> {
  const contents = await Deno.readTextFile(path);
  return contents
    .trim()
    .split("\n")
    .reduce(
      (accumulator: number, currentLine: string) =>
        accumulator + calibration(currentLine),
      0,
    );
}

if (import.meta.main) {
  console.log(await sumDocumentCalibration(Deno.args[0]));
}
