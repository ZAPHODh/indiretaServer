import mongoose from 'mongoose'

export interface I_PostDocument extends mongoose.Document {
    user: { _id: string; name: string }
    title: string
    content: string
    createdAt: Date
}

const PostSchema: mongoose.Schema<I_PostDocument> = new mongoose.Schema({
    user: {
        _id: { type: String, required: true },
        name: { type: String, required: true },
    },
    title: { type: String, required: true, minlength: 3, maxlength: 100 },
    content: { type: String, required: true, minlength: 3, maxlength: 500 },
    createdAt: { type: Date, default: Date.now() },
})
const PostModel = mongoose.model<I_PostDocument>('Post', PostSchema)

export default PostModel
