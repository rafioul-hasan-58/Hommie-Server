import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status'
import { AuthService } from "./auth.service";
import config from "../../config";
import { Request, Response } from "express";

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthService.loginUser(req.body);
    const { refreshToken, accessToken } = result;

    res.cookie("refreshToken", refreshToken, {
        secure: config.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 365,
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully!",
        data: {
            accessToken,
            refreshToken
        },
    });
});
const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    const result = await AuthService.refreshToken(authorization as string);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User logged in successfully!",
        data: result,
    });
});
const changePassword = catchAsync(async (req: Request, res: Response) => {

    await AuthService.changePassword(req.user, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password changed successfully!",
        data: null,
    });
});
export const AuthController = {
    loginUser,
    refreshToken,
    changePassword
}