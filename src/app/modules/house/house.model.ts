import { model, Schema } from "mongoose";
import { IHouse } from "./house.interface";
const houseSchema = new Schema<IHouse>(
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
                    return value.every(url => /^https?:\/\/.+\..+/.test(url));
                },
                message: "Each image must be a valid URL"
            }
        }
    },
    {
        timestamps: true
    })

export const House = model<IHouse>('house', houseSchema)