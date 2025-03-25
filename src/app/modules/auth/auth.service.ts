import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { IAuth, IJWTPayload } from "./auth.interface";
import httpStatus from 'http-status'
import { createToken } from "./auth.utils";
import config from "../../config";


const loginUser = async (payload: IAuth) => {
    const user = await User.isUserExistsByEmail(payload.email);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found')
    }
    if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
        throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Password doesnot match')
    }

    const jwtPayload: IJWTPayload = {
        name: user?.name,
        _id: user?._id,
        email: user?.email,
        role: user?.role,
        phone: user?.phone
    }

    const accessToken = createToken(
        jwtPayload, config.jwt_access_secret as string,
        config.jwt_access_expires_in as `${number}s` | `${number}m` | `${number}h` | `${number}d`);

    const refreshToken = createToken(
        jwtPayload, config.jwt_refresh_secret as string,
        config.jwt_refresh_expires_in as `${number}s` | `${number}m` | `${number}h` | `${number}d`);

    return {
        accessToken,
        refreshToken
    }

}






export const authController = {
    loginUser
}