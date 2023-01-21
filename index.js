const express = require('express');
const cors = require('cors');
const {connection} = require('./config/db');
const {UserRouter} = require('./routes/user.route');


const app = express();
app.use(express.json());

app.use(cors({
    origin:'*'
}));

app.get("/",(req,res)=>{
    res.send("Welcome To Home Routes");
})
app.use('/users', UserRouter);


app.listen(process.env.port, async () => {
    try{
        await connection;
        console.log("connected to DB successfully")
    }
    catch(err){
        console.log("error connecting to DB")
        console.log(err)
    }
    console.log("listening on port 8020")
})