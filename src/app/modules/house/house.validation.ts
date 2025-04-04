import { z } from "zod";

const houseValidationSchema = z.object({
    location: z.string().min(1, { message: "Location is required" }),
    bedrooms: z.number().int().positive({ message: "Bedrooms must be a positive number" }),
    bathrooms: z.number().int().positive({ message: "Bathrooms must be a positive number" }),
    description: z.string().min(1, { message: "Description is required" }),
    amount: z.number().positive({ message: "Amount must be a positive number" }),
    landlord: z.string().min(1, { message: "Landlord ID is required" }),
    images: z.array(z.string().url({ message: "Each image must be a valid URL" }))
});
const updatehouseValidationSchema = z.object({
    location: z.string().min(1, { message: "Location is required" }).optional(),
    bedrooms: z.number().int().positive({ message: "Bedrooms must be a positive number" }).optional(),
    bathrooms: z.number().int().positive({ message: "Bathrooms must be a positive number" }).optional(),
    description: z.string().min(1, { message: "Description is required" }).optional(),
    amount: z.number().positive({ message: "Amount must be a positive number" }).optional(),
    landlord: z.string().min(1, { message: "Landlord ID is required" }).optional(),
    images: z.array(z.string().url({ message: "Each image must be a valid URL" })).optional()
});
export const houseValidations = {
    houseValidationSchema,
    updatehouseValidationSchema
}
