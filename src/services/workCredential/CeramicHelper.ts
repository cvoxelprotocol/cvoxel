import { AliasTypes } from "@/interfaces";
import { dataModel } from "@/lib/ceramic/dataModel";

import { CeramicClient } from "@ceramicnetwork/http-client";
import { TileDocument } from "@ceramicnetwork/stream-tile";

export const getSchema = (alias: AliasTypes): string => {
  return dataModel.schemas[alias];
};

export const createTileDocument = async <T>(
  client: CeramicClient,
  did: string,
  content: T,
  schema: string,
  tags: string[] = ["vess", "workCredential"],
  family = "VESS"
): Promise<TileDocument<T> | null> => {
  try {
    let doc = await TileDocument.create(client, content, {
      family: family,
      controllers: [did],
      tags: tags,
      schema: schema,
    });
    return doc;
  } catch (e) {
    console.log("Error creating TileDocument: ", e);
    return null;
  }
};

export const updateTileDocument = async <T>(
  client: CeramicClient,
  did: string,
  streamId: string,
  content: T,
  schema: string,
  tags: string[] = ["vess", "workCredential"],
  family = "VESS"
) => {
  let doc;
  try {
    doc = await TileDocument.load(client, streamId);
    await doc.update(content, {
      family: family,
      controllers: [did],
      tags: tags,
      schema: schema,
    });

    return doc.id.toUrl();
  } catch (e) {
    return null;
  }
};
