import dotenv from 'dotenv'

dotenv.config()


export default {
    port: process.env.PORT || 3000,
    mongodbURI: process.env.MONGODB_URI|| 'mongodb://localhost:8080',
    session: process.env.SESSION_SECRET || 'aaaaaaaaa',
    clientID: process.env.clientID || '',
    clientSecret: process.env.clientSecret || '',
    callbackURL: process.env.callbackURL || '',
}