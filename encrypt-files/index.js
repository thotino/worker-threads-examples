/**
 * @see https://snyk.io/blog/node-js-multithreading-with-worker-threads/
 */
const { Worker } = require("node:worker_threads");
const path = require("node:path");
const { log } = require("node:console");
const fileToEncrypt = process.argv[2] || path.join(__dirname, "demo.txt");

const worker = new Worker(path.join(__dirname, "encrypt-file.js"), {
  workerData: { file: fileToEncrypt },
});

worker.on("message", (msg) => {
  if (msg?.type === "done") {
    log(`File encrypted to ${msg.output}!`);
    log(`The key is ${msg.key}!`);
  }
});
