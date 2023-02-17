import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })

export interface CustomRequest extends Request {
    token: { _id: string; name: string }
}

export const addUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        req.body.user = {
            _id: (req as CustomRequest).token._id,
            name: (req as CustomRequest).token.name,
        }
        next()
    } catch (err) {
        res.status(401).send('Houve um erro ao criar o post')
    }
}
