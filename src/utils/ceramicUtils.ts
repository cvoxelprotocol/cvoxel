import { formatDID, getImageURL } from "@self.id/framework";
import type { BasicProfile } from "@self.id/framework";

import { IPFS_URL } from "@/constants/common";
import { CryptoAccountLinks } from "@datamodels/identity-accounts-crypto";

export function getProfileInfo(did: string, profile?: BasicProfile | null) {
  return {
    avatarSrc: getImageURL(IPFS_URL, profile?.image, { height: 60, width: 60 }),
    displayName: profile?.name ?? formatDID(did, 20),
    bio: profile?.description ?? "",
  };
}

export function getAddressInfo(
  did: string,
  accounts?: CryptoAccountLinks | null
) {
  if (!accounts) return [];
  const addresses = Object.keys(accounts).map((k) => {
    const a = k.match(/@eip155/);
  });
}
