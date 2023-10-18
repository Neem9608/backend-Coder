import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.post(
  '/signup',
  passport.authenticate('register', { failureRedirect: '/algofallo' }),
  async (req, res) => {
    console.log(req.user);
    res.redirect('/login');
  }
);
router.post ('/login', (req, res)=> {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email});
    if (!user) {
        return res.status(404).send('tucuenta no exixste');
}
if (bcrypt.compareSync(password, user.password)){
    return res.status(401).send ('contraseña equivocada');
}
const userId = user._id;
const token = jwt.sing ({userId}, 'secreto', {expiresIn: '24h'});

res 
.cookie('token',token, {
    maxAge: 1000000,
    httpOnly: true,
})
.send('Estas logueado')
});

router.get ('/current', passport.authenticate('jwt', { session: false}),
async (req, res) => {
    res.send(req.user);
}
);
export default router;