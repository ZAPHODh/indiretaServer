import { DocumentDefinition } from 'mongoose'
import { object, string, number } from 'yup'
import { I_UserDocument } from '../models/userModel'

export const validateSchema = async (
    user: DocumentDefinition<I_UserDocument>,
) => {
    const yupSchema = object({
        name: string().required('Não enviou o nome'),
        age: number()
            .required('não enviou a idade')
            .positive('O idade precisa ser um número positivo')
            .integer('apenas números inteiros'),
        email: string().email('Envie um e-mail vállido').required(),
        password: string()
            .required()
            .matches(
                RegExp(
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                ),
                'A senha precisa ao menos uma letra maiuscula, uma minuscula, um caractere especial e um número. Mínimo de 6 dígitos',
            ),
    })
    const validateSchema = await yupSchema.validate(user)
    return validateSchema
}
