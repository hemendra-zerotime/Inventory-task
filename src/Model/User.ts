import { Schema, model } from "mongoose";

interface IUser {
    username: String,
    email: String,
    password: String,
    registeredAt: Date,
    updatedAt: Date
}


const userSchema: Schema = new Schema<IUser>({
    username: {
        type: String,
        required: [true, "Please Enter Name!"],
        minlength: [5, "must be min of 5 character"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please Enter Email!"],
    },
    password: {
        type: Number,
        required: [true, "Please Enter password!"]
    },

    registeredAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
})

const User = model<IUser>("User", userSchema)

export default User