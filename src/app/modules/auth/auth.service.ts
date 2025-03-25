import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { IAuth, IJWTPayload } from "./auth.interface";
import httpStatus from 'http-status'
import { createToken, verifyToken } from "./auth.utils";
import config from "../../config";
import bcrypt from 'bcrypt';
import { JwtPayload } from "jsonwebtoken";


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
const refreshToken = async (token: string) => {

    let verifiedToken = null;
    try {
        verifiedToken = verifyToken(token, config.jwt_refresh_secret as `${number}s` | `${number}m` | `${number}h` | `${number}d`)
    } catch (err) {
        throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Invalid Refresh Token')
    }

    const { email } = verifiedToken;
    const user = await User.isUserExistsByEmail(email);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not real')
    }
    const jwtPayload: IJWTPayload = {
        _id: user?._id,
        name: user?.name,
        email: user?.email,
        role: user?.role,
        phone: user?.phone
    }
    const newToken = createToken(jwtPayload, config.jwt_refresh_secret as string, config.jwt_access_expires_in as number | `${number}${'s' | 'm' | 'h' | 'd'}`)

    return {
        accessToken: newToken
    }
}

const changePassword = async (userData: JwtPayload, payload: { oldPassword: string, newPassword: string }) => {
    const { email, _id } = userData;
    const { oldPassword, newPassword } = payload;
    const user = await User.isUserExistsByEmail(email);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found to change password')
    }

    const isPasswordCorrect = await User.isPasswordMatched(oldPassword, user?.password);
    if (!isPasswordCorrect) {
        throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Password doesnot match');
    }

    // hash password
    const hashedNewPassword = await bcrypt.hash(newPassword, Number(config.bcrypt_salt_rounds));

    await User.findByIdAndUpdate(_id, { password: hashedNewPassword })
    return { message: 'Password Changed Successfully' }

}



export const AuthService = {
    loginUser,
    refreshToken,
    changePassword
}