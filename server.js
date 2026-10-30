const express=require("express");
const http=require("http");
const {Server}=require("socket.io");
const crypto=require("crypto");
const path=require("path");
const app=express(), server=http.createServer(app);
const io=new Server(server,{cors:{origin:false}});
const PORT=process.env.PORT||3000;
const SECRET=process.env.SESSION_SECRET||crypto.randomBytes(32).toString("hex");
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
function sign(payload){const body=Buffer.from(JSON.stringify(payload)).toString("base64url");return body+"."+crypto.createHmac("sha256",SECRET).update(body).digest("base64url");}
function verify(token){try{const [body,sig]=token.split(".");const expected=crypto.createHmac("sha256",SECRET).update(body).digest("base64url");if(!crypto.timingSafeEqual(Buffer.from(sig),Buffer.from(expected)))return null;const p=JSON.parse(Buffer.from(body,"base64url"));return p.exp>Date.now()?p:null;}catch{return null;}}
app.post("/api/login",(req,res)=>{const {name}=req.body||{};const clean=String(name||"").trim().slice(0,24);if(!clean)return res.status(400).json({error:"Digite um apelido."});res.json({token:sign({name:clean,exp:Date.now()+7*24*60*60*1000})});});
io.use((socket,next)=>{const p=verify(socket.handshake.auth?.token);if(!p)return next(new Error("Acesso não autorizado"));socket.user={name:p.name};next();});
const roomHistory=new Map();
io.on("connection",socket=>{
 socket.on("join-room",({room},ack)=>{room=String(room||"amigos").toUpperCase().replace(/[^A-Z0-9-]/g,"").slice(0,16)||"AMIGOS";for(const r of socket.rooms)if(r!=="__"+socket.id)socket.leave(r);
  socket.join(room);socket.data.room=room;
  const peers=[...io.sockets.adapter.rooms.get(room)||[]].filter(id=>id!==socket.id).map(id=>({id,name:io.sockets.sockets.get(id)?.user.name||"Amigo"}));
  ack?.({room,peers,history:roomHistory.get(room)||[]});
  socket.to(room).emit("peer-joined",{id:socket.id,name:socket.user.name});
 });
 socket.on("chat-message",text=>{const room=socket.data.room;if(!room)return;const msg={id:crypto.randomUUID(),name:socket.user.name,text:String(text||"").trim().slice(0,1000),time:Date.now()};if(!msg.text)return;const h=roomHistory.get(room)||[];h.push(msg);roomHistory.set(room,h.slice(-100));io.to(room).emit("chat-message",msg);});
 socket.on("signal",({to,data})=>{if(!to||!socket.data.room)return;const target=io.sockets.sockets.get(to);if(target&&target.data.room===socket.data.room)io.to(to).emit("signal",{from:socket.id,data});});
 socket.on("disconnect",()=>{if(socket.data.room)socket.to(socket.data.room).emit("peer-left",{id:socket.id});});
});
server.listen(PORT,"0.0.0.0",()=>console.log("Vyracord online na "+PORT));