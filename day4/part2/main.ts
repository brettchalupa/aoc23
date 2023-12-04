// AOC23 D4P1
// https://adventofcode.com/2023/day/4#part2
// Answer: 13261850

export interface Card {
  cardNumber: number;
  yourNumbers: number[];
  winningNumbers: number[];
  matches: number[];
  instances: number;
}

function numbersStrToArray(str: string): number[] {
  return str.split(" ").map((str) => str.trim())
    .filter((str: string) => str.trim() !== "")
    .map((str: string) => Number.parseInt(str));
}

function sortNumbers(arr: number[]): number[] {
  return arr.sort((a, b) => a - b);
}

export function strToCard(str: string): Card {
  const split = str.split(":");
  const card = split[0];
  const numbersSplit = split[1].split("|");
  const winningNumbers = numbersStrToArray(numbersSplit[0]);
  const yourNumbers = numbersStrToArray(numbersSplit[1]);
  return {
    cardNumber: Number.parseInt(card.match(/\d+/)![0]),
    yourNumbers: sortNumbers(yourNumbers),
    winningNumbers: sortNumbers(winningNumbers),
    matches: sortNumbers(
      yourNumbers.filter((num) => winningNumbers.includes(num)),
    ),
    instances: 1,
  };
}

export function calcWinnings(cards: Card[], i: number, card: Card): Card {
  const numMatches = card.matches.length;

  for (let k = 0; k < card.instances; k++) {
    for (let j = i + 1; j < i + numMatches + 1; j++) {
      const c = cards[j];
      if (c) {
        c.instances += 1;
      }
    }
  }

  return card;
}

export function totalScratchCards(str: string): number {
  return str.trim().split("\n")
    .map((l: string) => strToCard(l))
    .map((card: Card, i: number, cards: Card[]) => {
      return calcWinnings(cards, i, card);
    })
    .reduce((acc: number, card: Card) => acc + card.instances, 0);
}

if (import.meta.main) {
  console.log(totalScratchCards(await Deno.readTextFile(Deno.args[0])));
}
