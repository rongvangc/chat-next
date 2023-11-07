import { fallbackDisplayname } from "@/lib/utils";
import useChatStore from "@/stores/chat";
import useUserStore from "@/stores/user";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function RoomList() {
  const { rooms, setRoomSelect, getRooms } = useChatStore();
  const { user } = useUserStore();

  useEffect(() => {
    getRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return rooms.length ? (
    <Card>
      <CardHeader>
        <CardTitle>Rooms</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        {rooms?.map((item) => {
          const members = item?.userIds as User[];
          const isGroup = members?.length > 2;

          const participantIds = members?.filter(
            (member) => member._id !== user?._id
          );

          // USER CHAT
          if (!isGroup) {
            return (
              <div
                key={item?._id}
                onClick={() => setRoomSelect(item?._id, participantIds)}
                className="flex items-center justify-between space-x-4 cursor-pointer rounded-s-full rounded-e-md hover:bg-slate-50"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={participantIds?.[0]?.photoURL} />
                    <AvatarFallback>
                      {fallbackDisplayname(participantIds?.[0]?.displayName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none capitalize">
                      {participantIds?.[0]?.displayName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {participantIds?.[0]?.username}
                    </p>
                  </div>
                </div>
              </div>
            );
          }

          // GROUP CHAT
          return (
            <div
              key={item?._id}
              onClick={() => setRoomSelect(item?._id, participantIds)}
              className="flex items-center justify-between space-x-4 cursor-pointer rounded-s-full rounded-e-md hover:bg-slate-50"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>GR</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex gap-1">
                    {participantIds?.map((item, i: number) => (
                      <p
                        key={`${item?._id}-${i}`}
                        className="text-sm font-medium leading-none capitalize"
                      >
                        {item?.displayName +
                          (participantIds.length === i + 1 ? "" : ",")}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  ) : (
    <></>
  );
}
