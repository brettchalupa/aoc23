import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { stepsToReachEnd } from "./main.ts";

const testInput = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

Deno.test("stepsToReachEnd", () => {
  assertEquals(6, stepsToReachEnd(testInput));
});
