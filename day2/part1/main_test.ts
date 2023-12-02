import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import {
  numBlocks,
  parseGame,
  parseGrab,
  possible,
  sumPossibleGameIds,
} from "./main.ts";
import { assert } from "https://deno.land/std@0.208.0/assert/assert.ts";

Deno.test("parseGame", () => {
  assertEquals({
    id: 1,
    possible: true,
    grabs: [
      {
        red: 4,
        green: 0,
        blue: 3,
      },
      {
        red: 1,
        green: 2,
        blue: 6,
      },
      {
        red: 0,
        green: 2,
        blue: 0,
      },
    ],
  }, parseGame("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"));
});

Deno.test("parseGrab", () => {
  assertEquals({ blue: 3, red: 4, green: 0 }, parseGrab("3 blue, 4 red"));
  assertEquals(
    { red: 1, green: 2, blue: 6 },
    parseGrab("1 red, 2 green, 6 blue"),
  );
  assertEquals({ red: 0, green: 2, blue: 0 }, parseGrab("2 green"));
});

Deno.test("numBlocks", () => {
  assertEquals(3, numBlocks("blue", "3 blue"));
  assertEquals(0, numBlocks("green", "3 blue"));
  assertEquals(1, numBlocks("red", "3 blue, 1 red"));
});

Deno.test("possible", () => {
  assert(possible({ red: 0, green: 2, blue: 0 }));
  assert(possible({ red: 12, green: 13, blue: 14 }));
  assert(!possible({ red: 13, green: 2, blue: 0 }));
  assert(!possible({ red: 1, green: 14, blue: 3 }));
  assert(!possible({ red: 1, green: 10, blue: 15 }));
});

Deno.test("sumPossibleGameIds", async () => {
  assertEquals(8, await sumPossibleGameIds("input-test.txt"));
});
