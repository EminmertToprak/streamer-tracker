import { NextAuthOptions } from "next-auth";
import TwitchProvider from "next-auth/providers/twitch";
import { db } from "~/server/db/index";
import { userProviders, users } from "~/server/db/schema";
import { eq, and } from "drizzle-orm";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID!,
      clientSecret: process.env.TWITCH_CLIENT_SECRET!,
      authorization: {
        params: { scope: "user:read:follows openid user:read:email" },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!account) {
        console.error("Account object is null");
        return false;
      }

      const providerAccountId = account.providerAccountId;
      const provider = account.provider;

      const existingUserWithProviders = await db
        .select()
        .from(users)
        .innerJoin(userProviders, eq(users.id, userProviders.userId))
        .where(
          and(
            eq(userProviders.provider, provider),
            eq(userProviders.providerAccountId, providerAccountId),
          ),
        )
        .limit(1);
      const existingUserWithProvider = existingUserWithProviders?.at(0);

      //user & login found
      if (existingUserWithProvider) {
        await db
          .update(userProviders)
          .set({
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
          })
          .where(eq(userProviders.userId, existingUserWithProvider.users.id));

        return true;
      }

      //user has email TODO fix this to include current session
      if (user.email) {
        const existingUsers = await db
          .select()
          .from(users)
          .where(eq(users.email, user.email))
          .limit(1);
        const existingUser = existingUsers?.at(0);

        //user found login not found
        if (existingUser) {
          await db.insert(userProviders).values({
            userId: existingUser.id,
            provider: provider,
            providerAccountId: providerAccountId,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
          });

          return true;
        }

        //user & login not found
        if (!existingUser) {
          let userId: string | undefined;
          await db.transaction(async (tx) => {
            const result = await tx
              .insert(users)
              .values({
                displayName: profile?.preferred_username ?? user.name,
                email: user.email,
              })
              .returning({ userId: users.id });

            userId = result[0]?.userId;

            await tx.insert(userProviders).values({
              userId: result[0]?.userId,
              provider: provider,
              providerAccountId: providerAccountId,
              accessToken: account.access_token,
              refreshToken: account.refresh_token,
            });
          });

          if (!userId) return false;

          return true;
        }
      }

      return true;
    },
    async session({ session, token }) {
      if (!token.sub) return session;

      const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, token.sub!),
      });

      if (user) {
        session.user = {
          id: user.id,
          email: user.email,
          name: user.displayName,
        };
      }

      return session;
    },
    async jwt({ token, user, account, profile, session, trigger }) {
      if (session) {
        token.sub = session.id;
        token.email = session.email;
        token.name = session.name;

        return token;
      }

      if (!account) return token;
      const providerAccountId = account.providerAccountId;
      const provider = account.provider;

      const existingUserWithProviders = await db
        .select()
        .from(users)
        .innerJoin(userProviders, eq(users.id, userProviders.userId))
        .where(
          and(
            eq(userProviders.provider, provider),
            eq(userProviders.providerAccountId, providerAccountId),
          ),
        )
        .limit(1);
      const existingUserWithProvider = existingUserWithProviders?.at(0);

      if (existingUserWithProvider) {
        token.sub = existingUserWithProvider.users.id;
        token.email = existingUserWithProvider.users.email;
        token.name = existingUserWithProvider.users.displayName;
      }

      return token;
    },
  },
};
