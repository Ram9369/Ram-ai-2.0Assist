require("dotenv").config()  
const app=require("./src/app")

const {createServer}=require("http")
const {Server}=require("socket.io")
const { generateResponse } = require("./src/service/ai.service")



const httpServer=createServer(app)
const io=new Server(httpServer,{
  cors: {
    origin: ["*"],
    methods: ["GET", "POST"]
  }
})

const chatHistory = []

io.on("connection",(socket)=>{
    console.log("a user connected") 
    socket.on("disconnect",()=>{
        console.log("user disconnected")
    })

   socket.on("ai-message", async (data) => {
    console.log("Received message from client:", data);

    chatHistory.push({
        role: "user",
        parts: [{ text: data }]
    })

    const response =await generateResponse(chatHistory)
    console.log("Generated response from AI:", response);

    chatHistory.push({
        role: "model",
        parts: [{ text: response }]
    })

    socket.emit("ai-response", response);

    
});
})

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});