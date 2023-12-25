import { pusher } from "@/services/pusher";
import { useEffect } from "react";

const usePusherEvent = (
  channelName: string,
  eventName: string,
  callback: any
) => {
  useEffect(() => {
    const channel = pusher.subscribe(channelName);
    channel.bind(eventName, callback);

    return () => {
      channel.unbind(eventName);
      pusher.unsubscribe(channelName);
    };
  }, [channelName, eventName, callback]);
};

export default usePusherEvent;
