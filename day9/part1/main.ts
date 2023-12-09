// AOC23 D9P1
// https://adventofcode.com/2023/day/9

export function nextValue(sequence: number[]): number {
  const rows: number[][] = [sequence];
  let whittlingRows = true;
  let rowIndex = 0;

  while (whittlingRows) {
    const row = rows[rowIndex];
    const differences: number[] = [];

    for (let i = 1; i < row.length; i++) {
      differences.push(row[i] - row[i - 1]);
    }

    if (differences.reduce((acc, num) => acc + num, 0) === 0) {
      whittlingRows = false;
    } else {
      rows.push(differences);
      rowIndex++;
    }
  }

  for (let i = rows.length - 1; i > 0; i--) {
    const newVal = lastEl(rows[i]) + lastEl(rows[i - 1]);
    rows[i - 1].push(newVal);
  }

  return lastEl(rows[0]);
}

function lastEl<T>(arr: T[]): T {
  return arr[arr.length - 1];
}

export function sumOfProjections(str: string): number {
  return str.trim()
    .split("\n")
    .map((l) => l.trim().split(" ").map((numStr) => Number.parseInt(numStr)))
    .map((lineHistory) => nextValue(lineHistory))
    .reduce((acc, value) => acc + value, 0);
}

if (import.meta.main) {
  console.log(sumOfProjections(await Deno.readTextFile(Deno.args[0])));
}
