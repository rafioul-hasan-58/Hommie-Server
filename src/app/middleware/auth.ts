import { NextFunction, Request, Response } from "express";
import { UserRole } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from 'http-status'
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import config from "../config";
import { User } from "../modules/user/user.model";

const auth = (...requiredRole: UserRole[]) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const token = req.headers.authorization;

            if (!token) {
                throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized')
            }
            try {
                const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload

                const { role, email } = decoded;
                const user = await User.isUserExistsByEmail(email);
                if (!user) {
                    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
                }
                if (requiredRole && !requiredRole.includes(role)) {
                    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized')
                }
                req.user = decoded as JwtPayload & { role: string };
                next()
            } catch (err) {
                if (err instanceof TokenExpiredError) {
                    return next(
                        new AppError(httpStatus.UNAUTHORIZED, 'Token Expaired')
                    )
                }
                return next(
                    new AppError(httpStatus.UNAUTHORIZED, 'Invalid Token')
                )
            }
        }
    )
}


export default auth