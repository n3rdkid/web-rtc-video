const express = require("express")
const app = express();
const server = require("http").Server(app)
const io = require("socket.io")(server);
const {v4 : uuidV4} = require("uuid");
const cors=require("cors")
app.set("view engine","ejs")
app.use(express.static("public"))
app.use(cors());

app.get("/",(req,res)=>{
    res.redirect(`/${uuidV4()}`)
})


io.on("connection",socket=>{
    socket.on("join-room",(roomID,userID)=>{
        console.log(roomID,userID);
        socket.join(roomID)
        socket.broadcast.to(roomID).emit("user-connected",userID)
    })
})
app.get("/:room",(req,res)=>{
    const userID=uuidV4();
    const roomID = req.params?.room;
    res.render('room',{roomID,userID})
})

const PORT = process.env.PORT || 5000
server.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})