const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min:3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min:6,
    },
    profilePicture: {
        type: String,
        default:""
    },
    coverPicture: {
        type: String,
        default:""
    },
    followers:{
        type: Array,
        default: []
    },
    followings:{
        type: Array,
        default: [],
    },

    desc:{
        type: String,
        max: 50 ,
        default: ""
    },
    city:{
        type: String,
        max: 50,
        default: ""
    },
    from:{
        type: String,
        max: 50,
         default: ""
    },

   // { timestamps : true}
   tokens: [{
    token: {
        type: String,
        required: true
    }
}]

});

UserSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

UserSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
UserSchema.statics.findByCredentials = async (username, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ username} )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}


const User = mongoose.model('User', UserSchema)

module.exports = User
