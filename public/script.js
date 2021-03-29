const socket = io("/")
const videoGrid = document.querySelector("#video-grid");
const myVideo = document.createElement("video");
myVideo.muted=true;
navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then( stream=>{
    addVideoStream(myVideo,stream)
    socket.on("user-connected",userID=>{
        connectToNewUser(userID,stream)
    })
})

socket.emit("join-room",ROOM_ID,USER_ID)
socket.on("user-connected",userID=>{
    console.log(`USER CONNECTED ${userID}`)

});

function addVideoStream(video,stream){
    video.srcObject=stream;
    video.addEventListener("loadedmetadata",()=>{
        video.play();
    })
    videoGrid.appendChild(video)
}
function connectToNewUser(video,stream){
    addVideoStream(video,stream)
  
}