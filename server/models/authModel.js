const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        minLength: [3, "Username must be at least 3 characters"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,

    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }

);

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.generateToken = function () {
    return jwt.sign({_id: this._id, username:this.username,email:this.email,isAdmin:this.isAdmin}, process.env.JWT_SECRET, {expiresIn: "1hr"});
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password);
}
const User = mongoose.model("User", userSchema);

module.exports = User;