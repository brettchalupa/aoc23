// AOC23 D2P1
// https://adventofcode.com/2023/day/2
// answer: 2720

interface Grab {
  red: number;
  green: number;
  blue: number;
}

interface Game {
  id: number;
  possible: boolean;
  grabs: Grab[];
}

const MaxPossibleGrab: Grab = {
  red: 12,
  green: 13,
  blue: 14,
};

// The Elf would first like to know which games would have been possible if the bag contained only 12 red cubes, 13 green cubes, and 14 blue cubes?
export function possible(grab: Grab): boolean {
  return grab.red <= MaxPossibleGrab.red &&
    grab.green <= MaxPossibleGrab.green &&
    grab.blue <= MaxPossibleGrab.blue;
}

export function numBlocks(color: string, str: string): number {
  const match = str.match(new RegExp(`(\\d+) ${color}`));
  if (match && match[1]) {
    return Number.parseInt(match[1]);
  } else {
    return 0;
  }
}

export function parseGrab(str: string): Grab {
  return {
    red: numBlocks("red", str),
    green: numBlocks("green", str),
    blue: numBlocks("blue", str),
  };
}

export function parseGame(str: string): Game {
  const split = str.split(":");
  const grabs: Grab[] = split[1]
    .split(";")
    .map((g) => g.trim())
    .map((g) => parseGrab(g));

  return {
    id: Number.parseInt(split[0].match(/\d+/)![0]),
    possible: grabs.every(possible),
    grabs: grabs,
  };
}

export async function sumPossibleGameIds(path: string): Promise<number> {
  const contents = await Deno.readTextFile(path);
  return contents
    .trim()
    .split("\n")
    .map((l) => parseGame(l))
    .filter((g) => g.possible)
    .reduce(
      (accumulator: number, currentGame: Game) => accumulator + currentGame.id,
      0,
    );
}
if (import.meta.main) {
  console.log(await sumPossibleGameIds(Deno.args[0]));
}
