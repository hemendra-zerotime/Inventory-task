import { Schema, model, Document } from "mongoose";
enum Role {
    user = "user",
    admin = "admin"
}
interface IUser extends Document {
    username: String,
    email: String,
    password: String,
    registeredAt: Date,
    updatedAt: Date
    role: Role

}



const userSchema = new Schema<IUser>({
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
        type: String,
        required: [true, "Please Enter password!"]
    },
    role: {
        type: String,
        enum: Role,
        default: Role.user
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