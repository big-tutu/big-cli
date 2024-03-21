#!/usr/bin/env node

const program = require("commander");
const packageJson = require("../package.json");
const updateCheck = require("../lib/update");
const setMirror = require("../lib/mirror");
const dlTemplate = require("../lib/download");
const chalk = require("chalk");
const initProject = require("../lib/init");

program
  .version(packageJson.version, "-v, --version")
  .usage("<command> [options]");

program
  .command("upgrade")
  .description("Check the big-cli version")
  .action(updateCheck);

program
  .command("mirror <template_mirror_url>")
  .description("Set the template mirror")
  .action((url) => {
    setMirror(url);
  });

program
  .command("template")
  .description("Download template from mirror")
  .action(() => {
    dlTemplate();
  });

program.on("command:*", () => {
  console.log(chalk.red("invalid command:", program.args.join("")));
  console.log("See -h for a list of available commands");
});

program.on("command: ", () => {
  console.log(chalk.red("invalid command:", program.args.join("")));
  console.log("See -h for a list of available commands");
});

program
  .name("big-cli")
  .usage("<command> [options]")
  .command("init <project_name>")
  .description("Create a web project")
  .action((project) => {
    initProject(project);
  });

if (process.argv.length < 3) {
  program.usage("<command> [options]").help();
}
console.log(process.argv);
program.parse(process.argv);
