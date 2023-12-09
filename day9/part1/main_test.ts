import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { nextValue, sumOfProjections } from "./main.ts";

const testInput = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

Deno.test("nextValue", () => {
  assertEquals(
    18,
    nextValue([
      0,
      3,
      6,
      9,
      12,
      15,
    ]),
  );
  assertEquals(
    28,
    nextValue([
      1,
      3,
      6,
      10,
      15,
      21,
    ]),
  );
  assertEquals(
    68,
    nextValue([
      10,
      13,
      16,
      21,
      30,
      45,
    ]),
  );
});

Deno.test("sumOfProjections", () => {
  assertEquals(114, sumOfProjections(testInput));
});
