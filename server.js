const express = require("express")
const app = express();
const server = require("http").Server(app)
const io = require("socket.io")(server);
const {v4 : uuidV4} = require("uuid");
app.set("view engine","ejs")
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.redirect(`/${uuidV4()}`)
})

io.on("connection",socket=>{
    socket.on("join-room",(roomID,userID)=>{
        console.log(roomID,userID);
    })
})
app.get("/:room",(req,res)=>{
    const roomID = req.params?.room;
    res.render('room',{roomID})
})

const PORT = process.env.PORT || 5000
server.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})