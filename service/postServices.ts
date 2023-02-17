import { DocumentDefinition } from 'mongoose'
import PostModel, { I_PostDocument } from '../models/postModel'

export async function createPost(post: DocumentDefinition<I_PostDocument>) {
    await PostModel.create(post)
}
