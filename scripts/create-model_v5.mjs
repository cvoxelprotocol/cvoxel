import { writeFile } from 'node:fs/promises'
import { CeramicClient } from '@ceramicnetwork/http-client'
import { ModelManager } from '@glazed/devtools'
import { DID } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver } from 'key-did-resolver'
import { fromString } from 'uint8arrays'
import dotenv from 'dotenv'

import { compile } from 'json-schema-to-typescript'

import { devModel, prodModel } from './models/v4/dist/index.mjs'
import { EventAttendanceVerifiableCredentialSchema } from './schema.mjs'
import Event from "./schemas/Event.json" assert { type: "json" }

dotenv.config();

if (!process.env.SEED) {
  throw new Error('Missing SEED environment variable')
}

// const ENVIRONMENT = "prod"
const ENVIRONMENT = "dev"

console.log("ENVIRONMENT: ", ENVIRONMENT)

const modelJsonName = `model_${ENVIRONMENT}_v5.json`
const CERAMIC_URL = ENVIRONMENT === "prod" ? "https://prod.cvoxelceramic.com/" : 'http://localhost:7007'


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

const v4Model = ENVIRONMENT === "prod" ? prodModel : devModel

manager.addJSONModel(v4Model)

// Create the schemas
const EventSchemaID = await manager.createSchema('Event', Event)
const EventAttendanceVerifiableCredentialSchemaID = await manager.createSchema('EventAttendanceVerifiableCredential', EventAttendanceVerifiableCredentialSchema)

const IssuedEventsSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "IssuedEvents",
  "type": "object",
  "properties": {
    "issued": {
      "type": "array",
      "items": {
        "type": "string",
        "$comment": `cip88:ref:${manager.getSchemaURL(EventSchemaID)}`,
        "pattern": "^ceramic://.+(\\?version=.+)?",
        "maxLength": 200,
      },
      "default": [],
      "additionalProperties":false,
    }
  },
}

const IssuedEventAttendanceVerifiableCredentialSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "IssuedEventAttendanceVerifiableCredentials",
  "type": "object",
  "properties": {
    "issued": {
      "type": "array",
      "items": {
        "type": "string",
        "$comment": `cip88:ref:${manager.getSchemaURL(EventAttendanceVerifiableCredentialSchemaID)}`,
        "pattern": "^ceramic://.+(\\?version=.+)?",
        "maxLength": 200,
      },
      "default": [],
      "additionalProperties":false,
    }
  },
}

const HeldEventAttendanceVerifiableCredentialSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "HeldEventAttendanceVerifiableCredentials",
  "type": "object",
  "properties": {
    "held": {
      "type": "array",
      "items": {
        "type": "string",
        "$comment": `cip88:ref:${manager.getSchemaURL(EventAttendanceVerifiableCredentialSchemaID)}`,
        "pattern": "^ceramic://.+(\\?version=.+)?",
        "maxLength": 200,
      },
      "default": [],
      "additionalProperties":false,
    }
  },
}
const IssuedEventsSchemaID = await manager.createSchema('IssuedEvents', IssuedEventsSchema)
const IssuedEventAttendanceVerifiableCredentialSchemaID = await manager.createSchema('IssuedEventAttendanceVerifiableCredentials', IssuedEventAttendanceVerifiableCredentialSchema)
const HeldEventAttendanceVerifiableCredentialSchemaID = await manager.createSchema('HeldEventAttendanceVerifiableCredentials', HeldEventAttendanceVerifiableCredentialSchema)

console.log({EventSchemaID})
console.log({IssuedEventsSchemaID})
console.log({EventAttendanceVerifiableCredentialSchemaID})
console.log({IssuedEventAttendanceVerifiableCredentialSchemaID})
console.log({HeldEventAttendanceVerifiableCredentialSchemaID})

// Create the definition using the created schema ID
const event = await manager.createDefinition('Event', {
  name: 'Event',
  description: 'Event',
  schema: manager.getSchemaURL(EventSchemaID),
})
const EventAttendanceVerifiableCredential = await manager.createDefinition('EventAttendanceVerifiableCredential', {
  name: 'EventAttendanceVerifiableCredential',
  description: 'EventAttendanceVerifiableCredential',
  schema: manager.getSchemaURL(EventAttendanceVerifiableCredentialSchemaID),
})

const IssuedEvents = await manager.createDefinition('IssuedEvents', {
  name: 'IssuedEvents',
  description: 'IssuedEvents',
  schema: manager.getSchemaURL(IssuedEventsSchemaID),
})
const IssuedEventAttendanceVerifiableCredentials = await manager.createDefinition('IssuedEventAttendanceVerifiableCredentials', {
  name: 'IssuedEventAttendanceVerifiableCredentials',
  description: 'IssuedEventAttendanceVerifiableCredentials',
  schema: manager.getSchemaURL(IssuedEventAttendanceVerifiableCredentialSchemaID),
})

const HeldEventAttendanceVerifiableCredentials = await manager.createDefinition('HeldEventAttendanceVerifiableCredentials', {
  name: 'HeldEventAttendanceVerifiableCredentials',
  description: 'HeldEventAttendanceVerifiableCredentials',
  schema: manager.getSchemaURL(HeldEventAttendanceVerifiableCredentialSchemaID),
})


console.log({event})
console.log({EventAttendanceVerifiableCredential})
console.log({IssuedEvents})
console.log({IssuedEventAttendanceVerifiableCredentials})
console.log({HeldEventAttendanceVerifiableCredentials})



// Write model to JSON file
await writeFile(new URL(`${modelJsonName}`, import.meta.url), JSON.stringify(manager.toJSON()))
console.log(`Encoded model written to ${modelJsonName}`)

// generate type

const EventTS = await compile(Event, 'Event')
await writeFile(new URL(`../src/__generated__/types/Event.d.ts`, import.meta.url), EventTS)

const EventAttendanceVerifiableCredentialTS = await compile(EventAttendanceVerifiableCredentialSchema, 'EventAttendanceVerifiableCredential')
await writeFile(new URL(`../src/__generated__/types/EventAttendanceVerifiableCredential.d.ts`, import.meta.url), EventAttendanceVerifiableCredentialTS)

const IssuedEventsTS = await compile(IssuedEventsSchema, 'IssuedEvents')
await writeFile(new URL(`../src/__generated__/types/IssuedEvents.d.ts`, import.meta.url), IssuedEventsTS)

const IssuedEventAttendanceVerifiableCredentialsTS = await compile(IssuedEventAttendanceVerifiableCredentialSchema, 'IssuedEventAttendanceVerifiableCredentials')
await writeFile(new URL(`../src/__generated__/types/IssuedEventAttendanceVerifiableCredentials.d.ts`, import.meta.url), IssuedEventAttendanceVerifiableCredentialsTS)

const HeldEventAttendanceVerifiableCredentialsTS = await compile(HeldEventAttendanceVerifiableCredentialSchema, 'HeldEventAttendanceVerifiableCredentials')
await writeFile(new URL(`../src/__generated__/types/HeldEventAttendanceVerifiableCredentials.d.ts`, import.meta.url), HeldEventAttendanceVerifiableCredentialsTS)

