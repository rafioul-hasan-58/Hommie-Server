import { model, Schema } from "mongoose";
import { IListing } from "./listing.interface";


const listingSchema = new Schema<IListing>(
    {
        location: {
            type: String,
            required: [true, 'Location is required']
        },
        bedrooms: {
            type: Number,
            required: [true, 'Bedrooms is required']
        },
        bathrooms: {
            type: Number,
            required: [true, 'Bathromms is requried']
        },
        description: {
            type: String,
            required: [true, 'Description is requried']
        },
        amount: {
            type: Number,
            required: [true, 'Amount is required']
        },
        landlord: {
            type: Schema.Types.ObjectId,
            required: [true, 'Landlord is required']
        },
        images: {
            type: [String],
            validate: {
                validator: function (value: string[]) {
                    return value.every(url => /^https?:\/\/.+\..+/.test(url)); // Simple URL validation
                },
                message: "Each image must be a valid URL"
            }
        }
    },
    {
        timestamps: true
    })

export const Listing = model<IListing>('linsting', listingSchema)