import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status'
const createUserIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.createUserIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User created successfully',
        data: result
    })
})
const getMyProfile = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.body;
    const result = await userService.getMyProfile(email)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'My profile retrived successfully',
        data: result
    })
})
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.getAllUsers();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All users retrived successfully',
        data: result
    })
})
const updateUserRole = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.updateUserRole(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User role updated  successfully',
        data: result
    })
})
const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.body;
    await userService.deleteUser(userId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User deleted successfully',
        data: null
    })
})



export const userController = {
    createUserIntoDB,
    getMyProfile,
    getAllUsers,
    updateUserRole,
    deleteUser
}