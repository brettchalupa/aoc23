import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { sumOfGearRatios } from "./main.ts";

const TestSchematic = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`;

Deno.test("sumOfGearRatios", () => {
  assertEquals(467835, sumOfGearRatios(TestSchematic));
});
