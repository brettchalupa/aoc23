import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { rankDeals, totalWinnings, Type, typeFromHand } from "./main.ts";

const testInput = `
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`;

Deno.test("typeFromHand", () => {
  assertEquals(Type.HighCard, typeFromHand("12345"));
  assertEquals(Type.OnePair, typeFromHand("32T3K"));
  assertEquals(Type.TwoPair, typeFromHand("KK677"));
  assertEquals(Type.TwoPair, typeFromHand("KTJJT"));
  assertEquals(Type.ThreeOfAKind, typeFromHand("T55J5"));
  assertEquals(Type.ThreeOfAKind, typeFromHand("QQQJA"));
  assertEquals(Type.FullHouse, typeFromHand("23332"));
  assertEquals(Type.FourOfAKind, typeFromHand("33323"));
  assertEquals(Type.FiveOfAKind, typeFromHand("AAAAA"));
});

Deno.test("rankDeals", () => {
  assertEquals(
    [
      {
        hand: "32T3K",
        bid: 765,
        rank: 1,
        type: Type.OnePair,
      },
      {
        hand: "T55J5",
        bid: 684,
        rank: 2,
        type: Type.ThreeOfAKind,
      },
    ],
    rankDeals([{
      hand: "T55J5",
      bid: 684,
      rank: 1,
      type: Type.ThreeOfAKind,
    }, {
      hand: "32T3K",
      bid: 765,
      rank: 1,
      type: Type.OnePair,
    }]),
  );

  assertEquals(
    [
      {
        hand: "32T3K",
        bid: 765,
        rank: 1,
        type: Type.OnePair,
      },
      {
        hand: "4543A",
        bid: 684,
        rank: 2,
        type: Type.OnePair,
      },
      {
        hand: "4563A",
        bid: 684,
        rank: 3,
        type: Type.OnePair,
      },
    ],
    rankDeals([
      {
        hand: "4563A",
        bid: 684,
        rank: 1,
        type: Type.OnePair,
      },
      {
        hand: "4543A",
        bid: 684,
        rank: 1,
        type: Type.OnePair,
      },
      {
        hand: "32T3K",
        bid: 765,
        rank: 1,
        type: Type.OnePair,
      },
    ]),
  );
});

Deno.test("totalWinnings", () => {
  assertEquals(6440, totalWinnings(testInput));
});
