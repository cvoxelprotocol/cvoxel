import { WorkCredentialForm } from "@/interfaces";
import { atom, useRecoilState } from "recoil";

export const issueStatus = atom<"completed" | "issuing" | "failed" | undefined>(
  {
    key: "issueStatus",
    default: undefined,
  }
);

export const useStateIssueStatus = () => useRecoilState(issueStatus);
