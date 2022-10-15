/* eslint-disable */
import { Orbis } from "@orbisclub/orbis-sdk";

export const fetchOrbisProfile = async (
  did?: string
): Promise<OrbisProfileDetail | undefined> => {
  if (!did) return undefined;
  let orbis = new Orbis(undefined);
  const res = await orbis.getProfile(did.toLowerCase());
  const profile: OrbisProfile = res.data as OrbisProfile;
  return profile.details.profile;
};

export type OrbisProfile = {
  did: string;
  details: OrbisDetails;
  count_followers: number;
  count_following: number;
  last_activity_timestamp: number;
};

type OrbisDetails = {
  profile: OrbisProfileDetail;
  did: string;
};

export type OrbisProfileDetail = {
  username: string;
  description: string;
  pfp: string;
};
