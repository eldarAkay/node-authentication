const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');


// session: false - because we want to use tokens, and not cookies
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignIn = passport.authenticate('local', {session: false});

module.exports = function (app) {

    app.get('/', requireAuth, function (req, res) {
       res.send({hi: 'there'});
    });

    app.post('/signup', Authentication.signUp);
    app.post('/signin', requireSignIn, Authentication.signIn);
};