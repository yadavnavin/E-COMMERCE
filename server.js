/**
 * This wil be the staring of the file
 */

const express =require("express")
const mongoose =require("mongoose")
const app = express()
const server_config = require("./configs/server.configs")
const db_config= require("./configs/db.config")
const user_model =require("./models/user.model")
const bcrypt = require("bcryptjs")

app.use(express.json())

/**
 * Create an adimn user at the starting of the application
 * if not already present
 */

//connection with MongoDB
 mongoose.connect(db_config.DB_URL)

 const db =mongoose.connection

 db.on("error",()=>{
    console.log("Error while connecting to the Mongodb")

 })
 db.once("open", ()=>{
    console.log("Connected to the MongoDB")
    init()
 })

 async function init(){
    try{
        let user = await user_model.findOne({userId : "admin"})
 
        if(user){
          console.log("admin is already present")
          return
    }
   }catch(err){
        console.log("Error while reading the data",err)
}
    try{
        user = await user_model.create({
            name: "navin",
            userId : "admin",
            email:"ynavin528@gmail.com",
            userType:"ADMIN",
            password:bcrypt.hashSync("nayadav2",8)
        })
        console.log("Admin created",user)


    }catch(err){
            console.log("Error while creating admine")
    }
}

/**
 * Stich the route to the server
 */

require("./routes/auth.routes")(app)


/**
 * Start the server
 */

app.listen(server_config.PORT, ()=>{
    console.log("server started at port num:",server_config.PORT)
})