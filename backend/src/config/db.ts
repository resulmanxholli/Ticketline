import mongoose from "mongoose"

export async function connectDb(url: string) {
    await mongoose.connect(url)
    console.log("Connected to the database")
}