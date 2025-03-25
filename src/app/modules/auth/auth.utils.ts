import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { IJWTPayload } from './auth.interface';

export const createToken = (
    jwtPayload: IJWTPayload,
    secret: Secret,
    expiresIn: number | `${number}${'s' | 'm' | 'h' | 'd'}`,
) => {
    return jwt.sign(jwtPayload, secret, {
        expiresIn,
    });
};

export const verifyToken = (token: string, secret: Secret) => {
    return jwt.verify(token, secret) as JwtPayload;
};