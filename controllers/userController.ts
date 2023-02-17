import { Request, Response } from 'express'
import { getErrorMessage } from '../utils/getErrorMessage'
import { register, login } from '../service/userServices'
import { validateSchema } from '../service/validateService'
import UserModel from '../models/userModel'

const userController = {
    registerOne: async (req: Request, res: Response) => {
        try {
            await validateSchema(req.body)
        } catch (error) {
            return res.status(400).send(getErrorMessage(error))
        }
        try {
            await register(req.body)
            res.status(200).send('Registrado com sucesso')
        } catch (error) {
            return res.status(400).send(getErrorMessage(error))
        }
    },
    loginOne: async (req: Request, res: Response) => {
        try {
            const foundUser = await login(req.body)
            res.status(200).send(foundUser)
        } catch (error) {
            return res.status(400).send(getErrorMessage(error))
        }
    },
    getUser: async (req: Request, res: Response) => {
        const userId = req.params.userId
        const user = await UserModel.findById(userId)
        if (!user) return res.status(400).send('nenhum usuário encontrado')
        const callbackUser = user.toJSON()
        delete callbackUser.password
        delete callbackUser.email
        return res.send(callbackUser)
    },
    deleteOneUser: async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId
            const deletedUser = await UserModel.findByIdAndDelete(userId)
            if (!deletedUser) {
                return res.status(404).send('User not found')
            }
            return res.send('Conta deletada com sucesso')
        } catch (error) {
            return res.status(500).send(getErrorMessage(error))
        }
    },
}

export default userController
