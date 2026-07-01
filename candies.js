const fs = require("fs");

class John {
  constructor() {
    this.inventory = new Map();
    this.memory = [];
  }

  buy(candyId) {
    console.log("Buying candyId:", candyId);
    const originalAmt = this.inventory.get(candyId) ?? 0;
    this.inventory.set(candyId, originalAmt + 1);
  }

  eat(candyId) {
    console.log("Eating candyId:", candyId);
    const originalAmt = this.inventory.get(candyId);
    console.log("Original Amount:", originalAmt);
    if (!originalAmt) {
      console.log("Invalid");
      return 0;
    }
    this.inventory.set(candyId, originalAmt - 1);
    return 1;
  }

  calculateCollections() {
    // console.log("Calculating Collections...");
    // console.log(this.inventory)
    const invKeys = [...this.inventory.keys()]
      .map((n) => parseInt(n))
      .sort((a, b) => a - b)
      .filter((n) => this.inventory.get(n.toString()) > 0);
    // console.log("Inventory Keys:", invKeys);

    let collectionCount = 0;

    for (let i = 0; i < invKeys.length; i++) {
      // Edit the layer
      // i denotes the layer number, j denotes the position
      const candyCount = this.inventory.get(invKeys[i].toString());

      // if (candyCount <= 0) console.log("hi");
      if (candyCount <= 0) {
        break;
      }
      if (invKeys[i] == i + 1) {
        // console.log(`Candy ${invKeys[i]}: ${candyCount}`)
        collectionCount++;
      }
      if (invKeys[i] != i + 1) {
        break;
      }
    }
    return collectionCount;
  }
}

function parser() {
  const input = fs.readFileSync("./candy-input2.txt", "utf-8");
  const inputArr = input.split("\n").slice(1);
  console.log(inputArr);
  return inputArr;
}

function solve(inputArr) {
  const myJohn = new John();

  const memory = [];

  for (const input of inputArr) {
    let actionId = input.split(" ")[0];
    let candyId = input.split(" ")[1];

    if (actionId == 1) myJohn.buy(candyId);
    if (actionId == 2) {
      const result = myJohn.eat(candyId);
      if (result == 0) {
        continue;
      }
    }

    const calculated = myJohn.calculateCollections();
    memory.push(calculated);
  }

  const sum = memory.reduce((acc, curr) => acc + curr, 0);
  return sum % 998244353;
}

console.log(solve(parser()));
