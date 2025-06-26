import { useEffect, useState } from "react";

interface OrderbookSide {
  price: number;
  quantity: number;
}

interface IOrderbookEvent {
  eventId: string;
  orderbook: {
    yes: OrderbookSide[];
    no: OrderbookSide[];
  };
}

export const useWebsocket = (url: string, eventId: string) => {
  const [orderbookEvent, setOrderbookEvent] = useState<IOrderbookEvent | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("WebSocket connected");
      socket.send(JSON.stringify({ eventId, message: "Subscribe" }));
    };

    socket.onmessage = (event: MessageEvent) => {
      try {
        const data: IOrderbookEvent = JSON.parse(event.data);
        if (data.eventId === eventId) {
          setOrderbookEvent(data);
        }
      } catch (err) {
        console.error("Failed to parse message:", err);
      }
    };

   return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ eventId, message: "Unsubscribe" }));
        socket.close();
      } else {
        // If it's still CONNECTING, wait for it to open, then close
        socket.onopen = () => {
          socket.send(JSON.stringify({ eventId, message: "Unsubscribe" }));
          socket.close();
        };
      }
    };
  }, [url, eventId]);

  return orderbookEvent;
};
