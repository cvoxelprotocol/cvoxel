import { Orbis } from "@orbisclub/orbis-sdk";

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

export class OrbisHelper {
  orbis = undefined as Orbis | undefined;

  constructor() {
    this.orbis = new Orbis();
  }

  async fetchOrbisProfile(did?: string): Promise<OrbisProfileDetail | null> {
    if (!did || !this.orbis) return null;
    const res = await this.orbis.getProfile(did.toLowerCase());
    const profile: OrbisProfile = res.data as OrbisProfile;
    if (!profile || !profile.details || !profile.details.profile) return null;
    return profile.details.profile;
  }
}

let orbisHelper: OrbisHelper;

export const getOrbisHelper = (): OrbisHelper => {
  if (orbisHelper) {
    return orbisHelper;
  }
  orbisHelper = new OrbisHelper();
  return orbisHelper;
};
