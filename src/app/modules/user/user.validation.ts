import { z } from "zod";


const userValidationSchema = z.object({
    name: z.string().trim().max(20, 'Name cannot be more than 20'),
    image: z.string(),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password is required'),
    role: z.enum(['admin', 'landlord', 'tenant']).default('tenant'),
    isBlocked: z.boolean().default(false).optional(),
    phone:z.number()
})

export const userValidations = {
    userValidationSchema
}