import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { stepsToFurthestPoint } from "./main.ts";

Deno.test("stepsToFurthestPoint", () => {
  // const testInput1 = `.....
  // .S-7.
  // .|.|.
  // .L-J.
  // .....`;
  const testInput1 = `-L|F7
7S-7|
L|7||
-L-J|
L|-JF;`;

  assertEquals(4, stepsToFurthestPoint(testInput1));

  const testInput2 = `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`;

  // const testInput2 = `..F7.
  // .FJ|.
  // SJ.L7
  // |F--J
  // LJ...`;

  assertEquals(8, stepsToFurthestPoint(testInput2));
});
