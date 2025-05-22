import { sub } from '@repo/redis-client/redis';
import { WebSocket, WebSocketServer } from 'ws';

const subscriber = sub();
const clients = new Map<string, WebSocket[]>(); // Map<eventId, WebSocket[]>
const socketEventMap = new Map<WebSocket, string>(); // Map<WebSocket, eventId>

const wss = new WebSocketServer({ port: 8080 });

subscriber.subscribe('orderbook:update');

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    try {
      const mess = JSON.parse(message.toString());

      const eventId = mess.eventId;
      if (!eventId) return;

      const sockets = clients.get(eventId) || [];

      if (!sockets.includes(ws)) {
        sockets.push(ws);
        clients.set(eventId, sockets);
        socketEventMap.set(ws, eventId);
      }

      console.log(`Client subscribed to event: ${eventId}`);
    } catch (err) {
      console.error('Invalid message:', err);
    }
  });

  ws.on('close', () => {
    const eventId = socketEventMap.get(ws);
    if (!eventId) return;

    const sockets = clients.get(eventId);
    if (!sockets) return;

    const filtered = sockets.filter((client) => client !== ws);
    if (filtered.length > 0) {
      clients.set(eventId, filtered);
    } else {
      clients.delete(eventId);
    }

    socketEventMap.delete(ws);
    console.log(`Client disconnected from event: ${eventId}`);
  });
});

subscriber.on('message', (channel, message) => {
  console.log(`Received from Redis [${channel}]:`, message);

  try {
    const parsed = JSON.parse(message); 
    const eventId = parsed.eventId;

    if (!eventId) return;

    const sockets = clients.get(eventId);
    if (!sockets || sockets.length === 0) return;

    for (const ws of sockets) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(parsed));
      }
    }
  } catch (err) {
    console.error('Failed to parse or broadcast Redis message:', err);
  }
});
