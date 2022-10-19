import { readFile, writeFile } from 'node:fs/promises'
import { CeramicClient } from '@ceramicnetwork/http-client'
import { ModelManager } from '@glazed/devtools'
import dotenv from 'dotenv'

dotenv.config();

// const ENVIRONMENT = "prod"
const ENVIRONMENT = "dev"

const modelJsonName = `model_${ENVIRONMENT}_v5.json`
const CERAMIC_URL = ENVIRONMENT === "prod" ? "https://prod.cvoxelceramic.com/" : 'http://localhost:7007'
const aliasesFile = ENVIRONMENT === "prod" ? "aliases.ts" : "aliases_dev.ts"

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
