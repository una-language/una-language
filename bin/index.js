// What will be:
// bash find all sv files and pass their paths to nodejs compiler
// create build folder - copy all output and simple js files
// run node on that

const { bash, getParentDirectory, node, parameters } = require('./util')
const transpile = require('./transpile')

const run = async () => {
  const outputDirectory = './output'
  await bash(`rm -rf ${outputDirectory}`)
  await bash(`mkdir ${outputDirectory}`)

  const inputDirectory = parameters[0]
  const inputJavascriptFiles = await bash(`find ${inputDirectory} -name "*.js"`)
  const inputSovaFiles = await bash(`find ${inputDirectory} -name "*.sv"`)

  // Copy all javascript files from input directory to output directory
  await Promise.all(
    inputJavascriptFiles.map(async inputJavascriptFile => {
      const outputJavascriptFile = outputDirectory + inputJavascriptFile.replace(inputDirectory, '')
      const outputFileDirectory = getParentDirectory(outputJavascriptFile)
      await bash(`mkdir -p ${outputFileDirectory} && cp ${inputJavascriptFile} ${outputFileDirectory}`)
    })
  )

  await Promise.all(
    inputSovaFiles.map(async inputSovaFile => {
      const outputJavascriptFile = outputDirectory + inputSovaFile.replace(inputDirectory, '').slice(0, -3) + '.js'
      const outputFileDirectory = getParentDirectory(outputJavascriptFile)
      const inputSovaFileContent = await bash(`cat ${inputSovaFile}`)
      const outputJavascriptFileContent = transpile(inputSovaFileContent)
      await bash(`mkdir -p ${outputFileDirectory}`)
      await bash(`cat <<EOT >> ${outputJavascriptFile}\n${outputJavascriptFileContent}\nEOT`)
    })
  )

  node(outputDirectory)
}

run()
