// AOC23 D2P2
// https://adventofcode.com/2023/day/2#part2
// answer: 71535

interface CubeSet {
  red: number;
  green: number;
  blue: number;
}

interface Game {
  id: number;
  grabs: CubeSet[];
  minimalSet: CubeSet;
}

export function cubeSetPow(grab: CubeSet): number {
  return grab.red * grab.green * grab.blue;
}

export function numBlocks(color: string, str: string): number {
  const match = str.match(new RegExp(`(\\d+) ${color}`));
  if (match && match[1]) {
    return Number.parseInt(match[1]);
  } else {
    return 0;
  }
}

export function parseGrab(str: string): CubeSet {
  return {
    red: numBlocks("red", str),
    green: numBlocks("green", str),
    blue: numBlocks("blue", str),
  };
}

export function parseGame(str: string): Game {
  const split = str.split(":");
  const grabs: CubeSet[] = split[1]
    .split(";")
    .map((g) => g.trim())
    .map((g) => parseGrab(g));

  return {
    id: Number.parseInt(split[0].match(/\d+/)![0]),
    grabs: grabs,
    minimalSet: minimalSet(grabs),
  };
}

export function minimalSet(grabs: CubeSet[]): CubeSet {
  const min = {
    red: 0,
    green: 0,
    blue: 0,
  };

  grabs.forEach((g) => {
    if (g.red > min.red) {
      min.red = g.red;
    }
    if (g.green > min.green) {
      min.green = g.green;
    }
    if (g.blue > min.blue) {
      min.blue = g.blue;
    }
  });

  return min;
}

export async function sumMinimalCubeSetPow(path: string): Promise<number> {
  const contents = await Deno.readTextFile(path);
  return contents
    .trim()
    .split("\n")
    .map((l) => parseGame(l))
    .map((g) => cubeSetPow(g.minimalSet))
    .reduce(
      (accumulator: number, pow: number) => accumulator + pow,
      0,
    );
}
if (import.meta.main) {
  console.log(await sumMinimalCubeSetPow(Deno.args[0]));
}
