import { ApiError } from "next/dist/server/api-utils";
import { isVESSEndpoint, KMSService } from "@/server/kms";
import { HttpStatus } from "@/utils/error";
import { isGoodResponse } from "@/utils/http";
import { NextApiRequest, NextApiResponse } from "next";

export default async function products(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const endpoint = req.query.endpoint as string;
    const method = req.method;
    const ceramicOrgId = req.query.ceramicOrgId as string;
    if (isVESSEndpoint(endpoint) && method) {
      const client = new KMSService();
      let result: Response;
      switch (endpoint) {
        case "/events/attendances":
          if (method === "POST") {
            result = await client.issueEventAttendance(req.body);
            if (isGoodResponse(result.status)) {
              const resJson = await result.json();
              res.status(result.status).json(resJson);
              break;
            }
            res.status(result.status).end();
          } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
          }
          break;
        default:
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
          break;
      }
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).end("endpoint error");
    }
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      res.status(error.statusCode).end(error.message);
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
    }
  }
}
