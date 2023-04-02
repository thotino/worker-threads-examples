"use strict";
const { workerData, parentPort } = require("node:worker_threads");

const { start, range } = workerData;
function generatePrimes(start, range) {
  const primes = [];
  let isPrime = true;
  let end = start + range;

  for (let i = 0; i < end; i++) {
    for (let j = start; j < Math.sqrt(end); j++) {
      if (i !== j && i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(i);
    }
    isPrime = true;
  }
  parentPort.postMessage(primes);
}

generatePrimes(start, range);
