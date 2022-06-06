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

// const CERAMIC_URL = process.env.NEXT_PUBLIC_CERAMIC_URL || 'http://localhost:7007'
const CERAMIC_URL = 'http://localhost:7007'
const modelJsonName = "model_v2_dev.json"

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

// Create the schemas
const WorkCredentialSchemaID = await manager.createSchema('WorkCredential', {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'WorkCredential',
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
    deliverables: {
      type: "array",
      title: 'deliverables',
      items: {
        type: 'object',
        title: 'deliverableItem',
        properties: {
          format: {
            type: 'string',
            title: 'format',
          },
          value: {
            type: 'string',
            title: 'value',
          }
        },
      },
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
    toSigner: {
      type: 'string',
      title: 'toSigner',
    },
    fromSigner: {
      type: 'string',
      title: 'fromSigner',
    },
    startTimestamp: {
      type: 'string',
      title: 'startTimestamp',
    },
    endTimestamp: {
      type: 'string',
      title: 'endTimestamp',
    },
    createdAt: {
      type: 'string',
      title: 'createdAt',
    },
    updatedAt: {
      type: 'string',
      title: 'updatedAt',
    },
    relatedAddresses: {
      type: "array",
      title: 'relatedAddress',
      items: {
        type: "string"
      },
      uniqueItems: true
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
const WorkCredentialsSchemaID = await manager.createSchema('WorkCredentials', {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'WorkCredentials',
  type: 'object',
  properties: {
    WorkCredentials: {
      type: 'array',
      title: 'WorkCredentials',
      items: {
        type: 'object',
        title: 'WorkCredentialItem',
        properties: {
          id: {
            $comment: `cip88:ref:${manager.getSchemaURL(WorkCredentialSchemaID)}`,
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
          deliverables: {
            type: 'array',
            title: 'deliverables',
            items: {
              type: 'object',
              title: 'deliverableItem',
              properties: {
                format: {
                  type: 'string',
                  title: 'format',
                },
                value: {
                  type: 'string',
                  title: 'value',
                }
              },
            },
          },
          fiatValue: {
            type: 'string',
            title: 'value',
          },
          genre: {
            type: 'string',
            title: 'genre',
          },
          isVerified: {
            type: 'boolean',
            title: 'isVerified',
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

console.log({WorkCredentialSchemaID})
console.log({WorkCredentialsSchemaID})

// Create the definition using the created schema ID
const wc = await manager.createDefinition('workCredential', {
  name: 'workCredential',
  description: 'workCredential',
  schema: manager.getSchemaURL(WorkCredentialSchemaID),
})

const wcs = await manager.createDefinition('workCredentials', {
  name: 'workCredentials',
  description: 'workCredentials',
  schema: manager.getSchemaURL(WorkCredentialsSchemaID),
})

console.log({wc})
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
