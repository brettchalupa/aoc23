import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { sumOfPartNumbers } from "./main.ts";

const TestSchematic = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......7555
...$.*....
.664.598..
`;

Deno.test("sumOfPartNumbers", () => {
  assertEquals(11161, sumOfPartNumbers(TestSchematic));
});
