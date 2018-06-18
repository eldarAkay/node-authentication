const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define the model
const userSchema = new Schema({
    email: {type: String, unique: true, lowercase: true, required: true},
    password: String
});

// On save hook, encrypt password
// Before saving a model run this function.
userSchema.pre('save', function (next) {
    // get access to the user model
    const user = this;

    // generate a salt than run a callback function
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        // hash the password using the salt
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) {
                return next(err);
            }
            // override password with the encrypted one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePasswords = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {return callback(err);}

        callback(null, isMatch);
    })
};

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;