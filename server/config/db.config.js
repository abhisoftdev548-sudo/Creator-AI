import mongoose from "mongoose";

const mongoUri = process.env.MONGO_URI
async function connectDB () {

    try{
       await  mongoose.connect(mongoUri)
       console.log('DB Connected')

    }catch(error){
        throw new Error('mongoose connectin error', error)
    }
}

export default connectDB;