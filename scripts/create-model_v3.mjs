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
import {WorkCredentialSchema, VerifiableCredentialSchema, Organization, MemberShip, MembershipSubject} from "./schema.mjs"
import { model as OldWorkCredentialModel } from './models/OldWorkCredentials/dist/index.mjs'
import { compile } from 'json-schema-to-typescript'

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
const VerifiableCredentialSchemaID = await manager.createSchema('VerifiableWorkCredential', VerifiableCredentialSchema)
const HeldVerifiableWorkCredentialsSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "HeldVerifiableWorkCredentials",
  "type": "object",
  "properties": {
    "held": {
      "type": "array",
      "items": {
        "type": "string",
        "$comment": `cip88:ref:${manager.getSchemaURL(VerifiableCredentialSchemaID)}`,
        "pattern": "^ceramic://.+(\\?version=.+)?",
        "maxLength": 200,
      },
      "default": [],
      "additionalProperties":false,
    }
  },
}
const HeldWorkCredentialsSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "HeldWorkCredentials",
  "type": "object",
  "properties": {
    "held": {
      "type": "array",
      "items": {
        "type": "string",
        "$comment": `cip88:ref:${manager.getSchemaURL(WorkCredentialSchemaID)}`,
        "pattern": "^ceramic://.+(\\?version=.+)?",
        "maxLength": 200,
      },
      "default": [],
      "additionalProperties":false,
    }
  },
}

const HeldWorkCredentialsSchemaID = await manager.createSchema('HeldWorkCredentials', HeldWorkCredentialsSchema)
const HeldVerifiableWorkCredentialsSchemaID = await manager.createSchema('HeldVerifiableWorkCredentials', HeldVerifiableWorkCredentialsSchema)
const OrganizationSchemaID = await manager.createSchema('Organization', Organization)
const MemberShipSchemaID = await manager.createSchema('MemberShip', MemberShip)
const MembershipSubjectSchemaID = await manager.createSchema('MembershipSubject', MembershipSubject)

console.log({WorkCredentialSchemaID})
console.log({VerifiableCredentialSchemaID})
console.log({HeldWorkCredentialsSchemaID})
console.log({HeldVerifiableWorkCredentialsSchemaID})
console.log({OrganizationSchemaID})
console.log({MemberShipSchemaID})
console.log({MembershipSubjectSchemaID})

// Create the definition using the created schema ID
const wc = await manager.createDefinition('workCredential', {
  name: 'workCredential',
  description: 'workCredential',
  schema: manager.getSchemaURL(WorkCredentialSchemaID),
})
const verifiableWc = await manager.createDefinition('verifiableWorkCredential', {
  name: 'verifiableWorkCredential',
  description: 'verifiableWorkCredential',
  schema: manager.getSchemaURL(VerifiableCredentialSchemaID),
})

const heldWorkCredentials = await manager.createDefinition('heldWorkCredentials', {
  name: 'heldWorkCredentials',
  description: 'heldWorkCredentials',
  schema: manager.getSchemaURL(HeldWorkCredentialsSchemaID),
})

const heldVerifiableWorkCredentials = await manager.createDefinition('heldVerifiableWorkCredentials', {
  name: 'heldVerifiableWorkCredentials',
  description: 'heldVerifiableWorkCredentials',
  schema: manager.getSchemaURL(HeldVerifiableWorkCredentialsSchemaID),
})

const memberShip = await manager.createDefinition('MemberShip', {
  name: 'memberShip',
  description: 'memberShip',
  schema: manager.getSchemaURL(MemberShipSchemaID),
})

const organization = await manager.createDefinition('Organization', {
  name: 'organization',
  description: 'organization',
  schema: manager.getSchemaURL(OrganizationSchemaID),
})

const membershipSubject = await manager.createDefinition('MembershipSubject', {
  name: 'membershipSubject',
  description: 'membershipSubject',
  schema: manager.getSchemaURL(MembershipSubjectSchemaID),
})



console.log({wc})
console.log({verifiableWc})
console.log({heldVerifiableWorkCredentials})
console.log({heldWorkCredentials})
console.log({memberShip})
console.log({organization})
console.log({membershipSubject})

// Write model to JSON file
await writeFile(new URL(`${modelJsonName}`, import.meta.url), JSON.stringify(manager.toJSON()))
console.log(`Encoded model written to ${modelJsonName}`)

// generate type
const WorkCredentialSchemaTS = await compile(WorkCredentialSchema, 'WorkCredential')
await writeFile(new URL(`../src/__generated__/types/WorkCredential.d.ts`, import.meta.url), WorkCredentialSchemaTS)

const VerifiableCredentialSchemaTS = await compile(VerifiableCredentialSchema, 'VerifiableWorkCredential')
await writeFile(new URL(`../src/__generated__/types/VerifiableWorkCredential.d.ts`, import.meta.url), VerifiableCredentialSchemaTS)

const HeldWorkCredentialsSchemaTS = await compile(HeldWorkCredentialsSchema, 'HeldWorkCredentials')
await writeFile(new URL(`../src/__generated__/types/HeldWorkCredentials.d.ts`, import.meta.url), HeldWorkCredentialsSchemaTS)

const HeldVerifiableWorkCredentialsSchemaTS = await compile(HeldVerifiableWorkCredentialsSchema, 'HeldVerifiableWorkCredentials')
await writeFile(new URL(`../src/__generated__/types/HeldVerifiableWorkCredentials.d.ts`, import.meta.url), HeldVerifiableWorkCredentialsSchemaTS)

const OrganizationTS = await compile(Organization, 'Organization')
await writeFile(new URL(`../src/__generated__/types/Organization.d.ts`, import.meta.url), OrganizationTS)

const MemberShipTS = await compile(MemberShip, 'MemberShip')
await writeFile(new URL(`../src/__generated__/types/MemberShip.d.ts`, import.meta.url), MemberShipTS)

const MembershipSubjectTS = await compile(MembershipSubject, 'MembershipSubject')
await writeFile(new URL(`../src/__generated__/types/MembershipSubject.d.ts`, import.meta.url), MembershipSubjectTS)