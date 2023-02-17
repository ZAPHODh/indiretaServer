import { DocumentDefinition } from 'mongoose'
import UserModel, { I_UserDocument } from '../models/userModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })
const salt = 8

export async function register(
    user: DocumentDefinition<I_UserDocument>,
): Promise<void> {
    const foundUser = await UserModel.findOne({ email: user.email })
    if (foundUser) throw new Error('Email já cadastrado.')
    user.password = bcrypt.hashSync(user.password, salt)
    user.pic = 'defaultpic'
    await UserModel.create(user)
}

export async function login(user: DocumentDefinition<I_UserDocument>) {
    const foundUser = await UserModel.findOne({ email: user.email })
        .populate('followers', '_id name pic')
        .populate('following', '_id name pic')

    if (!foundUser) {
        throw new Error('Usuário ou senha inválido')
    }

    const isMatch = bcrypt.compareSync(user.password, foundUser.password)

    if (isMatch) {
        const token = jwt.sign(
            { _id: foundUser._id?.toString(), name: foundUser.name },
            process.env.SECRET_KEY,
            {
                expiresIn: '7d',
            },
        )
        const callbackUser = foundUser.toJSON()
        delete callbackUser.password
        delete callbackUser.email
        return {
            user: { ...callbackUser },
            token: token,
        }
    } else {
        throw new Error('Usuário ou senha inválido')
    }
}
