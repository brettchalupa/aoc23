import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { previousValue, sumOfRejections } from "./main.ts";

const testInput = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

Deno.test("previousValue", () => {
  assertEquals(
    -3,
    previousValue([
      0,
      3,
      6,
      9,
      12,
      15,
    ]),
  );
  assertEquals(
    0,
    previousValue([
      1,
      3,
      6,
      10,
      15,
      21,
    ]),
  );
  assertEquals(
    5,
    previousValue([
      10,
      13,
      16,
      21,
      30,
      45,
    ]),
  );
});

Deno.test("sumOfRejections", () => {
  assertEquals(2, sumOfRejections(testInput));
});
