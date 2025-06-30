const mongoose=require('mongoose');
const connectdb=async()=>{
    try{
            await mongoose.connect(process.env.MONGO_URI);
            console.log("mongo db connected successfully");
    }
    catch(error){
        console.log("error:",error);
    }
}
module.exports=connectdb;