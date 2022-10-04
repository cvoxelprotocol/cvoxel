import type { StreamMetadata } from "@ceramicnetwork/common";
import type { TileDocument } from "@ceramicnetwork/stream-tile";
import { useQuery, useQueryClient } from "react-query";
import { core } from "@/lib/ceramic/server";

export type TileDoc<ContentType> = {
  isLoading: boolean;
  content?: ContentType;
  metadata?: StreamMetadata;
  isError: boolean;
  error?: unknown;
};

export const useTileDoc = <ContentType extends Record<string, any>>(
  id?: string
): TileDoc<ContentType> => {
  const queryClient = useQueryClient();

  const {
    data: doc,
    isLoading,
    isError,
    error,
  } = useQuery<TileDocument<ContentType>>(
    id || "noId",
    async () => await core.tileLoader.load<ContentType>(id || ""),
    {
      enabled: !!id,
    }
  );

  return {
    content: doc?.content,
    metadata: doc?.metadata,
    error,
    isLoading,
    isError,
  };
};
