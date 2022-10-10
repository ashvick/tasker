const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

router.route('/register').post(async (req, res) => {
    const user = req.body;

    const takenUsername = await User.findOne({'username': user.username});
    const takenEmail = await User.findOne({'username': user.username});

    if (takenUsername || takenEmail) {
        res.status(400).json({ message: 'Username or Email has already been taken' });
    } else {
        user.password = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            username: user.username.toLowerCase(),
            email: user.email.toLowerCase(),
            password: user.password,
        });

        newUser.save();
        res.status(200).send();
    }
});

router.route('/login').post((req, res) => {
    const userLoggingIn = req.body;

    User.findOne({username: userLoggingIn.username})
        .then(dbUser => {
            if (!dbUser) {
                return res.status(400).json({message: 'Invalid username or password'});
            } else {
                bcrypt.compare(userLoggingIn.password, dbUser.password)
                    .then(isCorrect => {
                        if (isCorrect) {
                            const payload = {
                                id: dbUser._id,
                                username: dbUser.username,
                            }

                            jwt.sign(
                                payload,
                                process.env.JWT_SECRET,
                                { expiresIn: 360000 },
                                (err, token) => {
                                    if (err) return res.json({ message: err });

                                    return res.json({
                                        message: 'Success',
                                        token: 'Bearer ' + token,
                                    });
                                }
                            )
                        } else {
                            res.status(400).json({ message: 'Invalid username or password' });
                        }
                    });
            }
        });
});

module.exports = router;
