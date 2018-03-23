const assert = require('chai').assert
const compile = require('../bin/compile')
const FileSystem = require('fs')
const testsDirectory = './test/'

const print = console.log

FileSystem.readdirSync(testsDirectory)
  .map(file => `${testsDirectory}${file}`)
  .filter(file => FileSystem.lstatSync(file).isDirectory())
  .map(directory =>
    describe(directory.substring(testsDirectory.length, directory.length), () => {
      const [input, output, result] = ['input.sv', 'output.js', 'result.txt']
        .map(name => `${directory}/${name}`)
        .map(file => FileSystem.readFileSync(file, 'utf8'))

      const compiled = compile(input)
      it('compiles', () => assert.equal(output, compiled))

      const requireHeader = `require("sova-standard-library")`
      const clean = compiled.substring(compiled.length, requireHeader.length)

      const expectedLogs = result.split('\n').filter(line => line)
      const logs = []
      console.log = value => logs.push(...value.toString().split('\n'))

      eval(clean)
      console.log = print
      it('runs', () => assert.deepEqual(expectedLogs, logs))
    })
  )
