import { SelfID } from "@self.id/web";
import { CVoxel, ModelTypes } from "@/interfaces";
import { TileDocument } from "@ceramicnetwork/stream-tile";

const WorkCredentialSchema =
  "k3y52l7qbv1frxlqnopwhl2tpnw4inawt7upovcr7d0dqtws5t9tn99pigg7ehlvk";
// const WorkCredentialDefinition = "kjzl6cwe1jw1491q8fzv2iy6qk20bi4y2deifkxut9njnuztq822duslj2m3wuv"

// const WorkCredentialsSchema =
//   "k3y52l7qbv1fryh5yum8uvbtm4a0t63fu1tp2saaxlx0d5ibwfp786yk5h647qj9c";
// const WorkCredentialsDefinition =
//   "kjzl6cwe1jw1468dfi4s2xvft87skxxlp43pz9sscd897fw1zbl1k507u6z7pqv";

export class CeramicService {
  selfID = undefined as SelfID<ModelTypes> | undefined;

  constructor(selfID?: SelfID<ModelTypes>) {
    this.selfID = selfID;
  }

  setSelfID(selfID?: SelfID<ModelTypes>) {
    this.selfID = selfID;
  }

  async setWorkCredential(content: CVoxel): Promise<string | undefined> {
    if (!this.selfID) return undefined;
    const doc = await this.createTileDocument<CVoxel>(
      content,
      WorkCredentialSchema
    );
    console.log({ doc });

    return doc?.id.toUrl();
  }

  async createTileDocument<T>(
    content: T,
    schema: string,
    tags: string[] = ["vess", "workCredential"],
    family = "VESS"
  ): Promise<TileDocument<T> | null> {
    if (!this.selfID) return null;
    try {
      let doc = await TileDocument<T>.create(
        this.selfID.client.ceramic,
        content,
        {
          family: family,
          controllers: [this.selfID.did.id],
          tags: tags,
          schema: schema,
        }
      );
      return doc;
    } catch (e) {
      console.log("Error creating TileDocument: ", e);
      return null;
    }
  }

  async updateTileDocument<T>(
    streamId: string,
    content: T,
    schema: string,
    tags: string[] = ["vess", "workCredential"],
    family = "VESS"
  ) {
    if (!this.selfID) return null;
    let doc;
    try {
      doc = await TileDocument.load(this.selfID.client.ceramic, streamId);
      await doc.update(content, {
        family: family,
        controllers: [this.selfID.did.id],
        tags: tags,
        schema: schema,
      });

      return doc.id.toUrl();
    } catch (e) {
      return null;
    }
  }
}

let ceramicService: CeramicService;

export const getCeramicService = (): CeramicService => {
  if (ceramicService) {
    return ceramicService;
  }
  ceramicService = new CeramicService();
  return ceramicService;
};
