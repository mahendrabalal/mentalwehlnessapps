#!/usr/bin/env node

const { spawnSync } = require('child_process')
const { existsSync } = require('fs')
const path = require('path')

const repoRoot = process.cwd()

const hasGitDirectory = existsSync(path.join(repoRoot, '.git'))

if (!hasGitDirectory) {
  console.log('Skipping Husky install – no git directory found.')
  process.exit(0)
}

let huskyBin
try {
  const huskyPkgPath = require.resolve('husky/package.json', {
    paths: [repoRoot]
  })
  huskyBin = path.join(path.dirname(huskyPkgPath), 'lib', 'bin.js')
} catch (error) {
  if (error && error.code === 'MODULE_NOT_FOUND') {
    console.log('Skipping Husky install – husky is not available in this environment.')
    process.exit(0)
  }
  throw error
}

const result = spawnSync(process.execPath, [huskyBin, 'install'], {
  stdio: 'inherit'
})

if (result.error) {
  console.error('Failed to run Husky install:', result.error)
  process.exit(result.status ?? 1)
}

process.exit(result.status ?? 0)
