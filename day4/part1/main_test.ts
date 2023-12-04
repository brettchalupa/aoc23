import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { scoreCard, strToCard, sumOfScratchCards } from "./main.ts";

const testInput = `
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`;

Deno.test("strToCard", () => {
  assertEquals(
    {
      cardNumber: 1,
      yourNumbers: [6, 9, 17, 31, 48, 53, 83, 86],
      winningNumbers: [17, 41, 48, 83, 86],
      matches: [17, 48, 83, 86],
    },
    strToCard(`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53`),
  );
  assertEquals(
    {
      cardNumber: 6,
      winningNumbers: [13, 18, 31, 56, 72],
      yourNumbers: [10, 11, 23, 35, 36, 67, 74, 77],
      matches: [],
    },
    strToCard(`Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`),
  );
});

Deno.test("scoreCard", () => {
  assertEquals(
    8,
    scoreCard(strToCard(`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53`)),
  );
  assertEquals(
    2,
    scoreCard(strToCard(`Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19`)),
  );
  assertEquals(
    2,
    scoreCard(strToCard(`Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1`)),
  );
  assertEquals(
    1,
    scoreCard(strToCard(`Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83`)),
  );
  assertEquals(
    0,
    scoreCard(strToCard(`Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36`)),
  );
  assertEquals(
    0,
    scoreCard(strToCard(`Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`)),
  );
});

Deno.test("sumOfScratchCards", () => {
  assertEquals(13, sumOfScratchCards(testInput));
});
