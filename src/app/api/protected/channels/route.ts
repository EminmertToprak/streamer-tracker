import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import axios from "axios";
import { db } from "~/server/db/index";
import { userProviders, users } from "~/server/db/schema";
import { eq, and } from "drizzle-orm";
import { authOptions } from "~/lib/authOptions";

interface ChannelsResponse {
  providers: { [id: string]: Channel[] };
}

interface Channel {
  name: string;
  isOnline: boolean;
}

interface TwitchResponse {
  total: number;
  data: Data[];
  pagination: Pagination;
}

interface Data {
  broadcaster_id: string;
  broadcaster_name: string;
  broadcaster_login: string;
  followed_at: string;
}

interface Pagination {
  cursor: string;
}

export async function GET(req: Request) {
  const session = await getServerSession({
    req: req as any,
    res: {} as any,
    ...authOptions,
  });
  console.log(session);
  const providers = await db
    .select()
    .from(users)
    .innerJoin(userProviders, eq(users.id, userProviders.userId))
    .where(eq(users.id, session?.user.id!));

  console.log(providers);

  let response: ChannelsResponse = { providers: {} };

  let twitchProvider = providers.filter(
    (x) => x.user_providers.provider == "twitch",
  )[0];

  console.log(twitchProvider);
  if (twitchProvider) {
    let twitchChannels = await getTwitchChannelsAsync(
      twitchProvider.user_providers.accessToken!,
      twitchProvider.user_providers.providerAccountId!,
    );
    response.providers["twitch"] = twitchChannels;
  }

  return NextResponse.json(response, { status: 200 });
}

async function getTwitchChannelsAsync(
  accessToken: string,
  userId: string,
): Promise<Channel[]> {
  try {
    const response = await axios.get<TwitchResponse>(
      "https://api.twitch.tv/helix/channels/followed",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Client-ID": process.env.TWITCH_CLIENT_ID,
        },
        params: {
          user_id: userId,
        },
      },
    );

    let result: Channel[] = response.data.data.map((x) => ({
      name: x.broadcaster_name,
      isOnline: true, //todo dummy
    }));

    return result;
  } catch (error) {
    console.error("Error fetching followed channels:", error);
    return [];
  }
}
