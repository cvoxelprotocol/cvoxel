import { readFile, writeFile } from 'node:fs/promises'
import { CeramicClient } from '@ceramicnetwork/http-client'
import { ModelManager } from '@glazed/devtools'
import dotenv from 'dotenv'

dotenv.config();


const CERAMIC_URL = process.env.NEXT_PUBLIC_CERAMIC_URL || 'http://localhost:7007'

// Connect to the Ceramic node
const ceramic = new CeramicClient(CERAMIC_URL)

// Load and create a manager for the model
const bytes = await readFile(new URL('model.json', import.meta.url))
const manager = ModelManager.fromJSON(ceramic, JSON.parse(bytes.toString()))

// Write model to JSON file
const modelJsonName = "model_dev.json"
const model = await manager.toPublished()
await writeFile(new URL(`../src/${modelJsonName}`, import.meta.url), JSON.stringify(model))

console.log(`Model written to src/${modelJsonName} file:`, model)
console.log(`model published to ${CERAMIC_URL}`)
