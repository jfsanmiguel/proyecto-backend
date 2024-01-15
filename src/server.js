import http from 'http';
import config from './config/config.js';
import app from './app.js';
import {initSocket} from './socket.js';
import {init} from './db/mongodb.js';
import MongoSingleton from './db/MongoSingleton.js';


MongoSingleton.getInstance();


const httpServer= http.createServer(app);
initSocket(httpServer);
const PORT=config.port;

//init(server); Websocket

httpServer.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});