const http = require("http")
const express = require("express")
const cors =  require("cors")
const socketIO = require("socket.io")

const app = express();
const port = 4500 || process.env.PORT ;

app.get("/", (req,res)=>{
    res.send("working")
})

const server = http.createServer(app);

const io = socketIO(server);

io.on("connection",()=>{
    console.log("NEW CONNECTION")
} )

server.listen(port,() => {
    console.log(`Server is running on ${port}`);
})
