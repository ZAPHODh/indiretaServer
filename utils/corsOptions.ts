import { CorsOptions } from 'cors'

export const corsOpptions: CorsOptions = {
    origin:
        process.env.NODE_ENV === 'production' ? 'url' : 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}
