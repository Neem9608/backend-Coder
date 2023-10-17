import passport from "passport";   
import LocalStrategy from "passport-local"
import bcrypt from "bcrypt";
import {userModel} from "../dao/models"

const inicializePassport = () => {
    passport.use ('regiter', new LocalStrategy({ passReqToCallback: true, usernameField: 'email'}, async(req,username, password, done) => {
        const {firstName, lastName, age} = req.body;
        try {
            const exists = await userModel.findOne({ email: username})
            if (exists) {
                return done(null, false);
        }
        const user = await userModel.create({first_name, last_name, age, email: username, password:bcrypt.hashSync() });
    
    }))

}
