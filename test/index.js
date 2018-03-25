const assert = require('chai').assert
const compile = require('../bin/compile')
const FileSystem = require('fs')
const prettier = require('prettier')
const lib = require('../lib')
const testsDirectory = './test/'

const print = console.log
const formatCode = code => {
  const withoutEmptyLines = code
    .split('\n')
    .filter(line => line)
    .join('\n')
  return prettier.format(withoutEmptyLines)
}

const compileAndFormatInput = input => {
  const compiled = compile(input)
  const requireHeader = `require("sova-standard-library")`
  const clean = compiled.substring(compiled.length, requireHeader.length)
  return formatCode(clean)
}

FileSystem.readdirSync(testsDirectory)
  .map(file => `${testsDirectory}${file}`)
  .filter(file => FileSystem.lstatSync(file).isDirectory())
  .map(directory =>
    describe(directory.substring(testsDirectory.length, directory.length), () => {
      const [input, output, result] = ['input.sv', 'output.js', 'result.txt']
        .map(name => `${directory}/${name}`)
        .map(file => FileSystem.readFileSync(file, 'utf8'))

      const compiledOutput = compileAndFormatInput(input)
      const expectedOutput = formatCode(output)

      it('compiles', () => assert.equal(expectedOutput, compiledOutput))

      const expectedLogs = result.split('\n').filter(line => line)
      const logs = []
      console.log = value => logs.push(...value.toString().split('\n'))

      eval(compiledOutput)
      console.log = print
      it('runs', () => assert.deepEqual(expectedLogs, logs))
    })
  )
