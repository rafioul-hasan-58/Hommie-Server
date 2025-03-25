import { model, Schema } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const userSchema = new Schema<IUser, UserModel>({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'This email already registered']
    },
    phone: {
        type: Number,
        required: [true, 'Phone is required'],
        unique: [true, 'This phone already registered']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['admin', 'landlord', 'tenant'],
        default: 'tenant'
    }
},
    {
        timestamps: true
    }
)
// hash password
userSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
    next();
})
userSchema.statics.isUserExistsByEmail = async function (email: string) {
    return await User.findOne({ email: email })
}
userSchema.statics.isPasswordMatched = async function (plainTextPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plainTextPassword, hashedPassword)
}
export const User = model<IUser, UserModel>('user', userSchema);