import AppError from "../../errors/AppError";
import { IListing } from "./listing.interface";
import { Listing } from "./listing.model";
import httpStatus from 'http-status'

const createListingIntoDB = async (payload: IListing) => {
    const result = await Listing.create(payload);
    return result
}
const getAllListingFromDB = async () => {
    const result = await Listing.find();
    return result
}
const getSingleListingFromDB = async (id: string) => {
    const result = await Listing.findById(id);
    return result
}
const updateListingIntoDB = async (id: string, payload: Partial<IListing>) => {
    const listing = await Listing.findById(id);
    if (!listing) {
        throw new AppError(httpStatus.NOT_FOUND, 'Listing not found')
    }
    // console.log(id, payload);
    const result = await Listing.findByIdAndUpdate(id, payload, { new: true })
    return result
}
const deleteListingFromDB = async (id: string) => {
    const listing = await Listing.findById(id);
    if (!listing) {
        throw new AppError(httpStatus.NOT_FOUND, 'Listing not found')
    }
    const result = await Listing.findByIdAndDelete(id)
    return result
}


export const listingService = {
    createListingIntoDB,
    getAllListingFromDB,
    getSingleListingFromDB,
    updateListingIntoDB,
    deleteListingFromDB
}