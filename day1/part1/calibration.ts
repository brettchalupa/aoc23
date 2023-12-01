// run with:
// deno run --allow-read calibration.ts input.txt
// Solution: 54940
// https://adventofcode.com/2023/day/1

export function calibration(str: string): number {
  const nums = Array.from(str)
    .filter((c) => Number.parseInt(c));
  return Number.parseInt(`${nums[0]}${nums.slice(-1)}`);
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
