#! /usr/bin/env node

const fileSystem = require('fs')
const glob = require('glob')
const path = require('path')
const read = require('./io/read')
const transpile = require('./transpile')
const write = require('./io/write')

const outputFiles = []
const transpilePath = path.join(process.cwd(), process.argv[2])
const transpileDirectory = fileSystem.lstatSync(transpilePath).isFile() ? path.dirname(transpilePath) : transpilePath

const transpileFile = inputFile => {
  const writeCode = code => {
    const outputFile = inputFile.substring(0, inputFile.length - 3) + '.js'
    outputFiles.push(outputFile)
    return write(outputFile, code)
  }

  return read(inputFile)
    .then(transpile)
    .then(writeCode)
}

const run = () => {
  const scriptPath = fileSystem.lstatSync(transpilePath).isFile()
    ? transpilePath.substring(0, transpilePath.length - 3) + '.js'
    : `${transpileDirectory}/index.js`

  const process = require('child_process').fork(scriptPath)
  process.on('error', console.error)
  process.on('exit', exitCode => {
    if (exitCode !== 0) console.error(`Exit with code ${exitCode}`)
    outputFiles.forEach(fileSystem.unlinkSync)
  })
}

glob(transpileDirectory + '/**/*.sv', (error, files) => {
  if (error) return console.error(error)
  Promise.all(files.map(transpileFile)).then(run)
})
