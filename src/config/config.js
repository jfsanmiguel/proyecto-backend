import dotenv from 'dotenv'

dotenv.config()


export default {
    port: process.env.PORT || 3000,
    mongodbURI: process.env.MONGODB_URI|| 'mongodb://localhost:8080',
    session: process.env.SESSION_SECRET || 'aaaaaaaaa',
    clientID: process.env.clientID || '',
    clientSecret: process.env.clientSecret || '',
    callbackURL: process.env.callbackURL || '',
    persistence: process.env.PERSISTENCE || 'mongodb',
    jwt: process.env.JWT_SECRET || '',
    env: process.env.NODE_ENV || 'development',
    emailUser: process.env.EMAIL_USER || 'user',
    emailPass: process.env.EMAIL_PASSWORD || 'password',
    emailService: process.env.EMAIL_SERVICE || 'service',
    emailPort: process.env.EMAIL_PORT || 'eport',


}