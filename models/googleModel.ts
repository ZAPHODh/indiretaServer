import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import * as _ from 'lodash'
import mongoose from 'mongoose'
import UserModel from './userModel'
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/google/callback',
        },
        (_accessToken, _refreshToken, profile, cb) => {
            // Perform any necessary actions with the user's profile information here.
            // The profile object contains information about the user, such as their name and email address.
            // ...
            cb(null, profile)
        },
    ),
)
passport.serializeUser((user, done) => {
    done(null, _.pick(user, ['id', 'email', 'name', 'age']))
})
passport.deserializeUser(async (id: mongoose.Types.ObjectId, done) => {
    try {
        const user = await UserModel.findById(id)
        done(null, user)
    } catch (error) {
        done(error, false)
    }
})
export default passport
