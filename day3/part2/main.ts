// AOC23 D3P2
// https://adventofcode.com/2023/day/3#part2
// answer: 84883664

interface PartNumber {
  number: number;
  digits: NumberDigit[];
  neighborSymbols: Symbol[];
}

interface Symbol {
  x: number;
  y: number;
  char: string;
}

interface NumberDigit {
  x: number;
  y: number;
  number: string;
}

interface Gear {
  x: number;
  y: number;
  neighborNumbers: PartNumber[];
}

const GearChar = "*";

/**
 * Returns the element of the 2D array at the specificed index coordinate, returns `undefined` if the position does not exist
 */
function symbolAtPos(
  arr: string[][],
  x: number,
  y: number,
): Symbol | undefined {
  try {
    return { char: arr[y][x], x: x, y: y };
  } catch (_err) {
    return undefined;
  }
}

function pushIfNeighborSymbol(
  symbols: Symbol[],
  symbol: Symbol | undefined,
): Symbol[] {
  if (
    symbol !== undefined &&
    symbol.char !== undefined &&
    Number.isNaN(Number.parseInt(symbol.char)) &&
    symbol.char !== "."
  ) {
    if (!symbols.some((s) => s.x === symbol.x && s.y === symbol.y)) {
      symbols.push(symbol);
    }
  }

  return symbols;
}

function neighborSymbols(
  arr: string[][],
  numberDigits: NumberDigit[],
): Symbol[] {
  let symbols: Symbol[] = [];

  numberDigits.forEach((nd) => {
    // W
    symbols = pushIfNeighborSymbol(symbols, symbolAtPos(arr, nd.x - 1, nd.y));
    // NW
    symbols = pushIfNeighborSymbol(
      symbols,
      symbolAtPos(arr, nd.x - 1, nd.y - 1),
    );
    // N
    symbols = pushIfNeighborSymbol(symbols, symbolAtPos(arr, nd.x, nd.y - 1));
    // NE
    symbols = pushIfNeighborSymbol(
      symbols,
      symbolAtPos(arr, nd.x + 1, nd.y - 1),
    );
    // E
    symbols = pushIfNeighborSymbol(symbols, symbolAtPos(arr, nd.x + 1, nd.y));
    // SE
    symbols = pushIfNeighborSymbol(
      symbols,
      symbolAtPos(arr, nd.x + 1, nd.y + 1),
    );
    // S
    symbols = pushIfNeighborSymbol(symbols, symbolAtPos(arr, nd.x, nd.y + 1));
    // SW
    symbols = pushIfNeighborSymbol(
      symbols,
      symbolAtPos(arr, nd.x - 1, nd.y + 1),
    );
  });

  return symbols;
}

export function sumOfGearRatios(schematic: string) {
  const lines = schematic.trim().split("\n");
  const partNumbers = lines
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
                digits: numberDigits,
                neighborSymbols: neighborSymbols(arr, numberDigits),
              },
            );
            numberDigits = [];
          }
        }
      });

      return pns;
    });

  const gears: Gear[] = [];
  partNumbers.forEach((pn) => {
    pn.neighborSymbols.forEach((s) => {
      if (s.char === GearChar) {
        const gear = gears.find((g) => g.x === s.x && g.y === s.y);
        if (gear) {
          gear.neighborNumbers = [
            ...gear.neighborNumbers,
            pn,
          ];
        } else {
          gears.push({
            x: s.x,
            y: s.y,
            neighborNumbers: [pn],
          });
        }
      }
    });
  });
  return gears
    .filter((gear: Gear) => gear.neighborNumbers.length === 2)
    .reduce(
      (accumulator: number, gear: Gear) =>
        accumulator + gear.neighborNumbers.reduce((a, n) => a * n.number, 1),
      0,
    );
}

if (import.meta.main) {
  console.log(sumOfGearRatios(await Deno.readTextFile(Deno.args[0])));
}
