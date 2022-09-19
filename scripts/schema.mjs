import Work from "./schemas/WorkSubject.json" assert { type: "json" }
import Client from "./schemas/Client.json" assert { type: "json" }
import Deliverables from "./schemas/Deliverables.json" assert { type: "json" }
import SignatureEvidence from "./schemas/Signature.json" assert { type: "json" }
import Transaction from "./schemas/Transaction.json" assert { type: "json" }

export * as Organization from "./schemas/Organization.json" assert { type: "json" }
export * as MemberShip from "./schemas/MemberShip.json" assert { type: "json" }
export * as MembershipSubject from "./schemas/MembershipSubject.json" assert { type: "json" }


export const Evidences = {
  "type": "array",
  "title": "Evidences",
  "items": {
    "type": "object",
    "title": "Evidence",
    "properties": {
      "id": { "type": "string" },
      "type": {
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "verifier": { "type": "string" },
      "evidenceDocument": { "type": "string" },
      "subjectPresence": { "type": "string" },
      "documentPresence": { "type": "string" },
      "item": {
        "oneOf": [
          Transaction,
          Deliverables,
          SignatureEvidence
        ]
      },
    },
    "required": ["id", "type"],
    "additionalProperties": true
  }
}

export const WorkCredentialSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "WorkCredential",
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "maxLength": 240
      },
      "subject": {
        "title": "WorkSubject",
        "type": "object",
        "properties": {
          "work": Work,
          "tx": Transaction,
          "deliverables": Deliverables,
          "client": Client,
        }
      },
      "signature": SignatureEvidence,
      "createdAt": {
        "type": "string",
        "title": "createdAt"
      },
      "updatedAt": {
        "type": "string",
        "title": "updatedAt"
      }
    },
    "required": ["id", "subject"],
    "additionalProperties":false
}

export const VerifiableCredentialSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "VerifiableWorkCredential",
    "type": "object",
    "properties": {
      "@context": {
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "type": {
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "id": {
        "type": "string",
        "maxLength": 240
      },
      "issuer": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "ethereumAddress": { "type": "string" }
        },
        "required": ["id"]
      },
      "credentialSubject": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "maxLength": 240
          },
        },
        "required": ["id"],
        "additionalProperties": true
      },
      "credentialSchema": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "type": { "type": "string" }
        },
        "required": ["id", "type"],
        "additionalProperties": false
      },
      "issuanceDate": {
        "type": "string"
      },
      "expirationDate": {
        "type": "string"
      },
      "proof": {
        "type": "object",
        "properties": {
          "type": { "type": "string" },
          "verificationMethod": { "type": "string" },
          "ethereumAddress": { "type": "string" },
          "created": { "type": "string" },
          "proofPurpose": { "type": "string" },
          "proofValue": { "type": "string" },
          "eip712": {
            "type": "object",
            "properties": {
              "domain": {
                "type": "object",
                "properties": {
                  "chainId": { "type": "integer" },
                  "name": { "type": "string" },
                  "version": { "type": "string" },
                  "verifyingContract": { "type": "string" }
                },
                "required": ["chainId", "name", "version"],
                "additionalProperties": false
              },
              "types": {
                "type": "object"
              },
              "primaryType": { "type": "string" }
            },
            "required": ["domain", "types", "primaryType"],
            "additionalProperties": false
          }
        },
        "required": ["type"]
      },
      "evidence": Evidences,
      "credentialStatus": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "type": { "type": "string" }
        },
        "required": ["id", "type"],
        "additionalProperties": false
      },
      "updatedAt": {
        "type": "string",
        "title": "updatedAt"
      }
    },
    "required": [
      "@context",
      "type",
      "id",
      "issuer",
      "credentialSubject",
      "credentialSchema",
      "issuanceDate"
    ],
    "additionalProperties": false
}
