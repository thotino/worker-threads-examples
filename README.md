# WORKER THREADS EXAMPLES

The `node:worker_threads` module enables the use of threads that execute JavaScript in parallel. The main goal of workers is to improve the performance on CPU-intensive operations, not I/O operations.

The worker threads implement the cross-platform web workers API. They can share memory, run in the same process as the main thread and are more lightweight than processes.
