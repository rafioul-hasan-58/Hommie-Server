import { IListing } from "./listing.interface";
import { Listing } from "./listing.model";

const createListingIntoDB = async (payload: IListing) => {
    const result = await Listing.create(payload);
    return result
}



export const listingService = {
    createListingIntoDB
}