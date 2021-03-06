import yargs from "yargs";
// @ts-ignore
import { name, version, repository } from "../../package.json";

const cmd = yargs
  .scriptName(name)
  .version(version)
  .command("[path]", "Notifies given artifact to github pr", yargs => {
    yargs.positional("path", {
      describe: "Path to artifact"
    });
  })
  .option("message", {
    alias: "m",
    type: "string",
    default: "Artifact can be viewed here: ",
    description: "Message to be displayed in the github comment"
  })
  .example(
    "$0 /path/to/artifact/index.html",
    "Notifies given artifact to github pull request"
  )
  .example(
    '$0 /path/to/artifact/myAwesomeApp.jar -m "Built package can be downloaded at:"',
    "With custom message"
  )
  .epilogue(
    `For more information, please visit our repository at:\nhttps://github.com/${repository}`
  );

export const parse = cmd.parse;
