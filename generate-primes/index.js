/**
 * @see https://medium.com/@Trott/using-worker-threads-in-node-js-80494136dbb6
 */
"use strict";

const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("node:worker_threads");
const { log } = require("node:console");
const path = require("node:path");

const min = 2;
let primes = [];

if (isMainThread) {
  const max = 1e7;
  const threads = new Set();
  const threadCount = 2;
  log(`Running with ${threadCount} threads...`);
  const range = Math.ceil((max - min) / threadCount);
  let start = min;
  for (let i = 0; i < threadCount - 1; i++) {
    const myStart = start;
    threads.add(
      new Worker(path.join(__dirname, "generatePrimes.js"), {
        workerData: { start: myStart, range },
      })
    );
    start += range;
  }
  threads.add(
    new Worker(path.join(__dirname, "generatePrimes.js"), {
      workerData: { start, range: range + ((max - min + 1) % threadCount) },
    })
  );

  for (let worker of threads) {
    worker.on("error", (err) => {
      throw err;
    });
    worker.on("exit", () => {
      threads.delete(worker);
      log(`Thread exiting, ${threads.size} running...`);
      if (!threads.size) {
        log(primes.join("\n"));
      }
    });
    worker.on("message", (msg) => {
      primes = primes.concat(msg);
    });
  }
} else {
  generatePrimes(workerData.start, workerData.range);
  parentPort.postMessage(primes);
}
