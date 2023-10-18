import passport from "passport";   
import LocalStrategy from "passport-local"
import bcrypt from "bcrypt";
import {userModel} from "../dao/models"
import bcrypt from 'bcrypt';
import jwt from 'jwt';
const inicializePassport = () => {
    passport.use ('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email'}, async(req,username, password, done) => {
        const {first_name, last_name, age} = req.body;
        try {
            const exists = await userModel.findOne({ email: username})
            if (exists) {
                return done(null, false);
        }
        const user = await userModel.create({
            first_name, 
            last_name, 
            age, 
            email,
              password:bcrypt.hashSync(password, bcryot.genSaltSync(10)),
            cart,
            role });
            return done(null, user)
        } catch (err) {}
        return done(error);
    }
    )
    );

    passport.serializeUser((user, done) => {
        done (null, user._id);

});

passport.deserializeUser(async (id, done) => {
const user = await userModel.findById(id);
done(null, user )
});
};

 export default inicializePassport;