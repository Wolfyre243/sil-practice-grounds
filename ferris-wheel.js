const arr = [1, 1, 1, 1, 1, 2, 2, 2, 2];
const arr2 = [7, 2, 3, 9];
const arr3 = [6, 10, 7, 6, 9, 16, 7, 7, 16, 16];
const arr4 =
  "31 39 48 15 96 89 97 21 22 47 16 52 2 27 56 51 19 63 56 97 59 60 74 6 20 50 28 84 64 74 39 30 34 75 13 27 96 65 82 9 57 55 69 99 52 79 11 13 88 13 95 79 68 2 60 66 74 70 87 18 58 80 20 14 11 79 79 48 30 32 91 55 17 63 21 37 57 60 30 24 91 82 90 98 61 12 4 55 38 43 66 80 97 3 72 91 12 92 7 8 79 21 59 54 75 16 70 91 37 81 69 95 5 53 96 46 22 11 97 90 6 31 13 46 44 1 15 90 33 17 89 54 79 21 69 54 8 20 70 46 2 24 26 98 98 87 99 34 71 63"
    .split(" ")
    .map((n) => parseInt(n));
const weight = 100;

function solve(children, maxWeight) {
  let currentWeight = 0;
  let gondolaCount = 0;

  const sortedChildren = children.sort((a, b) => a - b);

  for (let i = 0; i < sortedChildren.length; i++) {
    const weight = sortedChildren[i];

    currentWeight += weight;

    // Overflow e.g. 2 + 3 + 7
    if (currentWeight > maxWeight) {
      gondolaCount++;
      currentWeight = weight;
    }

    // Last num
    if (i + 1 === children.length) {
      gondolaCount++;
      continue;
    }

    // Not full yet e.g. 2 + 3
    if (currentWeight < maxWeight) {
      continue;
    }

    if (currentWeight === maxWeight) {
      gondolaCount++;
      currentWeight = 0;
      continue;
    }
  }

  return gondolaCount;
}

function solve2(children, maxWeight) {
  let gondolaCount = 0;

  const sortedChildren = children.sort((a, b) => a - b);

  let leftPtr = 0;
  let rightPtr = sortedChildren.length - 1;

  // let tempArr = [];

  while (leftPtr <= rightPtr) {
    let minVal = sortedChildren[leftPtr];
    let maxVal = sortedChildren[rightPtr];
    let total = minVal + maxVal;

    if (total > maxWeight) {
      gondolaCount++;
      rightPtr--;
      continue;
    }

    if (total === maxWeight) {
      gondolaCount++;
      leftPtr++;
      rightPtr--;
      continue;
    }

    if (total < maxWeight) {
      leftPtr++;
      continue;
    }
  }

  return gondolaCount;
}

console.log(solve2(arr4, weight));
