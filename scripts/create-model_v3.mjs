import { writeFile } from 'node:fs/promises'
import { CeramicClient } from '@ceramicnetwork/http-client'
import { model as profileModel } from '@datamodels/identity-profile-basic'
import { model as AccountModel } from '@datamodels/identity-accounts-crypto'
import { model as alsoKnownAsModel } from '@datamodels/identity-accounts-web'
import { ModelManager } from '@glazed/devtools'
import { DID } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver } from 'key-did-resolver'
import { fromString } from 'uint8arrays'
import dotenv from 'dotenv'
import WorkCredentialSchema from "./schema"
import VerifiableWorkCredentialSchema from "./schema"
import { model as OldWorkCredentialModel } from './models/OldWorkCredentials/dist/index.mjs'
// import pkg from './models/OldWorkCredentials/dist/index.js';
// const { model: OldWorkCredentialModel } = pkg;

dotenv.config();

if (!process.env.SEED) {
  throw new Error('Missing SEED environment variable')
}

// const CERAMIC_URL = process.env.NEXT_PUBLIC_CERAMIC_URL || 'http://localhost:7007'
const CERAMIC_URL = 'http://localhost:7007'
const modelJsonName = "model_v3.json"

// The seed must be provided as an environment variable
const seed = fromString(process.env.SEED, 'base16')
// const seed = randomBytes(32)

console.log("Seed: ", seed)
// Create and authenticate the DID
const did = new DID({
  provider: new Ed25519Provider(seed),
  resolver: getResolver(),
})
const auth = await did.authenticate()
console.log({auth})

// Connect to the Ceramic node
const ceramic = new CeramicClient(CERAMIC_URL)
ceramic.did = did

// Create a manager for the model
const manager = new ModelManager({ceramic})

// Add basicProfile to the model
manager.addJSONModel(profileModel)
manager.addJSONModel(AccountModel)
manager.addJSONModel(alsoKnownAsModel)
manager.addJSONModel(OldWorkCredentialModel)

// Create the schemas
const WorkCredentialSchemaID = await manager.createSchema('WorkCredential', WorkCredentialSchema)
const VerifiableWorkCredentialSchemaID = await manager.createSchema('VerifiableWorkCredential', VerifiableWorkCredentialSchema)
const HeldWorkCredentialsSchemaID = await manager.createSchema('HeldWorkCredentials', {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "HeldWorkCredentials",
  "type": "object",
  "properties": {
    "VerifiableWorkCredentials": {
      "type": "array",
      "title": 'VerifiableWorkCredentials',
      "items": {
        "type": "string",
        "$comment": `cip88:ref:${manager.getSchemaURL(VerifiableWorkCredentialSchemaID)}`,
        "pattern": "^ceramic://.+(\\?version=.+)?",
        "maxLength": 200,
      },
    },
    "WorkCredentials": {
      "type": "array",
      "title": 'WorkCredentials',
      "items": {
        "type": "object",
        "title": "WorkCredentialItem",
        "description": "work credential",
        "properties": {
          "id": {
            "$comment": `cip88:ref:${manager.getSchemaURL(WorkCredentialSchemaID)}`,
            "type": "string",
            "pattern": "^ceramic://.+(\\?version=.+)?",
            "maxLength": 200,
          },
          "value": {
            "type": "string",
            "title": "value",
            "description": "paid value"
          },
          "summary": {
            "type": "string",
            "title": "summary",
            "description": "work summary"
          },
          "genre": {
            "type": "string",
            "title": "genre",
            "description": "work genre e.g, Dev, Design etc"
          },
          "deliverables": {
            "type": "array",
            "title": "deliverables",
            "description": "work deliverables",
            "items": {
              "type": "object",
              "title": "deliverableItem",
              "properties": {
                "format": {
                  "type": "string",
                  "title": "format",
                  "description": "current formats are url or cid"
                },
                "value": {
                  "type": "string",
                  "title": "value",
                  "description": "work deliverable value(url/cid)"
                }
              },
            },
          },
          "txHash": {
            "type": "string",
            "title": "txHash",
            "description": "hash of the transaction"
          },
          "deliverableHash": {
            "type": "string",
            "title": "deliverableHash",
            "description": "hash value of all work descriptions",
          },
          "platform": {
            "type": "string",
            "title": "platform",
            "description": "a transaction platform if exists e.g, gitcoin",
          },
          "isVerified": {
            "type": "boolean",
            "title": "isVerified",
            "description": "Either both signatures exist or the transaction is via platform",
          },
          "issuedAt": {
            "type": "string",
            "title": "issuedAt",
            "description": "CRDL issue date"
          },
        },
      },
    },
  },
  "additionalProperties":false,
})

console.log({WorkCredentialSchemaID})
console.log({VerifiableWorkCredentialSchemaID})
console.log({HeldWorkCredentialsSchemaID})

// Create the definition using the created schema ID
const wc = await manager.createDefinition('workCredential', {
  name: 'workCredential',
  description: 'workCredential',
  schema: manager.getSchemaURL(WorkCredentialSchemaID),
})
const verifiableWc = await manager.createDefinition('verifiableWorkCredential', {
  name: 'verifiableWorkCredential',
  description: 'verifiableWorkCredential',
  schema: manager.getSchemaURL(VerifiableWorkCredentialSchemaID),
})

const wcs = await manager.createDefinition('heldWorkCredentials', {
  name: 'workCredentials',
  description: 'workCredentials',
  schema: manager.getSchemaURL(HeldWorkCredentialsSchemaID),
})

console.log({wc})
console.log({verifiableWc})
console.log({wcs})

// // Create a WorkCredential with text that will be used as placeholder
// await manager.createTile(
//   "PlaceHodlerWorkCredential",
//   { to: "toaddress", from: "from address",
//   summary: 'This is a summary for the WorkCredential contents',
// value: "100000000", tokenSymbol: "ETH", networkId:1, issuedTimestamp: "12345678", txHash: "0xhgeohgoehgehgoehgoehoehge" },
//   { schema: manager.getSchemaURL(WorkCredentialSchemaID) }
// )

// Write model to JSON file
await writeFile(new URL(`${modelJsonName}`, import.meta.url), JSON.stringify(manager.toJSON()))
console.log(`Encoded model written to ${modelJsonName}`)
