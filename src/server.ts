import { RequestClient } from "@self.id/framework";
import { RequestState } from "@self.id/framework";
import type { GetServerSidePropsContext } from "next";

import { CERAMIC_NETWORK, CERAMIC_URL } from "@/constants/common";
// import model from "./model-cray.json";
import model from "./model.json";
import type { ModelTypes } from "@/interfaces/cVoxelType";

export function createRequestClient(
  ctx: GetServerSidePropsContext
): RequestClient<ModelTypes> {
  return new RequestClient({
    ceramic: CERAMIC_URL || "https://ceramic-clay.3boxlabs.com",
    cookie: ctx.req.headers.cookie,
    model,
  });
}

export async function getRequestState(
  ctx: GetServerSidePropsContext,
  did?: string
): Promise<RequestState> {
  const requestClient = createRequestClient(ctx);

  const prefetch = [];
  if (did != null) {
    prefetch.push(requestClient.prefetch("cVoxels", did));
    requestClient.prefetch("basicProfile", did);
  }
  if (requestClient.viewerID != null) {
    prefetch.push(
      requestClient.prefetch("basicProfile", requestClient.viewerID)
    );
  }
  await Promise.all([prefetch]);

  return requestClient.getState();
}
