// AOC23 D7P2
// https://adventofcode.com/2023/day/7#part2

/**
 * Each hand can only have one type. The higher the enum value, the higher the strength
 */
export enum Type {
  HighCard = 0,
  OnePair,
  TwoPair,
  ThreeOfAKind,
  FullHouse,
  FourOfAKind,
  FiveOfAKind,
}

const Joker = "J";

/**
 * Valid cards sorted in order from lowest strength to highest strength
 */
const Cards: string[] = [
  Joker,
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];

export interface Deal {
  hand: string;
  bid: number;
  rank: number;
  type: Type;
}

function occurrences(arr: string[], value: string): number {
  return arr.filter((v) => v === value).length;
}

export function typeFromHand(hand: string): Type {
  let cards = hand.split("");

  // Jokers are wildcards that can act like whatever card would make the hand the strongest type possible
  if (hand.includes(Joker)) {
    const counter: Record<string, number> = {};

    for (const card of cards) {
      if (counter[card]) {
        counter[card] += 1;
      } else {
        counter[card] = 1;
      }
    }

    // const jokerCount = counter[Joker];
    const nonJokers = cards.filter((c) => c !== Joker)
      .sort((a, b) => counter[a] - counter[b]);
    cards = cards.map((c) => {
      if (c === Joker) {
        return nonJokers.slice(-1)[0];
      } else {
        return c;
      }
    });
  }

  const uniqCards = Array.from(new Set(cards));

  if (uniqCards.length === 4) {
    return Type.OnePair;
  }

  if (uniqCards.length === 3) {
    if (
      occurrences(cards, uniqCards[0]) === 3 ||
      occurrences(cards, uniqCards[1]) === 3 ||
      occurrences(cards, uniqCards[2]) === 3
    ) {
      return Type.ThreeOfAKind;
    } else {
      return Type.TwoPair;
    }
  }

  if (uniqCards.length === 2) {
    if (
      occurrences(cards, uniqCards[0]) === 4 ||
      occurrences(cards, uniqCards[1]) === 4
    ) {
      return Type.FourOfAKind;
    }

    if (
      occurrences(cards, uniqCards[0]) === 3 ||
      occurrences(cards, uniqCards[1]) === 3
    ) {
      return Type.FullHouse;
    }
  }

  if (uniqCards.length === 1) {
    return Type.FiveOfAKind;
  }

  return Type.HighCard;
}

/**
 * Sets the rank of a Deal based on those in the array,
 * sorts the array from lowest to highest rank based on type,
 * and returns the array.
 *
 * If two deals have the same type strength, then the order is determined by hand order strength.
 */
export function rankDeals(deals: Deal[]): Deal[] {
  deals = deals.sort((a, b) => {
    if (a.type === b.type) {
      const aCards = a.hand.split("");
      const bCards = b.hand.split("");

      for (let i = 0; i < aCards.length; i++) {
        if (Cards.indexOf(aCards[i]) > Cards.indexOf(bCards[i])) {
          return 1;
        } else if (Cards.indexOf(aCards[i]) < Cards.indexOf(bCards[i])) {
          return -1;
        }
      }

      return 0;
    } else {
      return a.type - b.type;
    }
  });

  for (let i = 0; i < deals.length; i++) {
    deals[i].rank = i + 1;
  }

  return deals;
}

export function totalWinnings(str: string): number {
  let deals: Deal[] = str.trim().split("\n")
    .map((line) => {
      const parts = line.split(" ")
        .map((str) => str.trim()).filter((str) => str !== "");
      const hand = parts[0];
      return {
        hand: hand,
        type: typeFromHand(hand),
        bid: Number.parseInt(parts[1]),
        rank: 1,
      };
    });

  deals = rankDeals(deals);

  return deals.reduce((acc, deal) => (deal.bid * deal.rank) + acc, 0);
}

if (import.meta.main) {
  console.log(
    totalWinnings(await Deno.readTextFile(Deno.args[0])),
  );
}
