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

dotenv.config();

if (!process.env.SEED) {
  throw new Error('Missing SEED environment variable')
}

const CERAMIC_URL = process.env.NEXT_PUBLIC_CERAMIC_URL || 'http://localhost:7007'

// The seed must be provided as an environment variable
const seed = fromString(process.env.SEED, 'base16')
// const seed = randomBytes(32)

console.log("Seed: ", seed)
// Create and authenticate the DID
const did = new DID({
  provider: new Ed25519Provider(seed),
  resolver: getResolver(),
})
await did.authenticate()

// Connect to the Ceramic node
const ceramic = new CeramicClient(CERAMIC_URL)
ceramic.did = did

// Create a manager for the model
const manager = new ModelManager(ceramic)

// Add basicProfile to the model
manager.addJSONModel(profileModel)
manager.addJSONModel(AccountModel)
manager.addJSONModel(alsoKnownAsModel)

// Create the schemas
const cVoxelSchemaID = await manager.createSchema('CVoxel', {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'CVoxel',
  type: 'object',
  properties: {
    to: {
      type: 'string',
      title: 'to',
    },
    from: {
      type: 'string',
      title: 'from',
    },
    isPayer: {
      type: 'boolean',
      title: 'isPayer',
    },
    summary: {
      type: 'string',
      title: 'summary',
    },
    detail: {
      type: 'string',
      title: 'detail',
    },
    deliverable: {
      type: 'string',
      title: 'deliverable',
    },
    value: {
      type: 'string',
      title: 'value',
    },
    tokenSymbol: {
      type: 'string',
      title: 'tokenSymbol',
    },
    tokenDecimal: {
      type: 'number',
      title: 'tokenDecimal',
    },
    fiatValue: {
      type: 'string',
      title: 'value',
    },
    fiatSymbol: {
      type: 'string',
      title: 'fiatSymbol',
    },
    networkId: {
      type: 'number',
      title: 'networkId',
    },
    issuedTimestamp: {
      type: 'string',
      title: 'issuedTimestamp',
    },
    txHash: {
      type: 'string',
      title: 'txHash',
    },
    jobType: {
      type: 'string',
      title: 'jobType',
    },
    genre: {
      type: 'string',
      title: 'genre',
    },
    toSig: {
      type: 'string',
      title: 'toSig',
    },
    fromSig: {
      type: 'string',
      title: 'fromSig',
    },
    relatedTxHashes: {
      type: "array",
      title: 'relatedTxHashes',
      items: {
        type: "string"
      },
      uniqueItems: true
    },
    tags: {
      type: "array",
      title: 'tags',
      items: {
        type: "string"
      },
      uniqueItems: true
    }
  },
  required: ["to", "from", "summary", "value", "tokenSymbol", "networkId", "issuedTimestamp", "txHash"],
  additionalProperties:false,
})
const cVoxelsSchemaID = await manager.createSchema('CVoxels', {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'CVoxels',
  type: 'object',
  properties: {
    cVoxels: {
      type: 'array',
      title: 'cVoxels',
      items: {
        type: 'object',
        title: 'CVoxelsItem',
        properties: {
          id: {
            $comment: `cip88:ref:${manager.getSchemaURL(cVoxelSchemaID)}`,
            type: 'string',
            pattern: '^ceramic://.+(\\?version=.+)?',
            maxLength: 200,
          },
          txHash: {
            type: 'string',
            title: 'txHash',
          },
          isPayer: {
            type: 'boolean',
            title: 'isPayer',
          },
          summary: {
            type: 'string',
            title: 'summary',
          },
          issuedTimestamp: {
            type: 'string',
            title: 'issuedTimestamp',
          },
        },
      },
    },
  },
  additionalProperties:false,
})

// Create the definition using the created schema ID
await manager.createDefinition('cVoxels', {
  name: 'cVoxels',
  description: 'cVoxels',
  schema: manager.getSchemaURL(cVoxelsSchemaID),
})

// Create a cVoxel with text that will be used as placeholder
await manager.createTile(
  "PlaceHodlerCVoxels",
  { to: "toaddress", from: "from address",
  summary: 'This is a summary for the CVoxel contents',
value: "100000000", tokenSymbol: "ETH", networkId:1, issuedTimestamp: "12345678", txHash: "0xhgeohgoehgehgoehgoehoehge" },
  { schema: manager.getSchemaURL(cVoxelSchemaID) }
)

// Write model to JSON file
await writeFile(new URL('model.json', import.meta.url), JSON.stringify(manager.toJSON()))
console.log('Encoded model written to scripts/model.json file')
