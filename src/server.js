import http from 'http';
import app from './app.js';
import {initSocket} from './socket.js';
import {init} from './db/mongodb.js';


await init();


const httpServer= http.createServer(app);
initSocket(httpServer);
const PORT=8080;

//init(server); Websocket

httpServer.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});