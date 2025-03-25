import { Model } from "mongoose";
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
    isBlocked: boolean
}
export interface IPassword {
    current_password: string;
    new_password: string;
}

export interface UserModel extends Model<IUser> {
    isUserExistsByEmail(email: string): Promise<IUser>
    isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>


}
export enum UserRole {
    ADMIN = 'admin',
    LANDLORD = 'landlord',
    TENANT = 'tenant'
}