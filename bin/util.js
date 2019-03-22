const execute = require('child_process').exec

module.exports.bash = command =>
  new Promise((resolve, reject) =>
    execute(
      command,
      (error, stdout, stderr) => (!!error ? reject(error) : resolve(stdout.split('\n').filter(line => line.trim())))
    )
  )
module.exports.getParentDirectory = file =>
  file
    .split('/')
    .slice(0, -1)
    .join('/')
module.exports.node = file => execute(`node ${file}`, (error, stdout, stderr) => console.log(!error ? stdout : stderr))
module.exports.parameters = process.argv.slice(2)
