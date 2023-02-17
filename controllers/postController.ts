import { createPost } from '../service/postServices'
import { Request, Response } from 'express'
import { getErrorMessage } from '../utils/getErrorMessage'
import PostModel from '../models/postModel'
import UserModel from '../models/userModel'

const postController = {
    createOnePost: async (req: Request, res: Response) => {
        try {
            await createPost(req.body)
            return res.status(200).send('Post criado com Sucesso')
        } catch (error) {
            return res.status(400).send(getErrorMessage(error))
        }
    },
    getOnePost: async (req: Request, res: Response) => {
        try {
            const postId = req.params.postId
            const post = await PostModel.findById(postId)

            if (!post) {
                return res.status(404).json({ message: 'Post not found' })
            }

            return res.status(200).json(post)
        } catch (error) {
            return res.status(500).send(getErrorMessage(error))
        }
    },
    getPosts: async (req: Request, res: Response) => {
        try {
            const senderId = req.body.user._id
            const following = await UserModel.find({
                followers: senderId,
            }).select('following')

            const followingIds = following.map((follow) => follow.following)

            const relevantPosts = await PostModel.find({
                $in: { 'user._id': followingIds },
            })

            return res.status(200).json(relevantPosts)
        } catch (error) {
            return res.status(500).send(getErrorMessage(error))
        }
    },
    deletePosts: async (req: Request, res: Response) => {
        try {
            const postId = req.params.postId
            const post = await PostModel.findById(postId)

            if (!post) {
                return res.status(404).json({ message: 'Post not found' })
            }

            if (post.user._id.toString() !== req.body.user._id) {
                return res
                    .status(401)
                    .send('Voce não está autorizado a deletar este post')
            }

            await PostModel.findByIdAndDelete(postId)
            return res.status(200).send('Post deletado com sucesso')
        } catch (error) {
            return res.status(500).send(getErrorMessage(error))
        }
    },
}
export default postController
