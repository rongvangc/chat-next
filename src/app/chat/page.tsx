"use client";

import { Chat } from "@/components/chat";
import { RoomList } from "@/components/room-list";
import { SearchUser } from "@/components/search-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn, fallbackDisplayname } from "@/lib/utils";
import useChatStore from "@/stores/chat";
import useUserStore from "@/stores/user";
import { LogOut, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ChatPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { replace } = useRouter();
  const { showMobileDraw, setShowMobileDraw } = useChatStore();
  const { user, getUserInfo, logout } = useUserStore();

  const handleLogout = () => {
    logout();
    replace("/");
  };

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return (
    <div className="container mx-auto p-0 md:py-4 h-screen overflow-hidden">
      <div className="grid grid-cols-4 row-span-1 gap-4 h-full">
        <div
          className={cn(
            "col-span-4 bg-white rounded-xl h-full w-full p-4 pt-0 left-0 top-0 md:col-span-1 absolute md:relative activeDraw md:visible md:translate-x-0",
            showMobileDraw ? "active" : ""
          )}
        >
          <div className="flex md:hidden justify-end mb-2">
            <Button variant="outline" onClick={() => setShowMobileDraw(false)}>
              <XCircle size={16} />
            </Button>
          </div>
          <div className="flex md:hidden items-center justify-between gap-4">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={user?.photoURL} />
                  <AvatarFallback>
                    {fallbackDisplayname(user?.username)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{""}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={handleLogout}>
                <LogOut size={12} />
              </Button>
            </div>
          </div>
          <div className="pb-4">
            <SearchUser />
          </div>
          <div className="pb-4">
            <RoomList />
          </div>
        </div>
        <div className="col-span-4 md:col-span-3">
          <Chat />
        </div>
      </div>
    </div>
  );
}
