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
const modelJsonName = "model_v2.json"

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
      description: "payee address"
    },
    from: {
      type: 'string',
      title: 'from',
      description: "payer address"
    },
    isPayer: {
      type: 'boolean',
      title: 'isPayer',
      description: "whether or not DID is payer"
    },
    summary: {
      type: 'string',
      title: 'summary',
      description: "work summary"
    },
    detail: {
      type: 'string',
      title: 'detail',
      description: "work detail"
    },
    deliverables: {
      type: "array",
      title: 'deliverables',
      description: "work deliverables",
      items: {
        type: 'object',
        title: 'deliverableItem',
        properties: {
          format: {
            type: 'string',
            title: 'format',
            description: "current formats are url or cid",
          },
          value: {
            type: 'string',
            title: 'value',
            description: "work deliverable value(url/cid)",
          }
        },
      },
    },
    value: {
      type: 'string',
      title: 'value',
      description: "paid value",
    },
    tokenSymbol: {
      type: 'string',
      title: 'tokenSymbol',
      description: "paid token symbol",
    },
    tokenDecimal: {
      type: 'number',
      title: 'tokenDecimal',
      description: "paid token decimal",
    },
    fiatValue: {
      type: 'string',
      title: 'value',
      description: "fiat price at the time of the transaction",
    },
    fiatSymbol: {
      type: 'string',
      title: 'fiatSymbol',
      description: "currently only support USD",
    },
    networkId: {
      type: 'number',
      title: 'networkId',
      description: "network id of the transaction",
    },
    issuedTimestamp: {
      type: 'string',
      title: 'issuedTimestamp',
      description: "Time stamp of transaction occurrence",
    },
    txHash: {
      type: 'string',
      title: 'txHash',
      description: "hash of the transaction",
    },
    jobType: {
      type: 'string',
      title: 'jobType',
      description: "currently support fulltime, parttime, and onetime",
    },
    genre: {
      type: 'string',
      title: 'genre',
      description: "work genre e.g, Dev, Design etc",
    },
    toSig: {
      type: 'string',
      title: 'toSig',
      description: "signature of peyee",
    },
    fromSig: {
      type: 'string',
      title: 'fromSig',
      description: "signature of peyer",
    },
    toSigner: {
      type: 'string',
      title: 'toSigner',
      description: "Address of person signing as payee",
    },
    fromSigner: {
      type: 'string',
      title: 'fromSigner',
      description: "Address of person signing as payer",
    },
    startTimestamp: {
      type: 'string',
      title: 'startTimestamp',
      description: "Time stamp of work started",
    },
    endTimestamp: {
      type: 'string',
      title: 'endTimestamp',
      description: "Time stamp of work ended",
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
      description: "work tags",
      items: {
        type: "string"
      },
      uniqueItems: true
    },
    deliverableHash: {
      type: 'string',
      title: 'deliverableHash',
      description: "hash value of all work descriptions(summary, detail, deliverables)",
    },
    platform: {
      type: 'string',
      title: 'platform',
      description: "a transaction platform if exists e.g, gitcoin",
    },
    subtasks: {
      type: "array",
      title: 'subtasks',
      description: "subtasks",
      items: {
        type: 'object',
        title: 'subtask',
        properties: {
          detail: {
            type: 'string',
            title: 'detail',
            description: "work detail"
          },
          genre: {
            type: 'string',
            title: 'genre',
            description: "work genre e.g, Dev, Design etc",
          },
          
        },
      },
    },
    createdAt: {
      type: 'string',
      title: 'createdAt',
    },
    updatedAt: {
      type: 'string',
      title: 'updatedAt',
    }
  },
  required: ["to", "from", "summary", "value", "tokenSymbol", "networkId", "issuedTimestamp"],
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
        description: "work credential id",
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
            description: "hash of the transaction",
          },
          isPayer: {
            type: 'boolean',
            title: 'isPayer',
            description: "whether or not DID is payer",
          },
          summary: {
            type: 'string',
            title: 'summary',
            description: "work summary"
          },
          deliverables: {
            type: "array",
            title: 'deliverables',
            description: "work deliverables",
            items: {
              type: 'object',
              title: 'deliverableItem',
              properties: {
                format: {
                  type: 'string',
                  title: 'format',
                  description: "current formats are url or cid",
                },
                value: {
                  type: 'string',
                  title: 'value',
                  description: "work deliverable value(url/cid)",
                }
              },
            },
          },
          fiatValue: {
            type: 'string',
            title: 'value',
            description: "fiat price at the time of the transaction",
          },
          genre: {
            type: 'string',
            title: 'genre',
            description: "work genre e.g, Dev, Design etc",
          },
          deliverableHash: {
            type: 'string',
            title: 'deliverableHash',
            description: "hash value of all work descriptions(summary, detail, deliverables)",
          },
          platform: {
            type: 'string',
            title: 'platform',
            description: "a transaction platform if exists e.g, gitcoin",
          },
          isVerified: {
            type: 'boolean',
            title: 'isVerified',
            description: "Either both signatures exist or the transaction is via platform",
          },
          issuedTimestamp: {
            type: 'string',
            title: 'issuedTimestamp',
            description: "Time stamp of transaction occurrence",
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
