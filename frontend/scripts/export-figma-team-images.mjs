#!/usr/bin/env node
/**
 * Export team member images from Figma using the REST API.
 * 
 * Prerequisites:
 * 1. Get a Figma Personal Access Token:
 *    - Go to Figma → Settings → Account → Personal access tokens
 *    - Create a new token and copy it
 * 
 * 2. Get the Figma file key from your file URL:
 *    - URL format: https://www.figma.com/design/XXXXXX/File-Name
 *    - The XXXXXX part is your file key
 * 
 * 3. Get the node IDs for the team member images:
 *    - In Figma, right-click an image → "Copy link"
 *    - The URL contains ?node-id=123-456 - that's the node ID
 * 
 * Usage:
 *   FIGMA_TOKEN=your_token node scripts/export-figma-team-images.mjs
 * 
 * Or create a .env.local file with:
 *   FIGMA_TOKEN=your_token
 */

import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const outputDir = path.join(projectRoot, 'public', 'figma-assets', 'team')

// ============================================================
// CONFIGURATION - Update these values
// ============================================================

// Your Figma personal access token (or set FIGMA_TOKEN env var)
const FIGMA_TOKEN = process.env.FIGMA_TOKEN || 'YOUR_FIGMA_TOKEN_HERE'

// Your Figma file key (from the URL)
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY || 'YOUR_FILE_KEY_HERE'

// Team member image node IDs from Figma
// To get these: Right-click each image in Figma → Copy link → extract the node-id parameter
// Format: { name: 'filename', nodeId: '123:456' }
const TEAM_IMAGES = [
  {name: 'jason-crawford', nodeId: 'REPLACE_WITH_NODE_ID'},
  {name: 'mike-ward', nodeId: 'REPLACE_WITH_NODE_ID'},
  {name: 'andrew-toth', nodeId: 'REPLACE_WITH_NODE_ID'},
  {name: 'earlene-hoskins', nodeId: 'REPLACE_WITH_NODE_ID'},
  {name: 'alan-squires', nodeId: 'REPLACE_WITH_NODE_ID'},
  {name: 'kelsey-burns', nodeId: 'REPLACE_WITH_NODE_ID'},
  {name: 'dave-finzer', nodeId: 'REPLACE_WITH_NODE_ID'},
  {name: 'chip-schaber', nodeId: 'REPLACE_WITH_NODE_ID'},
  {name: 'stephen-toth', nodeId: 'REPLACE_WITH_NODE_ID'},
  {name: 'carson-warner', nodeId: 'REPLACE_WITH_NODE_ID'},
  {name: 'austin-shadbolt', nodeId: 'REPLACE_WITH_NODE_ID'},
]

// ============================================================

async function getImageUrls(fileKey, nodeIds, token) {
  const ids = nodeIds.join(',')
  const url = `https://api.figma.com/v1/images/${fileKey}?ids=${encodeURIComponent(ids)}&format=png&scale=2`
  
  const response = await fetch(url, {
    headers: {
      'X-Figma-Token': token,
    },
  })
  
  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Figma API error: ${response.status} ${response.statusText}\n${text}`)
  }
  
  const data = await response.json()
  
  if (data.err) {
    throw new Error(`Figma API error: ${data.err}`)
  }
  
  return data.images // { nodeId: imageUrl }
}

async function downloadImage(url, destPath) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to download: ${response.status}`)
  }
  
  const buffer = Buffer.from(await response.arrayBuffer())
  fs.mkdirSync(path.dirname(destPath), {recursive: true})
  fs.writeFileSync(destPath, buffer)
}

async function main() {
  console.log('Figma Team Image Exporter')
  console.log('=========================\n')
  
  // Validate config
  if (FIGMA_TOKEN === 'YOUR_FIGMA_TOKEN_HERE' || !FIGMA_TOKEN) {
    console.error('Error: Please set your Figma token.')
    console.error('Set the FIGMA_TOKEN environment variable or edit this script.')
    console.error('\nTo get a token:')
    console.error('1. Go to Figma → Settings → Account → Personal access tokens')
    console.error('2. Create a new token and copy it')
    process.exit(1)
  }
  
  if (FIGMA_FILE_KEY === 'YOUR_FILE_KEY_HERE' || !FIGMA_FILE_KEY) {
    console.error('Error: Please set your Figma file key.')
    console.error('Set the FIGMA_FILE_KEY environment variable or edit this script.')
    console.error('\nTo get the file key:')
    console.error('Look at your Figma URL: https://www.figma.com/design/XXXXX/...')
    console.error('The XXXXX part is your file key')
    process.exit(1)
  }
  
  const validImages = TEAM_IMAGES.filter(img => img.nodeId !== 'REPLACE_WITH_NODE_ID')
  
  if (validImages.length === 0) {
    console.error('Error: No node IDs configured.')
    console.error('\nTo get node IDs:')
    console.error('1. In Figma, right-click each team member image')
    console.error('2. Click "Copy link"')
    console.error('3. The URL contains ?node-id=123-456')
    console.error('4. Add these IDs to the TEAM_IMAGES array in this script')
    process.exit(1)
  }
  
  console.log(`Found ${validImages.length} images to export`)
  console.log(`Output directory: ${outputDir}\n`)
  
  // Get image URLs from Figma
  console.log('Fetching image URLs from Figma API...')
  const nodeIds = validImages.map(img => img.nodeId)
  
  try {
    const imageUrls = await getImageUrls(FIGMA_FILE_KEY, nodeIds, FIGMA_TOKEN)
    
    // Download each image
    for (const img of validImages) {
      const url = imageUrls[img.nodeId]
      if (!url) {
        console.log(`⚠️  No URL returned for ${img.name} (node: ${img.nodeId})`)
        continue
      }
      
      const destPath = path.join(outputDir, `${img.name}.png`)
      console.log(`Downloading ${img.name}.png...`)
      await downloadImage(url, destPath)
      console.log(`✓ Saved ${path.relative(projectRoot, destPath)}`)
    }
    
    console.log('\n✅ Done! Images saved to public/figma-assets/team/')
    console.log('\nUpdate your team page data with these paths:')
    for (const img of validImages) {
      console.log(`  picture: '/figma-assets/team/${img.name}.png'`)
    }
    
  } catch (error) {
    console.error('\n❌ Error:', error.message)
    process.exit(1)
  }
}

main()
