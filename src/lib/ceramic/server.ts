import { isDIDstring, RequestClient } from "@self.id/framework";
import { RequestState } from "@self.id/framework";
import type { GetServerSidePropsContext } from "next";

import { CERAMIC_URL } from "@/constants/common";
import { cVoxelModel } from "@/lib/ceramic/dataModel";
import type { ModelTypes } from "@/interfaces/cVoxelType";
import { isSupportedDID } from "../../utils/ceramicUtils";
import { Core } from "@self.id/framework";

export const core = new Core({
  ceramic: CERAMIC_URL,
});

export const createRequestClient = (
  ctx: GetServerSidePropsContext
): RequestClient<ModelTypes> => {
  return new RequestClient({
    ceramic: CERAMIC_URL,
    cookie: ctx.req.headers.cookie,
    aliases: cVoxelModel,
  });
};

export const getRequestState = async (
  ctx: GetServerSidePropsContext,
  did?: string
): Promise<RequestState> => {
  const requestClient = createRequestClient(ctx);
  const prefetch = [];
  if (!did) return requestClient.getState();

  if (isDIDstring(did)) {
    if (isSupportedDID(did)) {
      prefetch.push(requestClient.prefetch("workCredentials", did));
      prefetch.push(requestClient.prefetch("basicProfile", did));
      await Promise.all(prefetch);
    }
  }
  return requestClient.getState();
};
