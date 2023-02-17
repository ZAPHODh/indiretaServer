declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT?: string
            MONGO_CONNECT: string
            SECRET_KEY: string
            NODE_ENV: string
            GOOGLE_CLIENT_ID: string
            GOOGLE_CLIENT_SECRET: string
            BASE_URL: string
        }
    }
}
export {}
