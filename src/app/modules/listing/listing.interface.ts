import { Types } from "mongoose";

export interface IListing {
    _id?: Types.ObjectId;
    location: string;
    images: string[];
    bedrooms: number;
    bathrooms: number;
    description: string;
    amount: number;
    landlord: Types.ObjectId;
}