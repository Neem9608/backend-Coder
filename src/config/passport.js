import passport from "passport";
import LocalStrategy from "passport-local";
import { userModel } from "../dao/mongo/models/user";
import jwt from "jwt";
import bcrypt from "bcrypt";
import jwt from "passport-jwt";

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieExtractors = (req) => {
  let token = null;

  if (req && req.cookie) {
    token = req.cookies["token"];
  }
  return token;
};

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, age } = req.body;
        try {
          const exists = await userModel.findOne({ email: username });
          if (exists) {
            return done(null, false);
          }
          const user = await userModel.create({
            first_name,
            last_name,
            age,
            email: username,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
            cart,
            role,
          });
          return done(null, user);
        } catch (error) {}
        return done(error);
      }
    )
  );
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        JWTFromRequest: ExtractJWT.fromExtractors([cookieExtractors]),
        secretOrKey: "secreto",
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
  });
};

export default initializePassport;
