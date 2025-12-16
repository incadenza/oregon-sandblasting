#!/usr/bin/env node
/**
 * Downloads Figma-localhost assets referenced in the codebase and rewrites URLs to local /public paths.
 *
 * Default:
 * - Scans: ./app, ./sanity, ./components, ./styles (where present) under frontend/
 * - Matches: http://localhost:3845/assets/<hash>.<ext>
 * - Downloads to: ./public/figma-assets/<hash>.<ext>
 * - Rewrites source to: /figma-assets/<hash>.<ext>
 *
 * Usage:
 *   node scripts/import-figma-assets.mjs
 *   node scripts/import-figma-assets.mjs --dry-run
 *   node scripts/import-figma-assets.mjs --base-url http://localhost:3845
 */

import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = path.resolve(__dirname, '..') // frontend/

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const baseUrlArgIndex = args.findIndex((a) => a === '--base-url')
const baseUrl =
  baseUrlArgIndex >= 0 && args[baseUrlArgIndex + 1]
    ? args[baseUrlArgIndex + 1]
    : 'http://localhost:3845'

const scanDirs = [
  path.join(projectRoot, 'app'),
  path.join(projectRoot, 'sanity'),
  path.join(projectRoot, 'components'),
]

const outDir = path.join(projectRoot, 'public', 'figma-assets')

const exts = ['png', 'jpg', 'jpeg', 'webp', 'svg']
const urlRe = new RegExp(
  `${baseUrl.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}/assets/([a-f0-9]+)\\.(${exts.join('|')})`,
  'g',
)

function listFilesRecursively(dir) {
  if (!fs.existsSync(dir)) return []
  const out = []
  const stack = [dir]
  while (stack.length) {
    const cur = stack.pop()
    const entries = fs.readdirSync(cur, {withFileTypes: true})
    for (const ent of entries) {
      const p = path.join(cur, ent.name)
      if (ent.isDirectory()) stack.push(p)
      else out.push(p)
    }
  }
  return out
}

function isTextFile(file) {
  return /\.(ts|tsx|js|jsx|css|md|mjs|cjs|json)$/.test(file)
}

async function download(url, dest) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed ${res.status} ${res.statusText} for ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  fs.mkdirSync(path.dirname(dest), {recursive: true})
  fs.writeFileSync(dest, buf)
}

async function main() {
  const files = scanDirs.flatMap(listFilesRecursively).filter(isTextFile)

  /** @type {Map<string, {hash: string, ext: string}>} */
  const found = new Map()

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8')
    let match
    while ((match = urlRe.exec(content)) !== null) {
      const [full, hash, ext] = match
      found.set(full, {hash, ext})
    }
    urlRe.lastIndex = 0
  }

  if (found.size === 0) {
    console.log('No localhost assets found. Nothing to do.')
    return
  }

  console.log(`Found ${found.size} unique asset URL(s).`)
  console.log(`Output dir: ${outDir}`)
  if (dryRun) console.log('Dry run: will not download or rewrite files.')

  // Download assets
  for (const [url, {hash, ext}] of found.entries()) {
    const outPath = path.join(outDir, `${hash}.${ext}`)
    const localPath = `/figma-assets/${hash}.${ext}`
    if (!dryRun) {
      if (!fs.existsSync(outPath)) {
        console.log(`Downloading ${url} -> ${path.relative(projectRoot, outPath)}`)
        await download(url, outPath)
      } else {
        console.log(`Exists ${path.relative(projectRoot, outPath)} (skip)`)
      }
    } else {
      console.log(`[dry-run] Would download ${url} -> ${path.relative(projectRoot, outPath)}`)
    }
    // store localPath back onto map for rewrite
    found.set(url, {hash, ext, localPath})
  }

  // Rewrite files
  let rewrittenFiles = 0
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8')
    let next = content
    for (const [url, meta] of found.entries()) {
      if (!meta.localPath) continue
      next = next.split(url).join(meta.localPath)
    }
    if (next !== content) {
      rewrittenFiles++
      console.log(`Rewrite ${path.relative(projectRoot, file)}`)
      if (!dryRun) fs.writeFileSync(file, next, 'utf8')
    }
  }

  console.log(`Rewrote ${rewrittenFiles} file(s).`)
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})


