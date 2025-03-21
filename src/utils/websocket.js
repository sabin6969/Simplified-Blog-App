import { WebSocketServer } from "ws";

class WebSocketManager {
    constructor() {
        this.wss = null;
        this.clients = new Set();
    }
    initialize(server) {
        this.wss = new WebSocketServer({ server: server, });

        this.wss.on("connection", (ws) => {

            this.clients.add(ws);

            ws.on("close", () => {
                this.clients.delete(ws);
            })

            ws.on("error", () => {
                this.clients.delete(ws);
            })
        });
    }

    broadcast(data) {
        const message = JSON.stringify(data);
        this.clients.forEach((client) => {
            if (client.readyState === 1) {
                client.send(message);
            }
        });
    }

}

const webSocketManager = new WebSocketManager();

export default webSocketManager;

