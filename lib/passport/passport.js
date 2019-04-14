var LocalStrategy = require('passport-local').Strategy;
var User = require("../../models/User")
var bcrypt = require('bcrypt')

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user) {
            done(err, user)
        })
    });

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {
        User.findOne({email: email}, function(err, user){
            if(err) {
                return done(err, null);
            }

            if (!user) {
                return done(null, false, req.flash('loginMessage', 'User does not exist. Please sign up.'))
            }

            bcrypt.compare(password, user.password)
            .then((err, res) => {
                if (err === false) {
                    return done(null, false, req.flash('loginMessage', 'Check email or password is valid.'))
                } else if (res === false) {
                    return done(null, false, req.flash('loginMessage', 'Check email or password is valid.'))
                } else {
                    return done(null, user);
                }
            })
        })
    }
    ))
}