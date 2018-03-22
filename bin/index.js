#! /usr/bin/env node

const compile = require('./compile')
const fileSystem = require('fs')
const glob = require('glob')
const path = require('path')
const read = require('./io/read')
const write = require('./io/write')

const outputFiles = []
const compilePath = path.join(process.cwd(), process.argv[2])
const compileDirectory = fileSystem.lstatSync(compilePath).isFile()
  ? path.dirname(compilePath)
  : compilePath

const compileFile = inputFile => {
  const writeCode = code => {
    const outputFile = inputFile.substring(0, inputFile.length - 3) + '.js'
    outputFiles.push(outputFile)
    return write(outputFile, code)
  }

  return read(inputFile)
    .then(compile)
    .then(writeCode)
}

const run = () => {
  const scriptPath = fileSystem.lstatSync(compilePath).isFile()
    ? compilePath.substring(0, compilePath.length - 3) + '.js'
    : `${compileDirectory}/index.js`

  const process = require('child_process').fork(scriptPath)
  process.on('error', console.error)
  process.on('exit', exitCode => {
    if (exitCode !== 0) console.error(`Exit with code ${exitCode}`)
    outputFiles.forEach(fileSystem.unlinkSync)
  })
}

glob(compileDirectory + '/**/*.sv', (error, files) => {
  if (error) return console.error(error)
  Promise.all(files.map(compileFile)).then(run)
})
