const jwt = require('jwt-simple');
const User = require('./../models/user');
const config = require('./../config');

function tokenForUser(user) {
    // sub stands for - subject
    const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

exports.signIn = function (req, res, next) {
    // USer has already had their email and password auth'd
    // Just give a token
    res.send({token: tokenForUser(req.user)})
};


exports.signUp = function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({error: 'You must provide email and password'});
    }

    // See if a user with the given email exists
    User.findOne({email: email}, function (err, existingUser) {

        if (err) {
            return next(err);
        }
    // If a user exists return an error
        if (existingUser) {
            return res.status(422).send({error: 'Email is in use'});
        }

        // if a user does not exist - create a new user
        const user = new User({
            email: email,
            password: password
        });

        user.save(function (err) {
            if (err) {return next(err)}
        });

        res.json({token: tokenForUser(user)});
    })
};