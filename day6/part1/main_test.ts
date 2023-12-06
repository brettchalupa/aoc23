import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { numberOfWaysToBeatEachRecord, waysToBeatRecord } from "./main.ts";

const testInput = `
Time:      7  15   30
Distance:  9  40  200
`;

Deno.test("waysToBeatRecord", () => {
  assertEquals(4, waysToBeatRecord({ time: 7, distance: 9 }));
  assertEquals(8, waysToBeatRecord({ time: 15, distance: 40 }));
  assertEquals(9, waysToBeatRecord({ time: 30, distance: 200 }));
});

Deno.test("numberOfWaysToBeatEachRecord", () => {
  assertEquals(288, numberOfWaysToBeatEachRecord(testInput));
});
