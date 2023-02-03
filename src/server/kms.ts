import { ApiError } from "next/dist/server/api-utils";
import { HttpError } from "@/utils/error";
import { IssueEventAttendanceWithKMSType } from "@/interfaces/backend";
import { getEnv } from "@/utils/envUtil";

export const VESS_ENDPOINT = ["/events/attendances"] as const;
export type VESS_ENDPOINT_TYPE = typeof VESS_ENDPOINT[number];

export const isVESSEndpoint = (str: string): str is VESS_ENDPOINT_TYPE => {
  return VESS_ENDPOINT.some((v) => v === str);
};

export class KMSService {
  constructor() {}

  async issueEventAttendance(
    body: IssueEventAttendanceWithKMSType
  ): Promise<Response> {
    try {
      return await this.vessNonAuthRequest(
        "/events/attendances",
        "post",
        JSON.stringify(body)
      );
    } catch (error) {
      throw error;
    }
  }

  private async vessNonAuthRequest(
    request: VESS_ENDPOINT_TYPE,
    method: "get" | "post",
    body?: any
  ): Promise<Response> {
    try {
      return this.baseVESSRequest(request, method, body);
    } catch (error) {
      throw error;
    }
  }

  private async baseVESSRequest(
    request: VESS_ENDPOINT_TYPE,
    method: "get" | "post",
    body?: any,
    token?: string,
    ceramicOrgId?: string
  ): Promise<Response> {
    const baseUrl = getEnv("NEXT_PUBLIC_VESS_BACKEND");
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      if (ceramicOrgId) {
        headers["x-organization-ceramic-id"] = ceramicOrgId;
      }
      let result: Response;
      if (method === "get") {
        result = await fetch(`${baseUrl}${request}`, {
          method: "GET",
          headers,
        });
      } else {
        result = await fetch(`${baseUrl}${request}`, {
          method: "POST",
          headers,
          body: body,
        });
      }
      return result;
    } catch (error) {
      if (error instanceof HttpError) {
        throw new ApiError(error.status, error.message);
      }
      throw error;
    }
  }
}
