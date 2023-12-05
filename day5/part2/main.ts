// AOC23 D5P2
// https://adventofcode.com/2023/day/5
// Answer: 11554135
// time to run: 10m38s

export interface Map {
  name: string;
  lines: MapLine[];
}

export interface SeedRange {
  start: number;
  rangeLength: number;
}

export interface MapLine {
  destinationRangeStart: number;
  sourceRangeStart: number;
  rangeLength: number;
}

export function strToMap(str: string): Map {
  const splitMap = str.trim().split("\n");
  return {
    name: splitMap[0].replace(" map:", ""),
    lines: splitMap.slice(1).map((str) => strToMapLine(str)),
  };
}

/**
 * Returns the destination number for the source number based on the map
 */
export function destination(map: Map, source: number): number {
  let destination: number = source;

  map.lines.forEach((line: MapLine) => {
    if (
      source >= line.sourceRangeStart &&
      source < line.sourceRangeStart + line.rangeLength
    ) {
      const diff = source - line.sourceRangeStart;
      destination = line.destinationRangeStart + diff;
    }
  });

  return destination;
}

export function strToMapLine(str: string): MapLine {
  const nums = str
    .trim()
    .split(" ")
    .filter((s) => s.trim() !== "");
  const destinationRangeStart = Number.parseInt(nums[0]);
  const sourceRangeStart = Number.parseInt(nums[1]);
  const rangeLength = Number.parseInt(nums[2]);

  return {
    destinationRangeStart: destinationRangeStart,
    sourceRangeStart: sourceRangeStart,
    rangeLength: rangeLength,
  };
}

export function parseSeeds(almanac: string): SeedRange[] {
  const numbers = almanac
    .trim()
    .split("\n")[0]
    .split(":")[1]
    .split(" ")
    .filter((str) => str.trim() !== "")
    .map((str) => Number.parseInt(str));

  const seeds: SeedRange[] = [];

  for (let i = 0; i < numbers.length; i++) {
    if (i % 2 === 0) {
      seeds.push({
        start: numbers[i],
        rangeLength: numbers[i + 1],
      });
    }
  }

  return seeds;
}

/**
 * Returns the final destination in the almanac for a given input seed number
 */
function finalDestination(almanac: Map[], seed: number) {
  return almanac.reduce(
    (newSource: number, map: Map) => destination(map, newSource),
    seed,
  );
}

export function lowestLocationNumberForAnySeed(str: string): number {
  const almanacStr = str.trim();
  const seedRanges: SeedRange[] = parseSeeds(almanacStr);
  const almanac = almanacStr
    .split("\n\n")
    .slice(1)
    .map((str) => strToMap(str));

  let lowestDestination = -1;

  for (const seedRange of seedRanges) {
    for (
      let seedNum = seedRange.start;
      seedNum < seedRange.start + seedRange.rangeLength - 1;
      seedNum++
    ) {
      const dest = finalDestination(almanac, seedNum);
      if (dest < lowestDestination || lowestDestination === -1) {
        lowestDestination = dest;
      }
    }
  }
  return lowestDestination;
}

if (import.meta.main) {
  console.log(
    lowestLocationNumberForAnySeed(await Deno.readTextFile(Deno.args[0])),
  );
}
