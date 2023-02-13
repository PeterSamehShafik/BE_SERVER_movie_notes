import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    first_name: {
        type: String,
        required: [true, "firstName required"],
        min: [2, "Length of firstName must be more than 2 "],
        max: [20, "Length of firstName must not be more than 20 "],
    },
    last_name: {
        type: String,
        required: [true, "lastName required"],
        min: [2, "Length of lastName must be more than 2 "],
        max: [20, "Length of lastName must not be more than 20 "],
    },
    email: {
        type: String,
        required: [true, "email required"],
        min: [2, "Length of email must be more than 2 "],
        max: [50, "Length of email must not be more than 50 "],
    },
    password: {
        type: String,
        required: [true, "password required"],
        min: [8, "Length of password must be more than 8 "],
        max: [25, "Length of password must not be more than 25 "],
    },
    age: {
        type: Number,
        min: [15, " age must be more than 15 "],
        max: [99, " age must not be more than 99 "],
    },
    code: {
        type: String,
        default: null
    },
    isConfirmed: { type: Boolean, default: false }
}, {
    timestamps: true
})


const userModel = model('User', userSchema)

export default userModel