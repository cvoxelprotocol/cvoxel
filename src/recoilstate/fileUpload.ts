import { atom, useRecoilState } from "recoil";

export const uploadStatus = atom<
  "completed" | "uploading" | "failed" | undefined
>({
  key: "uploadStatus",
  default: undefined,
});

export const useStateUploadStatus = () => useRecoilState(uploadStatus);

export const uploadedCID = atom<string | undefined>({
  key: "uploadedCID",
  default: undefined,
});

export const useStateUploadedCID = () => useRecoilState(uploadedCID);
