import { readFile, writeFile } from 'node:fs/promises'
import { CeramicClient } from '@ceramicnetwork/http-client'
import { ModelManager } from '@glazed/devtools'
import dotenv from 'dotenv'

dotenv.config();


// const CERAMIC_URL = process.env.NEXT_PUBLIC_CERAMIC_URL || 'http://localhost:7007'
const CERAMIC_URL = 'http://localhost:7007'
const modelJsonName = "model_v3.json"
const aliasesFile = "aliases.ts"

// Connect to the Ceramic node
const ceramic = new CeramicClient(CERAMIC_URL)

// Load and create a manager for the model
const bytes = await readFile(new URL(`${modelJsonName}`, import.meta.url))
const manager = ModelManager.fromJSON({ ceramic, model: JSON.parse(bytes.toString()) })

// Write model to JSON file
// const model = await manager.toPublished()
// await writeFile(new URL(`../src/${modelJsonName}`, import.meta.url), JSON.stringify(model))
const aliases = await manager.deploy()
await writeFile(
  new URL(`../src/__generated__/${aliasesFile}`, import.meta.url),
  `export const aliases = ${JSON.stringify(aliases)}`
)
console.log(`Model written to src/__generated__/${aliasesFile} file:`, aliases)
console.log(`model published to ${CERAMIC_URL}`)
