const winston = require('winston');
const { combine, timestamp, label, printf, prettyPrint } = winston.format;
const chalk = require('chalk');
const {basename} = require('path');

const format = combine(
  timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
  printf(info => {
    const levelColors = {
        error: chalk.keyword("crimson"),
        warn: chalk.keyword("darkorange"),
        info: chalk.keyword("cornflowerblue"),
        http: chalk.keyword("purple"),
        verbose: chalk.keyword("darkolivegreen"),
        debug: chalk.keyword("lightsteelblue").bgGray,
        silly: chalk.gray
    }

    const level = levelColors[info.level](`[${info.level.toUpperCase()}]`.padEnd(9));
    const label = chalk.gray(`[${info.label}]`.padEnd(17));
    const timestamp = chalk.blue.underline(info.timestamp);
    return `${timestamp} ${level} ${label} ${info.message || "\n" + JSON.stringify(info.errors, null, 2)}`;
  })
);


const consoleTransport = new winston.transports.Console({format});
winston.add(consoleTransport);

function createShorthand(method, scope){
  return function(){
  const keys = Object.keys(arguments);
  if(arguments && typeof(arguments[keys.length-1]) === "object"){
  arguments[arguments.length-1]["label"] = basename(scope);
} else if(keys.length === 1) {
  const typeOfEntry = typeof(arguments["0"]) == Error? "errors": "message";
  arguments["0"]={label: basename(scope), [typeOfEntry]: arguments[0]};
}
  return winston[method].apply(null, arguments);
}
}

module.exports = (scope) => ({
          error: createShorthand("error", scope),
          warn: createShorthand("warn", scope),
          info: createShorthand("info", scope),
          http: createShorthand("http", scope),
          verbose: createShorthand("verbose", scope),
          debug: createShorthand("debug", scope),
          silly: createShorthand("silly", scope),
          silly: createShorthand("silly", scope)
})
