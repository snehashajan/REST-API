import express from "express";
import router from "./routes/products.js";
import mongoose from "mongoose";
import { config } from "dotenv";
//import productDB from "./productDB.js"
import product from "./models/product.js";
import  data from "./data.js";
const app = express();

config();
//const connect = mongoose.connect("mongodb+srv://snehashajan2015:snehaecerra2015@cluster0.krkaos5.mongodb.net/?retryWrites=true&w=majority")

const port = process.env.PORT || 3000;
app.get("/", (req,res)=>{
    res.send("Hi all");
})

export const start = async()=>{
    try{
     //mongoose.connect("mongodb+srv://snehashajan2015:snehaecerra2015@cluster0.krkaos5.mongodb.net/?retryWrites=true&w=majority");
       await product.deleteMany();
       await product.create(data)
       console.log("Success");
    } catch (error){
      console.log(error);
    }
}

app.use("/api/products", router)

app.listen(port, async(req,res)=>{
   try{
    mongoose.connect(process.env.MONGO)
    start();
      console.log(`connected to port ${port}`);
   } catch (error){
       console.log("error");
   }
});