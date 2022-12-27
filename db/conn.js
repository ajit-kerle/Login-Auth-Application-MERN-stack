import mongoose from "mongoose";


// database connection function
const connection=()=>{
    try{
    const URL="mongodb+srv://ajitkerle:2R693j4kFokYqNZJ@cluster0.djs4ptj.mongodb.net/kimshuka-DB?retryWrites=true&w=majority"
    mongoose.set('strictQuery', true);
    mongoose.connect(URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true
    })
    console.log("MongoDB Coonected successfully")

    }catch(error){
    console.log("error while coonecting with mongodb")
    }
}


// exporting function
export default connection

