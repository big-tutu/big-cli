// 初始化项目

const chalk = require("chalk");
const inquirer = require("inquirer");
const handlebars = require("handlebars");
const fse = require("fs-extra");
const symbols = require("log-symbols");
const dlTemplate = require("./download");
async function initProject(projectName) {
  try {
    const exist = fse.pathExists(projectName);
    if (exist) {
      console.log(symbols.error, chalk.red("The project already existed"));
    } else {
      inquirer
        .prompt([
          {
            type: "input",
            name: "name",
            message: "Set a global name for javascript plugin?",
            default: "Default",
          },
        ])
        .then(async (answers) => {
          const initSpinner = ora(chalk.cyan("Initializing project"));
          // 动画开始
          initSpinner.start();

          const templatePath = path.resolve(__dirname, "../template/");
          // 项目根路径
          const processPath = process.cwd();
          // 小写项目名称
          const LCProjectName = projectName.toLowerCase();
          const targetPath = `${processPath}/${LCProjectName}`;
          // 检查模板是否存在
          const exist = fse.pathExists(templatePath);
          if (!exist) {
            await dlTemplate();
          }

          try {
            await fse.copy(templatePath, targetPath);
          } catch (error) {
            console.log(
              symbols.error,
              chalk.red(`Copy template failed. ${error}`),
            );
            process.exit();
          }
          const multiMeta = {
            project_name: LCProjectName,
            global_name: answers.name,
          };
          const multiFiles = [
            `${targetPath}/package.json`,
            `${targetPath}/gulpfile.js`,
            `${targetPath}/test/index.html`,
            `${targetPath}/src/index.js`,
          ];

          // 循环处理需要替换的文件
          for (let i = 0; i < multiFiles.length - 1; i++) {
            try {
              // 读取文件
              const multiFilesContent = await fse.readFile(
                multiFiles[i],
                "utf-8",
              );
              // 替换文件
              const multiFilesResult =
                await handlebars.compile(multiFilesContent)(multiMeta);

              // 输出 文件
              await fse.outputFile(multiFiles[i], multiFilesResult);
            } catch (error) {
              initSpinner.text = chalk.red(
                `Initialize project failed. ${error}`,
              );
              initSpinner.fail();
              process.exit();
            }
          }

          // 循环处理结束
          initSpinner.text = "Initialize project successful.";
          initSpinner.succeed();
          console.log(`
          To get started:
          cd ${chalk.yellow(LCProjectName)}
          ${chalk.yellow("yarn install")} pr ${chalk.yellow("npm install")}
          ${chalk.yellow("yarn dev")} or ${chalk.yellow("npm run dev")}`);
        })
        .catch((error) => {
          if (error.isTtyError) {
            console.log(
              symbols.error,
              chalk.red(
                "Prompt couldn't be rendered in the current environment.",
              ),
            );
          } else {
            console.log(symbols.error, error);
          }
        });
    }
  } catch (error) {
    console.error(error);
    process.exit();
  }
}

module.exports = initProject;
