import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status'
import { HouseService } from "./house.service";


const createUserIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await HouseService.createHouseIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'House created successfully',
        data: result
    })
})
const getAllHouseFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await HouseService.getAllHouseFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Houses retrived successfully',
        data: result
    })
})
const getSingleHouseFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await HouseService.getSingleHouseFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Single Houses retrived successfully',
        data: result
    })
})
const updateHouseIntoDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await HouseService.updateHouseIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'House updated successfully',
        data: result
    })
})
const deleteHouseFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await HouseService.deleteHouseFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'House deleted successfully',
        data: null
    })
})

export const houseController = {
    createUserIntoDB,
    getAllHouseFromDB,
    getSingleHouseFromDB,
    updateHouseIntoDB,
    deleteHouseFromDB
}