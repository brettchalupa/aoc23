// AOC23 D3P1
// https://adventofcode.com/2023/day/3
// answer: 537732
//
// notes:
// - Number.parseInt(n) can't be used to check as a boolean, as `0` evals to false, need to use Number.isNaN(n)
// - if the final pos in a row is a number, gotta make sure to include it
//
// wrong answer: 442321 --- too low
// wrong answer: 439483 --- too low
// wrong answer: 536884 --- too low

interface PartNumber {
  number: number;
  neighborSymbols: string[];
}

interface NumberDigit {
  x: number;
  y: number;
  number: string;
}

/**
 * Returns the element of the 2D array at the specificed index coordinate, returns `undefined` if the position does not exist
 */
function atPos(arr: string[][], x: number, y: number): string | undefined {
  try {
    return arr[y][x];
  } catch (_err) {
    return undefined;
  }
}

export function sumOfPartNumbers(schematic: string) {
  const lines = schematic.trim().split("\n");
  return lines
    .map((l) => Array.from(l))
    .flatMap((line, y, arr) => {
      const chars = Array.from(line);
      let numberDigits: NumberDigit[] = [];
      const pns: PartNumber[] = [];
      chars.forEach((c: string, x: number) => {
        const num = Number.parseInt(c);
        if (!Number.isNaN(num)) {
          numberDigits.push({
            x: x,
            y: y,
            number: c,
          });
        }

        if (Number.isNaN(num) || x === line.length - 1) {
          if (numberDigits.length > 0) {
            pns.push(
              {
                number: Number.parseInt(
                  numberDigits.map((nd) => nd.number).join(""),
                ),
                neighborSymbols: numberDigits.flatMap((nd) => {
                  const neighbors: (string | undefined)[] = [];

                  // W
                  neighbors.push(atPos(arr, nd.x - 1, nd.y));
                  // NW
                  neighbors.push(atPos(arr, nd.x - 1, nd.y - 1));
                  // N
                  neighbors.push(atPos(arr, nd.x, nd.y - 1));
                  // NE
                  neighbors.push(atPos(arr, nd.x + 1, nd.y - 1));
                  // E
                  neighbors.push(atPos(arr, nd.x + 1, nd.y));
                  // SE
                  neighbors.push(atPos(arr, nd.x + 1, nd.y + 1));
                  // S
                  neighbors.push(atPos(arr, nd.x, nd.y + 1));
                  // SW
                  neighbors.push(atPos(arr, nd.x - 1, nd.y + 1));

                  return neighbors.filter((n) =>
                    n !== undefined && Number.isNaN(Number.parseInt(n)) &&
                    n !== "."
                  ) as string[];
                }),
              },
            );
            numberDigits = [];
          }
        }
      });

      return pns;
    })
    .filter((pn: PartNumber) => pn.neighborSymbols.length > 0)
    .reduce(
      (accumulator: number, pn: PartNumber) => accumulator + pn.number,
      0,
    );
}

if (import.meta.main) {
  console.log(sumOfPartNumbers(await Deno.readTextFile(Deno.args[0])));
}
