const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {UserModal} = require('../modals/user.modal');
const UserRouter = express.Router();

UserRouter.get("/",(req, res)=>{
    res.send("Users");
})
UserRouter.get("/profile",async (req,res) => {
    const profile = await UserModal.find()
    res.send(profile)
})

UserRouter.post("/register", async (req, res) =>{
    console.log(req.body)
    const {email, password} = req.body;
    const Isuser = await UserModal.findOne({ email })
    if(Isuser?.email){
        res.send("User Already Exists")
    }
    else{
        try {
            bcrypt.hash(password,4, async function( err, hash){
                const user = new UserModal({email, password:hash})
                await user.save()
                res.send("Sign up successfull")
            });      
        }
       catch(err){
            console.log(err)
            res.send("Something went wrong, Login again")
       }
    }
    
})
UserRouter.post("/login", async (req, res) =>{
    const {email, password} = req.body;
    try{
        const user = await UserModal.find({ email })
         
      if(user.length > 0){
        const hashed_password = user[0].password;

        bcrypt.compare(password, hashed_password, function(err, result){

            if(result){
                const token = jwt.sign({"userID":user[0]._id}, 'hush');
                res.send({"msg":"Login successfull","token" : token})
            }
            else{
                res.send("Login UnSuccessfull")
            }
      })} 
      else{

        res.send("Login UnSuccessfull")
      }
    }
    catch{

        res.send("Something went wrong, Login again")
    }
})


module.exports = { UserRouter };