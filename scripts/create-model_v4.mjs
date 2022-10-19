import { writeFile } from 'node:fs/promises'
import { CeramicClient } from '@ceramicnetwork/http-client'
import { ModelManager } from '@glazed/devtools'
import { DID } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver } from 'key-did-resolver'
import { fromString } from 'uint8arrays'
import dotenv from 'dotenv'

import { compile } from 'json-schema-to-typescript'

import { devModel, prodModel } from './models/v3/dist/index.mjs'
import { VerifiableMembershipSubjectCredentialSchema } from './schema.mjs'

dotenv.config();

if (!process.env.SEED) {
  throw new Error('Missing SEED environment variable')
}

// const ENVIRONMENT = "prod"
const ENVIRONMENT = "dev"

console.log("ENVIRONMENT: ", ENVIRONMENT)

const modelJsonName = `model_${ENVIRONMENT}_v4.json`
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

const v3Model = ENVIRONMENT === "prod" ? prodModel : devModel

manager.addJSONModel(v3Model)

const ORGANIZATION_DEV = "ceramic://k3y52l7qbv1fryaz619mfc1d50rq96t1od3j08rlwjh5mjr382fed6k368rn8q4u8"
const MEMBERSHIP_DEV = "ceramic://k3y52l7qbv1fry12cofeesgz3phnr3ppusdzy8kevmqkzonj5obmi7mzqdydapybk"
const MEMBERSHIP_SUBJECT_DEV = "ceramic://k3y52l7qbv1fry33z1ie2xl3gcgnaft9nviq2h2pi5xxj55y505dainl4z7do3bpc"
const ORGANIZATION_PROD = "ceramic://k3y52l7qbv1frxlarqwlxy7uozpo7hy6t3wyct3cv4ibscv2smxxfhsbx2labpedc"
const MEMBERSHIP_PROD = "ceramic://k3y52l7qbv1fry96pqami38jzufty7ovstaqis0jys0cuvn3zzqbwawbsxwpxheyo"
const MEMBERSHIP_SUBJECT_PROD = "ceramic://k3y52l7qbv1frxox7068huf9wkllb4f714ppop3i1t8rfp0er5hgmmiv53j4tol4w"

const orgSchema = ENVIRONMENT === "prod" ? ORGANIZATION_PROD : ORGANIZATION_DEV
const memberSchema = ENVIRONMENT === "prod" ? MEMBERSHIP_PROD : MEMBERSHIP_DEV
const memberSubjectSchema = ENVIRONMENT === "prod" ? MEMBERSHIP_SUBJECT_PROD : MEMBERSHIP_SUBJECT_DEV

// Create the schemas
const VerifiableMembershipSubjectCredentialSchemaID = await manager.createSchema('VerifiableMembershipSubjectCredential', VerifiableMembershipSubjectCredentialSchema)

const CreatedOrganizationsSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "CreatedOrganizations",
  "type": "object",
  "properties": {
    "created": {
      "type": "array",
      "items": {
        "type": "string",
        "$comment": `cip88:ref:${orgSchema}`,
        "pattern": "^ceramic://.+(\\?version=.+)?",
        "maxLength": 200,
      },
      "default": [],
      "additionalProperties":false,
    }
  },
}
const CreatedMembershipsSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "CreatedMemberships",
  "type": "object",
  "properties": {
    "created": {
      "type": "array",
      "items": {
        "type": "string",
        "$comment": `cip88:ref:${memberSchema}`,
        "pattern": "^ceramic://.+(\\?version=.+)?",
        "maxLength": 200,
      },
      "default": [],
      "additionalProperties":false,
    }
  },
}

const CreatedMembershipSubjectsSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "CreatedMembershipSubjects",
  "type": "object",
  "properties": {
    "created": {
      "type": "array",
      "items": {
        "type": "string",
        "$comment": `cip88:ref:${memberSubjectSchema}`,
        "pattern": "^ceramic://.+(\\?version=.+)?",
        "maxLength": 200,
      },
      "default": [],
      "additionalProperties":false,
    }
  },
}

const IssuedVerifiableMembershipSubjectsSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "IssuedVerifiableMembershipSubjects",
  "type": "object",
  "properties": {
    "issued": {
      "type": "array",
      "items": {
        "type": "string",
        "$comment": `cip88:ref:${manager.getSchemaURL(VerifiableMembershipSubjectCredentialSchemaID)}`,
        "pattern": "^ceramic://.+(\\?version=.+)?",
        "maxLength": 200,
      },
      "default": [],
      "additionalProperties":false,
    }
  },
}

const HeldVerifiableMembershipSubjectSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "HeldVerifiableMembershipSubjects",
  "type": "object",
  "properties": {
    "held": {
      "type": "array",
      "items": {
        "type": "string",
        "$comment": `cip88:ref:${manager.getSchemaURL(VerifiableMembershipSubjectCredentialSchemaID)}`,
        "pattern": "^ceramic://.+(\\?version=.+)?",
        "maxLength": 200,
      },
      "default": [],
      "additionalProperties":false,
    }
  },
}


const CreatedOrganizationsSchemaID = await manager.createSchema('CreatedOrganizations', CreatedOrganizationsSchema)
const CreatedMembershipsSchemaID = await manager.createSchema('CreatedMemberships', CreatedMembershipsSchema)
const CreatedMembershipSubjectsSchemaID = await manager.createSchema('CreatedMembershipSubjects', CreatedMembershipSubjectsSchema)
const IssuedVerifiableMembershipSubjectsSchemaID = await manager.createSchema('IssuedVerifiableMembershipSubjects', IssuedVerifiableMembershipSubjectsSchema)
const HeldVerifiableMembershipSubjectSchemaID = await manager.createSchema('HeldVerifiableMembershipSubjects', HeldVerifiableMembershipSubjectSchema)

console.log({CreatedOrganizationsSchemaID})
console.log({CreatedMembershipsSchemaID})
console.log({CreatedMembershipSubjectsSchemaID})
console.log({VerifiableMembershipSubjectCredentialSchemaID})
console.log({HeldVerifiableMembershipSubjectSchemaID})
console.log({IssuedVerifiableMembershipSubjectsSchemaID})

// Create the definition using the created schema ID
const CreatedOrganizations = await manager.createDefinition('CreatedOrganizations', {
  name: 'CreatedOrganizations',
  description: 'CreatedOrganizations',
  schema: manager.getSchemaURL(CreatedOrganizationsSchemaID),
})
const CreatedMemberships = await manager.createDefinition('CreatedMemberships', {
  name: 'CreatedMemberships',
  description: 'CreatedMemberships',
  schema: manager.getSchemaURL(CreatedMembershipsSchemaID),
})

const CreatedMembershipSubjects = await manager.createDefinition('CreatedMembershipSubjects', {
  name: 'CreatedMembershipSubjects',
  description: 'CreatedMembershipSubjects',
  schema: manager.getSchemaURL(CreatedMembershipSubjectsSchemaID),
})

const VerifiableMembershipSubjectCredential = await manager.createDefinition('VerifiableMembershipSubjectCredential', {
  name: 'VerifiableMembershipSubjectCredential',
  description: 'VerifiableMembershipSubjectCredential',
  schema: manager.getSchemaURL(VerifiableMembershipSubjectCredentialSchemaID),
})

const HeldVerifiableMembershipSubjects = await manager.createDefinition('HeldVerifiableMembershipSubjects', {
  name: 'HeldVerifiableMembershipSubjects',
  description: 'HeldVerifiableMembershipSubjects',
  schema: manager.getSchemaURL(HeldVerifiableMembershipSubjectSchemaID),
})

const IssuedVerifiableMembershipSubjects = await manager.createDefinition('IssuedVerifiableMembershipSubjects', {
  name: 'IssuedVerifiableMembershipSubjects',
  description: 'IssuedVerifiableMembershipSubjects',
  schema: manager.getSchemaURL(IssuedVerifiableMembershipSubjectsSchemaID),
})


console.log({CreatedOrganizations})
console.log({CreatedMemberships})
console.log({CreatedMembershipSubjects})
console.log({VerifiableMembershipSubjectCredential})
console.log({HeldVerifiableMembershipSubjects})
console.log({IssuedVerifiableMembershipSubjects})



// Write model to JSON file
await writeFile(new URL(`${modelJsonName}`, import.meta.url), JSON.stringify(manager.toJSON()))
console.log(`Encoded model written to ${modelJsonName}`)

// generate type
const CreatedOrganizationsTS = await compile(CreatedOrganizationsSchema, 'CreatedOrganizations')
await writeFile(new URL(`../src/__generated__/types/CreatedOrganizations.d.ts`, import.meta.url), CreatedOrganizationsTS)

const CreatedMembershipsTS = await compile(CreatedMembershipsSchema, 'CreatedMemberships')
await writeFile(new URL(`../src/__generated__/types/CreatedMemberships.d.ts`, import.meta.url), CreatedMembershipsTS)

const CreatedMembershipSubjectsTS = await compile(CreatedMembershipSubjectsSchema, 'CreatedMembershipSubjects')
await writeFile(new URL(`../src/__generated__/types/CreatedMembershipSubjects.d.ts`, import.meta.url), CreatedMembershipSubjectsTS)

const VerifiableMembershipSubjectCredentialTS = await compile(VerifiableMembershipSubjectCredentialSchema, 'VerifiableMembershipSubjectCredential')
await writeFile(new URL(`../src/__generated__/types/VerifiableMembershipSubjectCredential.d.ts`, import.meta.url), VerifiableMembershipSubjectCredentialTS)

const IssuedVerifiableMembershipSubjectsTS = await compile(IssuedVerifiableMembershipSubjectsSchema, 'IssuedVerifiableMembershipSubjects')
await writeFile(new URL(`../src/__generated__/types/IssuedVerifiableMembershipSubjects.d.ts`, import.meta.url), IssuedVerifiableMembershipSubjectsTS)

const HeldVerifiableMembershipSubjectsTS = await compile(HeldVerifiableMembershipSubjectSchema, 'HeldVerifiableMembershipSubjects')
await writeFile(new URL(`../src/__generated__/types/HeldVerifiableMembershipSubjects.d.ts`, import.meta.url), HeldVerifiableMembershipSubjectsTS)
