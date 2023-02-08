import { IssueEventAttendanceWithKMSType } from "@/interfaces/backend";
import { VESS_ENDPOINT_TYPE } from "@/server/kms";
import { getEnv } from "@/utils/envUtil";
import { isGoodResponse } from "@/utils/http";
import { getCurrentDomain } from "@/utils/url";
import { addCeramicPrefix, EventAttendanceWithId } from "vess-sdk";

export const issueEventAttendance = async (
  ceramicId: string,
  body: IssueEventAttendanceWithKMSType
): Promise<EventAttendanceWithId[]> => {
  try {
    const res = await baseVessApi(
      "/events/attendances",
      ceramicId,
      "POST",
      body
    );
    console.log({ res });
    if (isGoodResponse(res.status)) {
      const resJson = await res.json();
      return resJson as EventAttendanceWithId[];
    }
    return [];
  } catch (error) {
    throw error;
  }
};

const baseVessApi = async (
  endpoint: VESS_ENDPOINT_TYPE,
  ceramicOrgId?: string,
  method: "GET" | "POST" = "POST",
  body?: any
): Promise<Response> => {
  try {
    const url = `${
      getCurrentDomain() || getEnv("AUTH0_BASE_URL")
    }/api/vessApi?endpoint=${endpoint}&ceramicOrgId=${
      ceramicOrgId ? addCeramicPrefix(ceramicOrgId) : ""
    }`;
    if (method === "GET") {
      return await fetch(url);
    } else {
      return await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...body }),
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
