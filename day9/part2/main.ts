// AOC23 D9P2
// https://adventofcode.com/2023/day/9#part2

export function previousValue(sequence: number[]): number {
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
    const newVal = rows[i - 1][0] - rows[i][0];
    rows[i - 1].unshift(newVal);
  }

  return rows[0][0];
}

export function sumOfRejections(str: string): number {
  return str.trim()
    .split("\n")
    .map((l) => l.trim().split(" ").map((numStr) => Number.parseInt(numStr)))
    .map((lineHistory) => previousValue(lineHistory))
    .reduce((acc, value) => acc + value, 0);
}

if (import.meta.main) {
  console.log(sumOfRejections(await Deno.readTextFile(Deno.args[0])));
}
