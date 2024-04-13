process.on("uncaughtException", function (err: Error) {
  //handle the error safely
  console.log(err);
  process.exit(1);
});

process.on("unhandledRejection", function (reason: unknown) {
  //handle the error safely
  console.log(reason);
  process.exit(1);
});

process.on("exit", function (code: number) {
  console.log("About to exit with code:", code);
});

import "./server";

process.on("SIGINT", function () {
  console.log("Caught interrupt signal");
  process.exit();
});
