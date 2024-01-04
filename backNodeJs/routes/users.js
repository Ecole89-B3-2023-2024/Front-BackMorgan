var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var Models = require('../models');
var User = Models.User;
var jwt = require('jsonwebtoken');
require('dotenv').configDotenv();
var auth = require('../middleware/auth');

/* GET users listing. */
router.get('/', async(req, res, next) => {
const users = await User.findAll();
res.status(200).json(users);
});

router.post('/register', async(req, res, next) => {
    const salt = await bcrypt.genSalt(10)
    var user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, salt)
    }
    const [created_user, created] = await User.findOrCreate({where: {email: req.body.email}, defaults: user});
    if (created) {
        res.status(201).json(created_user)
    } else {
        res.status(400).json({message: "l'utilisateur existe déja"})
    }
})

router.post('/login', async(req, res) => {
    try {
        const user = await User.findOne({where: {email: req.body.login}});
        if (user) {
            const valid_password = await bcrypt.compare(req.body.password, user.password);
            if (valid_password) {
                const payload = {
                    id: user.id,
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                }
                const token = jwt.sign(payload, process.env.PRIVATE_KEY)
                return res
                .status(200)
                .json({
                    status:200,
                    reponse: req.body.annonce,
                    token: token
                })
            } else {
                res.status(400).json({error: "mot de passe incorrect"})
            }
        } else {
            res.status(404).json({error: "l'utilisateur est introuvable"})
        }
    } catch(err) {
        res.sendStatus(500)
    }
})

router.get('/me', auth, async(req, res, next) => {
    const payload = req.payload;
    let user = await User.findOne({where: {id: payload.id}, attributes: {exclude:["password"]}});
    if (user === null) {
        res.status(404).json({message:"L'utilisateur n'existe pas"});
    }
    res.status(200).json(user);
})

module.exports = router;
