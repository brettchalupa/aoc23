// AOC23 D8P2
// https://adventofcode.com/2023/day/8#part2

const StartChar = "A";
const FinishChar = "Z";
const Left = "L";
// const Right = "R";

interface Node {
  element: string;
  left: string;
  right: string;
}

// https://stackoverflow.com/questions/31302054/how-to-find-the-least-common-multiple-of-a-range-of-numbers
function gcd(a: number, b: number): number {
  return b == 0 ? a : gcd(b, a % b);
}
const lcm = (a: number, b: number) => a / gcd(a, b) * b;
const lcmAll = (ns: number[]) => ns.reduce(lcm, 1);

function sortNumbers(arr: number[]): number[] {
  return arr.sort((a, b) => a - b);
}
function lcmArr(arr: number[]): number {
  return lcmAll(sortNumbers(arr));
}

/**
 * GHOST RULES
 * Returns the number of steps to navigate from Start nodes (end with "A") to Finish nodes (ends with "Z")
 */
export function navigateNodes(nodes: Node[], instructions: string[]): number {
  const nodePaths = nodes.filter((n) => n.element[2] == StartChar);
  const pathSteps = new Array(nodePaths.length);

  for (let i = 0; i < nodePaths.length; i++) {
    let steps = 0;
    let instructionsIndex = 0;

    let seekingEnd = true;
    let node = nodePaths[i];

    while (seekingEnd) {
      const stepDir = instructions[instructionsIndex];

      if (stepDir === undefined) {
        throw new Error(`undefined stepDir at step ${steps}`);
      }

      let nextElement = "";
      steps++;

      if (node === undefined) {
        throw new Error(`node at step ${steps} is undefined`);
      }

      if (stepDir === Left) {
        nextElement = node.left;
      } else {
        nextElement = node.right;
      }

      if (nextElement[2] === FinishChar) {
        seekingEnd = false;
        pathSteps[i] = steps;
      } else {
        node = nodes.find((n) => n.element === nextElement)!;
        instructionsIndex++;
        if (instructionsIndex >= instructions.length) {
          instructionsIndex = 0;
        }
      }
    }
  }

  return lcmArr(pathSteps);
}

export function stepsToReachEnd(str: string): number {
  const split = str.split("\n\n");
  const instructions = split[0].trim().split("");
  const nodeLines = split[1].trim().split("\n");
  const nodes: Node[] = nodeLines.map((line) => {
    const lineSplit = line.split(" = ");
    const elements = lineSplit[1].substring(1, 9).split(", ");
    return {
      element: lineSplit[0],
      left: elements[0],
      right: elements[1],
    };
  });
  return navigateNodes(nodes, instructions);
}

if (import.meta.main) {
  console.log(stepsToReachEnd(await Deno.readTextFile(Deno.args[0])));
}
