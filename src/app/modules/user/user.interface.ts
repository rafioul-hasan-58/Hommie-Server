import { Types } from "mongoose";

export interface IUser {
    _id?: Types.ObjectId
    user_id?: string;
    name: string;
    image: string;
    email: string;
    phone: number;
    password: string;
    role: 'admin' | 'landlord' | 'tenant';
}