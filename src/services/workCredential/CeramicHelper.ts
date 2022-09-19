import { AliasTypes, ModelTypes } from "@/interfaces";
import { aliases } from "@/__generated__/aliases";
import { TileDocument } from "@ceramicnetwork/stream-tile";
import { SelfID } from "@self.id/web";

export const getSchema = (alias: AliasTypes): string => {
  return aliases.schemas[alias];
};

export const createTileDocument = async <T>(
  selfID: SelfID<ModelTypes>,
  content: T,
  schema: string,
  tags: string[] = ["vess", "workCredential"],
  family = "VESS"
): Promise<TileDocument<T> | null> => {
  try {
    let doc = await TileDocument.create(selfID.client.ceramic, content, {
      family: family,
      controllers: [selfID.id],
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
  selfID: SelfID<ModelTypes>,
  streamId: string,
  content: T,
  schema: string,
  tags: string[] = ["vess", "workCredential"],
  family = "VESS"
) => {
  let doc;
  try {
    doc = await TileDocument.load(selfID.client.ceramic, streamId);
    await doc.update(content, {
      family: family,
      controllers: [selfID.id],
      tags: tags,
      schema: schema,
    });

    return doc.id.toUrl();
  } catch (e) {
    return null;
  }
};
