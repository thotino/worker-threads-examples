const { parentPort, workerData } = require("node:worker_threads");

const crypto = require("node:crypto");
const fs = require("node:fs");

const { file } = workerData;
const output = `${file}.encrypted`;

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const cipher = crypto.createCipheriv("aes-256-ctr", Buffer.from(key), iv);

const readStream = fs.createReadStream(file);
const writeStream = fs.createWriteStream(output);

readStream.pipe(cipher).pipe(writeStream);

writeStream.on("close", () => {
  parentPort.postMessage({ key: key.toString("hex"), output, type: "done" });
});
