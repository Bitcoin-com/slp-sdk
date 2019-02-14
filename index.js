#!/usr/bin/env node
"use strict"

require("babel-register")
const path = require("path")
const program = require("commander")
const chalk = require("chalk")
const mkdirp = require("mkdirp")
const figlet = require("figlet")
const clear = require("clear")
const fs = require("fs")
const touch = require("touch")
const emoji = require("node-emoji")
const repl = require("repl")
const SLP = require("./lib/SLP").default
const clone = require("git-clone")

program.version("1.2.0", "-v, --version")

program
  .command("new <name>")
  .option(
    "-s, --scaffold <scaffold>",
    "The framework to use. Options include react, angular, vuejs, nextjs and node."
  )
  .option(
    "-r, --restURL <restURL>",
    "The rest URL to use. default: https://trest.bitcoin.com/v2/"
  )
  .option(
    "-e, --environment <environment>",
    "environment of running REST instance. Ex: production, staging. (Default: development)"
  )
  .description(`create a new SLP application`)
  .action((name, options) => {
    if (fs.existsSync(`./${name}`)) {
      console.log(chalk.red(`Project ${name} already exists`))
      process.exit(1)
    }

    let config
    const environment = fetchOption("environment=development", config, options)
    const restURL = fetchOption(
      "restURL=https://trest.bitcoin.com/v2/",
      config,
      options
    )

    if (options && options.scaffold) {
      let scaffold = options.scaffold.toLowerCase()
      let repo
      const conf = {}
      if (scaffold === "node") {
        repo = "https://github.com/Bitcoin-com/slp-scaffold-node.git"
      } else if (scaffold === "angular") {
        repo = "https://github.com/Bitcoin-com/slp-scaffold-angular.git"
      } else if (scaffold === "next") {
        repo = "https://github.com/Bitcoin-com/slp-scaffold-next.git"
      } else if (scaffold === "react") {
        repo = "https://github.com/Bitcoin-com/slp-scaffold-react.git"
      } else if (scaffold === "vue") {
        repo = "https://github.com/Bitcoin-com/slp-scaffold-vue.git"
      } else {
        console.log(chalk.red(`Scaffold ${scaffold} not supported`))
        process.exit(1)
      }

      if (options && options.repo) {
        scaffold = "custom repo"
        repo = options.repo.toLowerCase()
      }

      clear()
      console.log(
        chalk.blue(
          figlet.textSync("SLP", {
            font: "3-D",
            horizontalLayout: "full"
          })
        )
      )

      console.log(chalk.blue(`Scaffolding ${scaffold} app in ${name}`))
      clone(repo, `./${name}`, [conf], res => {
        if (res === "Error: 'git clone' failed with status 128") {
          console.log(chalk.red("Must create new app in to an empty directory"))
        } else {
          console.log(chalk.green("All done."), emoji.get(":white_check_mark:"))
          console.log(
            chalk.blue(
              "Now `cd` in to your new project and run `npm install && npm start`"
            ),
            emoji.get(":rocket:")
          )
        }
      })
      return
    }
    clear()
    console.log(
      chalk.blue(
        figlet.textSync("SLP", {
          font: "3-D",
          horizontalLayout: "full"
        })
      )
    )

    console.log(chalk.green(`Creating ${name}/ directory`))
    console.log(chalk.green(`Creating src/ directory: ./${name}/src`))
    mkdirp(`./${name}/src`, err => {})

    console.log(chalk.green(`Creating tests/ directory: ./${name}/tests`))
    mkdirp(`./${name}/tests`, err => {})

    console.log(
      chalk.green(`Creating slp.js configuration file: ./${name}/slp.js`)
    )

    mkdirp(`./${name}`, err => {})
    touch(`./${name}/slp.js`)
    fs.writeFileSync(
      `./${name}/slp.js`,
      `exports.config = {
  environments: {
    ${environment}: {
      restURL: "${restURL}"
    }
  }
};
`
    )
    fs.appendFileSync(`./${name}/.gitignore`, ".console_history")
    console.log(chalk.blue("All done."), emoji.get(":white_check_mark:"))
    console.log(
      chalk.blue(
        "Go get em! Remember--with great power comes great responsibility."
      ),
      emoji.get(":rocket:")
    )
  })

program
  .command("console")
  .option(
    "-e, --environment <environment>",
    "environment of REST backend. Ex: production, staging. (Default: development)"
  )
  .description("Run a console with Bitcoin Cash RPC commands available")
  .action(options => {
    let config
    try {
      config = require(`${process.cwd()}/slp.js`).config
    } catch (err) {
      console.log(
        chalk.red("Console command must be run inside an slp-sdk project")
      )
      process.exit(1)
    }
    const replServer = repl.start("> ")
    const historyFile = path.join(process.cwd(), ".console_history")
    require("repl.history")(replServer, historyFile)

    const environment = fetchOption("environment=development", config, options)

    replServer.context.SLP = new SLP(config.environments[environment])
  })

function fetchOption(kv, config, options) {
  const parts = kv.split("=")
  const key = parts[0]
  const defaultVal = parts[1]
  if (options && options[key]) return options[key]
  else if (config && config.new && config.new[key]) return config.new[key]

  return defaultVal
}

program.parse(process.argv)

// print help if no command given
if (!process.argv.slice(2).length) program.outputHelp()
