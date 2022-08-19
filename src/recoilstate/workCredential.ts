import { CVoxel } from "@/interfaces";
import { atom, useRecoilState, useSetRecoilState } from "recoil";

export const issueStatus = atom<"completed" | "issuing" | "failed" | undefined>(
  {
    key: "issueStatus",
    default: undefined,
  }
);

export const useStateIssueStatus = () => useRecoilState(issueStatus);

export const selectedWC = atom<CVoxel | null>({
  key: "selectedWC",
  default: null,
});

export const useStateSelectedWC = () => useRecoilState(selectedWC);
export const useSetSelectedWC = () => useSetRecoilState(selectedWC);
