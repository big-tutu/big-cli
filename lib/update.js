const chalk = require("chalk");
const updateNotifier = require("update-notifier");
const pkg = require("../package.json");

const notifier = updateNotifier({
  pkg,

  // 更新周期
  updateCheckInterval: 1000,
});

function updateCheck() {
  if (notifier.update) {
    console.log(
      `New version available: ${chalk.cyan(notifier.update.latest)}, it's recommend that you update before using `,
    );
  } else {
    console.log("No new version is available.");
  }
}

module.exports = updateCheck;
