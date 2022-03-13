import type { StreamMetadata } from "@ceramicnetwork/common";
import type { TileDocument } from "@ceramicnetwork/stream-tile";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { PublicID, useCore, useViewerID } from "@self.id/framework";

export type TileDoc<ContentType> = {
  isLoading: boolean;
  content?: ContentType;
  metadata?: StreamMetadata;
  isError: boolean;
  error?: unknown;
  isController: boolean;
  isMutable: boolean;
  isMutating: boolean;
  update(content: ContentType): Promise<void>;
};

export const useTileDoc = <ContentType>(id: string): TileDoc<ContentType> => {
  const queryClient = useQueryClient();
  const core = useCore();
  const viewerID = useViewerID();

  const {
    data: doc,
    isLoading,
    isError,
    error,
  } = useQuery<TileDocument<ContentType>>(
    id,
    async () => await core.tileLoader.load<ContentType>(id)
  );

  const isController =
    viewerID != null && doc?.metadata.controllers[0] === viewerID.id;

  const updateMutation = useMutation(
    async (content: ContentType) => {
      if (viewerID == null || viewerID instanceof PublicID || doc == null) {
        throw new Error("Cannot mutate record");
      }
      await doc.update(content);
      return doc;
    },
    {
      onSuccess: (doc: TileDocument<ContentType>) => {
        queryClient.setQueryData(id, doc);
      },
    }
  );

  return {
    content: doc?.content,
    metadata: doc?.metadata,
    error,
    isLoading,
    isError,
    isController,
    isMutable: isController && !(viewerID instanceof PublicID),
    isMutating: updateMutation.isLoading,
    update: async (content: ContentType) => {
      await updateMutation.mutateAsync(content);
    },
  };
};
