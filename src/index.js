const express = require('express')
const app = express();
require('dotenv').config();
const main =  require('./config/db')
const cookieParser =  require('cookie-parser');
const authRouter = require("./routes/userAuth");
const redisClient = require('./config/redis');
const problemRouter = require("./routes/problemCreator");
const submitRouter = require("./routes/submit")
const aiRouter = require("./routes/aiChatting")
const videoRouter = require("./routes/videoCreator");
const cors = require('cors');


app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://zyla-frontend.vercel.app" 
    ],
    credentials: true,
    optionsSuccessStatus: 200,
}));


app.use(express.json());
app.use(cookieParser());

app.use('/user',authRouter);
app.use('/problem',problemRouter);
app.use('/submission',submitRouter);
app.use('/ai',aiRouter);
app.use("/video",videoRouter);

app.get('/', (req, res)=>{
   res.send({
    activeStatus: true,
    error:false,
   })
});


// ✅ Safe connection for Vercel
let isConnected = false;

const initializeConnection = async () => {
    if (isConnected) return;

    try {
        await Promise.all([
            main(),
            redisClient.connect()
        ]);

        isConnected = true;
        console.log("DB + Redis Connected");
    } catch (err) {
        console.log("Error:", err);
    }
};

initializeConnection();


// ✅ Export for Vercel
module.exports = app;
