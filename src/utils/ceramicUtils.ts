import { formatDID, getImageURL } from "@self.id/framework";
import type { BasicProfile } from "@self.id/framework";

import { IPFS_URL } from "@/constants/common";
import { CryptoAccountLinks } from "@datamodels/identity-accounts-crypto";

const ethAddressRegex = /^0x[0-9a-f]{40}$/i;
export function isEthereumAddress(address: string): boolean {
  return ethAddressRegex.test(address);
}

export function isSupportedDID(did: string): boolean {
  return did.startsWith("did:3") || did.startsWith("did:key");
}

export function getProfileInfo(did: string, profile?: BasicProfile | null) {
  return {
    avatarSrc:
      profile?.image &&
      getImageURL(IPFS_URL, profile?.image, { height: 60, width: 60 }),
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
