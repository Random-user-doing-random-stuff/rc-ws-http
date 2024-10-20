const { app } = require("./api/router");

const { client } = require("./db/connection");

const wss = require("./api/websocket/ws");

const port = 3000;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
