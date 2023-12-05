import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";

import {
  destination,
  lowestLocationNumberForAnySeed,
  parseSeeds,
  strToMap,
  strToMapLine,
} from "./main.ts";

const testInput = `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`;

Deno.test("strToMapLine", () => {
  assertEquals(
    {
      destinationRangeStart: 50,
      sourceRangeStart: 98,
      rangeLength: 2,
    },
    strToMapLine(`50 98 2`),
  );
});

Deno.test("parseSeeds", () => {
  assertEquals(
    [{ start: 79, rangeLength: 14 }, { start: 55, rangeLength: 13 }],
    parseSeeds(testInput),
  );
});

Deno.test("strToMap", () => {
  const str = `seed-to-soil map:
50 98 2
52 50 3`;
  assertEquals(
    {
      name: "seed-to-soil",
      lines: [
        {
          rangeLength: 2,
          sourceRangeStart: 98,
          destinationRangeStart: 50,
        },
        {
          rangeLength: 3,
          sourceRangeStart: 50,
          destinationRangeStart: 52,
        },
      ],
    },
    strToMap(str),
  );
});

Deno.test("mapNum", () => {
  const mapStr = `seed-to-soil map:
50 98 2
52 50 48`;
  const map = strToMap(mapStr);
  assertEquals(0, destination(map, 0));
  assertEquals(1, destination(map, 1));
  assertEquals(13, destination(map, 13));
  assertEquals(14, destination(map, 14));
  assertEquals(48, destination(map, 48));
  assertEquals(49, destination(map, 49));
  assertEquals(52, destination(map, 50));
  assertEquals(53, destination(map, 51));
  assertEquals(57, destination(map, 55));
  assertEquals(81, destination(map, 79));
  assertEquals(98, destination(map, 96));
  assertEquals(99, destination(map, 97));
  assertEquals(50, destination(map, 98));
  assertEquals(51, destination(map, 99));
});

Deno.test("lowestLocationNumberForAnySeed", () => {
  assertEquals(46, lowestLocationNumberForAnySeed(testInput));
});
