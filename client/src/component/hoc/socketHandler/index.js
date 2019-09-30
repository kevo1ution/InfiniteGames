const url = "ws://localhost:8080";
const ws = new WebSocket(url);

ws.addEventListener("open", () => {
  console.log("websocket is opened");
});

ws.addEventListener("message", event => {
  const msg = JSON.parse(event.data);
  console.log(msg);
});

ws.addEventListener("close", () => {
  console.log("closed");
});
