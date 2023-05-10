export type UserDetails = {
  id: string /* primary key */;
  email: string;
  full_name: string;
  avatar_url?: string;
  username: string | null;
};
