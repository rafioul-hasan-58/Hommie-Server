import { IPassword, IUser } from "./user.interface";
import { User } from "./user.model";


const createUserIntoDB = async (payload: IUser) => {
    const result = await User.create(payload);
    return result
}

const getMyProfile = async (email: string) => {
    const result = await User.findOne({ email });
    if (!result) {
        throw Error('User not found')
    }
    return result
}
const getAllUsers = async () => {
    const result = await User.find();
    return result
}
const updateUserRole = async (payload: { userId: string, role: string }) => {
    const { userId, role } = payload;
    const result = await User.findByIdAndUpdate(userId, { role },{new:true})
    return result
}
const deleteUser = async (userId:string) => {
    const result = await User.findByIdAndDelete(userId)
    return result
}


export const userService = {
    createUserIntoDB,
    getMyProfile,
    getAllUsers,
    updateUserRole,
    deleteUser
}