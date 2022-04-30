export type User = {
  address: string;
  name: string;
  email: string | null;
  rand: number;
  genre: string[];
  bio: string;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type DisplayProfile = {
  displayName: string;
  bio: string;
  avatarSrc?: string;
};
