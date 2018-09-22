const assert = require('chai').assert
const transpile = require('../bin/transpile')
const FileSystem = require('fs')
const prettier = require('prettier')
const testsDirectory = './test/'

const print = console.log
const formatCode = code => {
  const withoutEmptyLines = code
    .split('\n')
    .filter(line => line)
    .join('\n')
  return prettier.format(withoutEmptyLines)
}

const transpileAndFormatInput = input => {
  const transpiled = transpile(input)
  return formatCode(transpiled)
}

FileSystem.readdirSync(testsDirectory)
  .map(file => `${testsDirectory}${file}`)
  .filter(file => FileSystem.lstatSync(file).isDirectory())
  .map(directory =>
    describe(directory.substring(testsDirectory.length, directory.length), () => {
      const [input, output, result] = ['input.sv', 'output.js', 'result.txt']
        .map(name => `${directory}/${name}`)
        .map(file => FileSystem.readFileSync(file, 'utf8'))

      const transpiledOutput = transpileAndFormatInput(input)
      const expectedOutput = formatCode(output)

      it('transpiles', () => assert.equal(expectedOutput, transpiledOutput))

      const expectedLogs = result.split('\n').filter(line => line)
      const logs = []
      console.log = value => logs.push(...value.toString().split('\n'))

      eval(transpiledOutput)
      console.log = print
      it('runs', () => assert.deepEqual(expectedLogs, logs))
    })
  )
