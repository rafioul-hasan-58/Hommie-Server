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

const updatePassword = async (payload: IPassword) => {

}


export const userService = {
    createUserIntoDB,
    getMyProfile,
    updatePassword
}