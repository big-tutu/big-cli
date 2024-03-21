#!/usr/bin/env node

const program = require("commander");
const packageJson = require("../package.json");
const updateCheck = require("../lib/update");
const setMirror = require("../lib/mirror");
const dlTemplate = require("../lib/download");
program.version(packageJson.version, "-v|--version");

program
  .command("upgrade")
  .description("Check the big-cli version")
  .action(updateCheck);

program
  .command("mirror <template_mirror>")
  .description("Set the template mirror")
  .action((url) => {
    setMirror(url);
  });

program
  .command("template")
  .description("Download template from mirror.")
  .action(() => {
    dlTemplate();
  });

program.parse(process.argv);
