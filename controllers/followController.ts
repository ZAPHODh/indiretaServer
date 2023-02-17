import { Request, Response } from 'express'
import UserModel from '../models/userModel'
import { getErrorMessage } from '../utils/getErrorMessage'

const followController = {
    followOne: async (req: Request, res: Response) => {
        const userId = req.params.userId
        const currentUser = req.body.user
        if (userId === currentUser._id) {
            return res.status(400).send('Você não pode seguir voce mesmo')
        }
        try {
            const userToFollow = await UserModel.findById(userId)
            if (!userToFollow) {
                return res
                    .status(404)
                    .send({ error: 'Nenhum usuário Encontrado' })
            }
            await UserModel.updateOne(
                { _id: currentUser._id },
                {
                    $addToSet: { following: userToFollow._id },
                },
            )
            await UserModel.updateOne(
                { _id: userToFollow._id },
                {
                    $addToSet: { followers: currentUser._id },
                },
            )

            res.send({ success: true })
        } catch (error) {
            return res.status(400).send(getErrorMessage(error))
        }
    },
    unfollowOne: async (req: Request, res: Response) => {
        const userId = req.params.userId
        const currentUser = req.body.user
        if (userId === currentUser._id) {
            return res
                .status(400)
                .send('Você não pode deixar de seguir você mesmo')
        }
        try {
            const userToUnfollow = await UserModel.findById(userId)
            if (!userToUnfollow) {
                return res
                    .status(404)
                    .send({ error: 'Nenhum usuário Encontrado' })
            }
            await UserModel.updateOne(
                { _id: currentUser._id },
                {
                    $pull: { following: userToUnfollow._id },
                },
            )
            await UserModel.updateOne(
                { _id: userToUnfollow._id },
                {
                    $pull: { followers: currentUser._id },
                },
            )

            res.send({ success: true })
        } catch (error) {
            return res.status(400).send(getErrorMessage(error))
        }
    },
}
export default followController
