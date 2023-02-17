import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import UserModel from '../models/userModel'
dotenv.config({ path: '../.env' })

export const SECRET_KEY: Secret = process.env.SECRET_KEY

export interface CustomRequest extends Request {
    token: string | JwtPayload
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '')

        if (!token) {
            throw new Error()
        }

        const decoded = jwt.verify(token, SECRET_KEY)
        if (typeof decoded === 'string') {
            throw new Error()
        }
        const user = await UserModel.findById(decoded._id)

        if (!user) {
            throw new Error()
        }
        ;(req as CustomRequest).token = decoded
        next()
    } catch (err) {
        res.status(401).send('Você não está logado.')
    }
}
