import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    token: {
      id: string;
    };
  }

  interface Profile {
    preferred_username: string | null;
  }

  interface JWT {
    accessToken?: string;
    id: string
  }
}
