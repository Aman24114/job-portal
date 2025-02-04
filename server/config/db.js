import mongoose from "mongoose";
// function to connnetc with mongodb database
const connectDB =async()=>
{
    mongoose.connection.on('connected',()=>console.log('Datbase Connected'))
    await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`)
}
export default connectDB