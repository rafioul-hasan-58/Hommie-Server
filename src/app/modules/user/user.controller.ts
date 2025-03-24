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

export const userController = {
    createUserIntoDB
}