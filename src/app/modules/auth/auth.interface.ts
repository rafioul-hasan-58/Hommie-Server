import { Types } from "mongoose";

export interface IAuth {
    email: string;
    password: string;
}

export interface IJWTPayload {
    _id: Types.ObjectId | undefined;
    name: string;
    email: string;
    role: string;
    phone: number;
}

