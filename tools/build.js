const { join } = require('path')
const { readdirSync } = require('fs')

const { buildPackage } = require('./build/tsc')
const { bundlePackage } = require('./build/rollup')

const ROOT_DIRECTORY = join(__dirname, '..')
const PACKAGES_DIRECTORY = join(ROOT_DIRECTORY, 'packages')

const allPackages = readdirSync(PACKAGES_DIRECTORY)

let promise = Promise.resolve()

console.log() // used to add separation between commands

for (const package of allPackages) {
  const packageDirectory = join(PACKAGES_DIRECTORY, package)

  promise = promise.then(() =>
    bundlePackage(packageDirectory).then(() => {
      buildPackage(packageDirectory)
    })
  )
}

promise
  .then(() => {
    console.log(`\nDONE!`)
  })
  .catch((err) => {
    console.error(err)

    process.exit(1)
  })
