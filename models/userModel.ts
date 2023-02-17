import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const saltRounds = 8
type Question = {
    questionLink: string
    expiresAt: string
}
export interface I_UserDocument extends mongoose.Document {
    name: string
    pic: string
    email: string
    password: string
    age: number
    createdAt: Date
    following: mongoose.Types.ObjectId[]
    followers: mongoose.Types.ObjectId[]
    question: Question
}

const UserSchema: mongoose.Schema<I_UserDocument> = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 100 },
    email: { type: String, required: true, minlength: 3, maxlength: 100 },
    password: { type: String, required: false, minlength: 6, maxlength: 200 },
    pic: { type: String, required: true },
    age: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now() },
    question: {
        questionLink: { type: String, required: false },
        expiresAt: {
            type: String,
            required: false,
        },
    },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})
const UserModel = mongoose.model<I_UserDocument>('User', UserSchema)

UserSchema.pre('save', async function (next) {
    const self = this
    if (self.isModified('password')) {
        self.password = await bcrypt.hash(self.password, saltRounds)
    }
    next()
})

export default UserModel
