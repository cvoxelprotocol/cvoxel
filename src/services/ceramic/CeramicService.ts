import { CERAMIC_URL } from "@/constants/common";
import { Core } from "@self.id/framework";

export const core = new Core({
  ceramic: CERAMIC_URL || "https://ceramic-clay.3boxlabs.com",
});
