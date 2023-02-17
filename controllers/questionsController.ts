import { Request, Response } from 'express'
import UserModel from '../models/userModel'
import { getErrorMessage } from '../utils/getErrorMessage'

export const questionController = {
    newPage: async (req: Request, res: Response) => {
        const { questionLink } = req.params
        const id = req.body.user._id
        if (!questionLink) return res.status(500).send('Erro ao gerar link')
        const foundedUser = await UserModel.findById(id)
        if (!foundedUser) return res.status(400).send('Você não está logado')

        // Generate the link
        const link = `${process.env.BASE_URL}/${questionLink}`

        // Set the expiration time to 24 hours from now
        const now = new Date()
        const expiresAt = new Date(
            now.getTime() + 24 * 60 * 60 * 1000,
        ).toISOString()

        // Update the user's questionLink and expiresAt properties
        foundedUser.question.questionLink = link
        foundedUser.question.expiresAt = expiresAt
        try {
            await foundedUser.save()
        } catch (error) {
            return res.status(400).send(getErrorMessage(error))
        }

        return res.status(200).json({ link })
    },
    deletePage: async (req: Request, res: Response) => {
        const userId = req.body.user._id

        try {
            // Find the user and update their question object to remove the link and expiration time
            await UserModel.findByIdAndUpdate(userId, {
                $unset: {
                    'question.questionLink': '',
                    'question.expiresAt': '',
                },
            })

            return res.send('Link de perguntas deletado com sucesso.')
        } catch (error) {
            return res.status(400).send(getErrorMessage(error))
        }
    },
}
