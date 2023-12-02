import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import {
  minimalSet,
  numBlocks,
  parseGame,
  parseGrab,
  sumMinimalCubeSetPow,
} from "./main.ts";

Deno.test("parseGame", () => {
  assertEquals({
    id: 1,
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
    minimalSet: {
      red: 4,
      green: 2,
      blue: 6,
    },
  }, parseGame("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"));
});

Deno.test("minimalSet", () => {
  assertEquals(
    {
      red: 4,
      green: 2,
      blue: 6,
    },
    minimalSet([
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
    ]),
  );
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

Deno.test("sumMinimalCubeSetPow", async () => {
  assertEquals(2286, await sumMinimalCubeSetPow("input-test.txt"));
});
