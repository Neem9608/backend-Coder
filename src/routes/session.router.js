import { Router } from 'express';
import passport from 'passport';
import { sessionController } from '../controllers/index.js';

const router = Router();

router.post(
    '/signup',
    passport.authenticate('localSignup', {
        failureRedirect: '/api/sessions/failRegister',
        failureMessage: true,
    }),

    sessionController.localSignUp
);

router.get('/failRegister', sessionController.localFailRegister);

router.post(
    '/localLogin',
    passport.authenticate('localLogin', {
        failureRedirect: '/api/sessions/failLogin',
        failureMessage: true,
    }),
    sessionController.localLogIn
);

router.get('/failLogin', sessionController.localFailLogin);

router.post('/logout', sessionController.logout);

router.get(
    '/githubLogin',
    passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
    '/githubcallback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    sessionController.githubCallback
);

router.post('/login', sessionController.login);

router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    sessionController.current
);

export default router;



























// import { Router } from "express";
// import passport from "passport";
// import { userModel } from "../dao/mongo/models/user.model";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// const router = Router();

// router.post(
//   "/signup",
//   passport.authenticate("register", { failureRedirect: "/algofallo" }),
//   async (req, res) => {
//     console.log(req.user);
//     res.redirect("/login");
//   }
// );
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await userModel.findOne({ email });
//   if (!user) {
//     return res.status(401).send("tu cuenta no existe");
//   }
//   if (!bcrypt.compareSync(password, user.password)) {
//     return res.status(401).send("contraseña equivocada");
//   }
//   const userId = user._id;
//   const token = jwt.sing({ userId }, "secreto", { expiresIn: "24h" });

//   res
//     .cookie("token", token, {
//       maxAge: 1000000,
//       httpOnly: true,
//     })
//     .send("Estas logueado");
// });

// router.get(
//   "/current",
//   passport.authenticate("jwt", { session: false }),
//   loadUser,
//   async (req, res) => {
//     res.send(req.user);
//   }
// );
// router.get("/formlogin", (req, res) => res.render("login"));
// export default router;
