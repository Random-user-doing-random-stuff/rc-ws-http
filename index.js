const { app } = require("./api/router");
const port = 3000;

app.listen(port, () => {
  console.log("app running on port " + port);
});

const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});