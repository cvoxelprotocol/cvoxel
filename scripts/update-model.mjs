import { writeFile } from 'node:fs/promises'
import { CeramicClient } from '@ceramicnetwork/http-client'
import { DID } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver } from 'key-did-resolver'
import { fromString } from 'uint8arrays'
import dotenv from 'dotenv'
import { TileDocument } from "@ceramicnetwork/stream-tile";

dotenv.config();

// const CERAMIC_URL = process.env.NEXT_PUBLIC_CERAMIC_URL || 'https://node.cvoxelceramic.com'
const CERAMIC_URL = 'http://localhost:7007'

console.log("CERAMIC_URL", CERAMIC_URL)

const SCHEMAS = {
    BasicProfile: 'ceramic://k3y52l7qbv1frxt706gqfzmq6cbqdkptzk8uudaryhlkf6ly9vx21hqu4r6k1jqio',
    CryptoAccounts: 'ceramic://k3y52l7qbv1frypussjburqg4fykyyycfu0p9znc75lv2t5cg4xaslhagkd7h7mkg',
    AlsoKnownAs: 'ceramic://k3y52l7qbv1fryojt8n8cw2k04p9wp67ly59iwqs65dejso566fij5wsdrb871yio',
    WorkCredential:"ceramic://k3y52l7qbv1frxlqnopwhl2tpnw4inawt7upovcr7d0dqtws5t9tn99pigg7ehlvk",
    WorkCredentials:"ceramic://k3y52l7qbv1fryh5yum8uvbtm4a0t63fu1tp2saaxlx0d5ibwfp786yk5h647qj9c"
  }

// The seed must be provided as an environment variable
const seed = fromString(process.env.SEED, 'base16')

// Create and authenticate the DID
const did = new DID({
  provider: new Ed25519Provider(seed),
  resolver: getResolver(),
})
await did.authenticate()

// Connect to the Ceramic node
const ceramic = new CeramicClient(CERAMIC_URL)
ceramic.did = did

const newCVoxelModel = {
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
}



const newCVoxelsModel = {
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
            $comment: `cip88:ref:${SCHEMAS["CVoxel"]}`,
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
}

const loadedCVoxelStream = await TileDocument.load(ceramic, SCHEMAS["CVoxel"]);
const loadedCVoxelsStream = await TileDocument.load(ceramic, SCHEMAS["CVoxels"]);

loadedCVoxelStream.metadata

const tile = new TileDocument(ceramic)

console.log("loadedCVoxelStream", loadedCVoxelStream.content.properties)
console.log("loadedCVoxelsStream", loadedCVoxelsStream.content.properties.cVoxels.items)

try {
  await loadedCVoxelStream.update(newCVoxelModel)
  await loadedCVoxelsStream.update(newCVoxelsModel)
} catch (error) {
  console.log("error", error)
}

const newloadedCVoxelStream = await TileDocument.load(ceramic, SCHEMAS["CVoxel"]);
const newloadedCVoxelsStream = await TileDocument.load(ceramic, SCHEMAS["CVoxels"]);

console.log("new loadedCVoxelStream", newloadedCVoxelStream.content.properties)
console.log("new loadedCVoxelsStream", newloadedCVoxelsStream.content.properties.cVoxels.items)