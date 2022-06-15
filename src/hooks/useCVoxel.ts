import { usePublicRecord } from "@self.id/framework";
import type { PublicRecord } from "@self.id/framework";
import { useCallback, useState } from "react";
import type {
  EditionState,
  ModelTypes,
  CVoxel,
  CVoxels,
} from "@/interfaces/cVoxelType";
import { TileDoc, useTileDoc } from "./useTileDoc";
import { useConnect } from "./useCeramicAcount";

export function useCVoxelsRecord(did: string): PublicRecord<CVoxels | null> {
  return usePublicRecord<ModelTypes, "workCredentials">("workCredentials", did);
}

export function useCVoxelRecord(id?: string): TileDoc<CVoxel> {
  return useTileDoc<CVoxel>(id);
}

export function useCVoxel(did: string, id: string) {
  const connect = useConnect();
  const cVoxelsRecord = useCVoxelsRecord(did);
  const cVoxelDoc = useTileDoc<CVoxel>(id);
  const [cVoxel, setCVoxel] = useState<CVoxel | null>(null);
  const [editionState, setEditionState] = useState<EditionState | null>(null);

  const isValid = !!cVoxel?.summary;

  const cVoxelItem = cVoxelsRecord.content?.WorkCredentials.find(
    (item) => item.id === `ceramic://${id}`
  );
  const content =
    cVoxelDoc.content == null || cVoxelItem == null ? null : cVoxelDoc.content;
  const isEditable = content != null && cVoxelDoc.isController;
  const isEditing = editionState != null;

  const resetEditingText = useCallback(() => {
    setCVoxel(null);
  }, [content]);

  const toggleEditing = useCallback(
    (editing: boolean = !isEditing) => {
      if (editing) {
        resetEditingText();
        setEditionState({ status: "pending" });
      } else {
        setEditionState(null);
      }
    },
    [isEditing, resetEditingText, setEditionState]
  );

  const update = useCallback(async () => {
    if (
      cVoxelDoc.content == null ||
      editionState == null ||
      editionState.status === "loading" ||
      !isValid
    ) {
      return false;
    }
    setEditionState({ status: "loading" });

    try {
      const selfID = await connect();
      if (selfID == null) {
        setEditionState({ status: "pending" });
        return false;
      }

      if (cVoxel !== cVoxelDoc.content) {
        await cVoxelDoc.update({
          ...cVoxelDoc.content,
          ...cVoxel,
        });
      }
      setEditionState(null);
    } catch (error) {
      setEditionState({ status: "failed", error });
    }
  }, [connect, editionState, isValid, cVoxel, cVoxelDoc, setEditionState]);

  return {
    isEditable,
    isEditing,
    isError: cVoxelsRecord.isError || cVoxelDoc.isError,
    isLoading: cVoxelsRecord.isLoading || cVoxelDoc.isLoading,
    isMutable: cVoxelDoc.isMutable,
    isMutating: cVoxelDoc.isMutating,
    isValid,
    content,
    cVoxelItem,
    cVoxel,
    error: cVoxelsRecord.error ?? cVoxelDoc.error,
    resetEditingText,
    setCVoxel,
    toggleEditing,
    update,
  };
}
