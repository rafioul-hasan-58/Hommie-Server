import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status'
import { listingService } from "./listing.service";


const createUserIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await listingService.createListingIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Listing created successfully',
        data: result
    })
})
const getAllListingFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await listingService.getAllListingFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Listings retrived successfully',
        data: result
    })
})
const getSingleListingFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await listingService.getSingleListingFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Single Listings retrived successfully',
        data: result
    })
})
const updateListingIntoDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await listingService.updateListingIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Listing updated successfully',
        data: result
    })
})
const deleteListingFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await listingService.deleteListingFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Listing deleted successfully',
        data: null
    })
})

export const listingController = {
    createUserIntoDB,
    getAllListingFromDB,
    getSingleListingFromDB,
    updateListingIntoDB,
    deleteListingFromDB
}