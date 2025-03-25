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

export const ListingContrller = {
    createUserIntoDB
}