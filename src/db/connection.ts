import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
        await mongoose.connect(`${process.env.DBURI}`)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log('Error connecting to MongoDB:', error)
    }
}

