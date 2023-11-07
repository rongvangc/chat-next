import EmptySvg from "@/assets/images/empty-chat.svg";
import { cn, fallbackDisplayname } from "@/lib/utils";
import useChatStore from "@/stores/chat";
import useUserStore from "@/stores/user";
import { Menu, Send } from "lucide-react";
import Image from "next/image";
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import usePusherEvent from "@/hooks/usePusherEvent";
import { saveRoomMessage } from "@/services/room";
import { PusherEvent } from "@/lib/pusherEvent";

export function Chat() {
  const [messageText, setMessageText] = useState<string>("");
  const { roomMessages, rooms, roomSelect, setRoomSelect, setMessage } =
    useChatStore();
  const { setShowMobileDraw } = useChatStore();
  const { user } = useUserStore();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const listIds = roomSelect?.members
    ?.filter((member) => member._id !== user?._id)
    ?.map((value) => value?._id)
    ?.filter(Boolean);

  const detechChatType = useCallback(() => {
    // USER CHAT
    if (roomSelect?.members?.length <= 2) {
      const id = roomSelect?.members?.[1]?._id;
      const avatar = roomSelect?.members?.[1]?.photoURL;
      const username = roomSelect?.members?.[1]?.username;
      const displayName = roomSelect?.members?.[1]?.displayName;

      return (
        <div key={id} className="flex items-center space-x-4">
          <i
            onClick={() => setShowMobileDraw(true)}
            className="md:hidden md:mr-0 md:max-w-none cursor-pointer"
          >
            <Menu />
          </i>

          <Avatar>
            <AvatarImage src={avatar} alt="Image" />
            <AvatarFallback>{fallbackDisplayname(displayName)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">{displayName}</p>
            <p className="text-sm text-muted-foreground">{username}</p>
          </div>
        </div>
      );
    }

    // GROUP CHAT
    const usersGroup = roomSelect?.members?.reduce((acc: string[], value) => {
      if (value?.displayName) return acc.concat([value.displayName]);
      return acc;
    }, [] as string[]);

    return (
      <div className="flex items-center space-x-4">
        <i
          onClick={() => setShowMobileDraw(true)}
          className="md:hidden md:max-w-none cursor-pointer"
        >
          <Menu />
        </i>

        <Avatar>
          <AvatarFallback>GR</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex gap-1">
            {usersGroup?.map((userName: string, i: number) => (
              <p
                key={`${userName}-${i}`}
                className="text-sm font-medium leading-none capitalize"
              >
                {userName + (usersGroup.length === i + 1 ? "" : ",")}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }, [roomSelect?.members, setShowMobileDraw]);

  const handleSendChat = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();

      if (user?._id && roomSelect?.id) {
        const messageSend: Message = {
          roomId: roomSelect?.id,
          senderId: user?._id,
          content: messageText,
          recipientIds: (listIds as string[]) ?? [],
        };

        try {
          await saveRoomMessage(messageSend);
        } catch (error) {
          console.log(error);
        }

        setMessageText("");
      }
    },
    [listIds, messageText, roomSelect?.id, user?._id]
  );

  const handleNewMessage = (data: Message & { error?: any }) => {
    if (data?.error) {
      console.log("Error:", data.error);
    } else {
      setMessage(data);
    }
  };

  usePusherEvent(roomSelect?.id, PusherEvent.NEW_MESSAGE, handleNewMessage);

  // selected room on first start
  useEffect(() => {
    if (!roomSelect?.id && rooms?.length) {
      setRoomSelect(rooms[0]._id, rooms[0].userIds as User[]);
    }
  }, [roomSelect?.id, rooms, setRoomSelect]);

  useEffect(() => {
    if (messageText) {
      messagesEndRef?.current?.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    }
  }, [messageText]);

  if (!roomSelect?.id) {
    return (
      <Card>
        <CardHeader className="flex flex-col items-center justify-center h-full">
          <Image
            src={EmptySvg}
            alt="empty"
            className="max-w-[30%]"
            width={300}
            height={300}
          />
          <h3 className="font-semibold text-lg leading-none tracking-tight p-8 m-auto">
            Please search users to create chat room
          </h3>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="w-full h-full">
      <Card>
        <CardHeader className="flex flex-row items-center">
          {detechChatType()}
        </CardHeader>

        <CardContent ref={messagesEndRef} className="flex flex-col-reverse">
          <div key={roomSelect?.id} className="space-y-4 max-h-max">
            {roomMessages?.map((data, index) => (
              <div
                key={index}
                className={cn(
                  "flex gap-2 items-center",
                  data.senderId === user?._id
                    ? ""
                    : "flex-row-reverse justify-end"
                )}
              >
                <div
                  className={cn(
                    "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                    data.senderId === user?._id
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {data.content}
                </div>
                <Avatar>
                  <AvatarImage src={user?.photoURL} alt="Image" />
                  <AvatarFallback>
                    {fallbackDisplayname(user?.displayName)}
                  </AvatarFallback>
                </Avatar>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <form
            onSubmit={handleSendChat}
            className="flex w-full items-center space-x-2"
          >
            <Input
              id="message"
              placeholder="Type your message..."
              className="flex-1"
              autoComplete="off"
              value={messageText}
              // onFocus={handleReadMessage}
              onChange={(event) => setMessageText(event.target.value)}
            />
            <Button
              type="submit"
              size="icon"
              disabled={messageText.length === 0}
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
