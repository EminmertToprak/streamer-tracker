"use client";
import TopNav from "../_components/topnav";
import SideNav from "../_components/sidenav";
import template_image from "../images/twitch_ph.jpg";
import ChatBox from "../_components/chatbox";

export default function HomePage() {
  return (
    <>
      <TopNav />
      <div id="home" className="flex flex-row">
        <div id="side_nav" className="border-white-300 w-1/5 p-4 text-white">
          <SideNav />
        </div>
        <div
          id="home_content"
          className="border-white-300 flex w-4/5 flex-row gap-4 p-4 text-white"
        >
          <div
            id="home_content_inner"
            className="flex w-4/5 flex-col text-white"
          >
            <div id="stream_video" className="w-full">
              <img src={template_image.src} className="w-full" alt="" />
            </div>
            <div id="stream_info" className="w-full gap-4 p-4 text-white">
              <div id="stream_title" className="text-3xl font-bold">
                {" "}
                [streamtitle]{" "}
              </div>
              <div
                id="follower_count"
                className="text-xl font-bold text-gray-300"
              >
                {" "}
                [follower count]{" "}
              </div>
              <div
                id="stream_description"
                className="text-lg font-bold text-gray-300"
              >
                {" "}
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem,
                consequatur id vel earum est mollitia nobis doloribus possimus
                beatae esse doloremque laudantium dignissimos commodi nam quia
                asperiores qui culpa quaerat dolores sed amet iste tempore dicta
                rerum? Quibusdam ea nostrum ab placeat id, odit nam distinctio
                totam mollitia, commodi eveniet!
              </div>
            </div>
          </div>
          <div
            id="chatbox"
            className="border-white-300 flex w-1/5 flex-col items-center justify-center gap-4 p-4 text-white"
          >
            <ChatBox />
          </div>
        </div>
      </div>
    </>
  );
}
