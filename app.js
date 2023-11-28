

const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const axios=require("axios")
const dotenv=require("dotenv")
userRouter=require("./routes/users.js")
restaurantRouter=require("./routes/restaurants.js")
categoryRouter=require("./routes/category.js")
const app=express();
dotenv.config()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/users",userRouter)
app.use("/restaurants",restaurantRouter)
app.use("/category",categoryRouter)

mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("mongodb connected")})
.catch((err)=>{console.log(err)})

app.listen(3000,()=>{console.log("listeing on port 3000")})