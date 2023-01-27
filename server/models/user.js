const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const Joi = require("joi")
const passwordComplexity = require("joi-password-complexity")

const userSchema = new mongoose.Schema({
    nickName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    debtorsList: { type: [{firstName: String, lastName: String, amount: Number, date: Date}], required: false },
})
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
        expiresIn: "7d",
    })
    return token
}
const User = mongoose.model("User", userSchema)
        
const validate = (data) => {
    const schema = Joi.object({
        nickName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        debtorsList: Joi.allow('').optional().label("DebtorsList")
    })
    return schema.validate(data)
    }
module.exports = { User, validate }