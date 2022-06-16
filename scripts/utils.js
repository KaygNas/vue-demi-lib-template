const path = require('path')
const fs = require('fs')

function switchVersion(version) {
  const src = getLibDir(version)
  const dest = path.join(src, '..')
  console.log(`[frontend-shared] switch lib to vue version ${version}`)
  copyDir(src, dest)
}

function getLibDir(version) {
  const dirname = String(version).startsWith('2') ? 'vue2' : 'vue3'
  return path.join(__dirname, `../lib/${dirname}`)
}

function copyDir(src, dest) {
  console.log(`copying from ${src} to ${dest}`)
  // unlink for pnpm, #92
  try {
    fs.unlinkSync(dest)
  }
  catch (error) { }
  try {
    copyRecursiveSync(src, dest)
  }
  catch (error) {
    console.error(error)
  }
}

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src)
  const stats = exists && fs.statSync(src)
  const isDirectory = stats && stats.isDirectory()
  if (isDirectory) {
    !fs.existsSync(dest) && fs.mkdirSync(dest)
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName),
        path.join(dest, childItemName))
    })
  }
  else {
    fs.copyFileSync(src, dest)
  }
}

module.exports = { getLibDir, copyDir, switchVersion }
