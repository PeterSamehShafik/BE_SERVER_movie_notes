import { asyncHandler } from "../../../middleware/errorHandling.js";
import { create, findOne, updateOne } from './../../../../DB/DBmethods.js';
import userModel from './../../../../DB/models/user.model.js';
import bcrypt from 'bcryptjs'
import sendEmail from './../../../services/email.js';
import jwt from 'jsonwebtoken'
import { nanoid } from "nanoid";

export const signUp = asyncHandler(
    async (req, res, next) => {

        const { first_name, last_name, password, age } = req.body
        let { email } = req.body
        email = email.toLowerCase()
        const exist = await findOne({ model: userModel, filter: { email }, select: "email" })
        if (!exist) {
            const hashed = bcrypt.hashSync(password, parseInt(process.env.SALTROUNDS))
            const newUser = await create({ model: userModel, data: { first_name, last_name, email, password: hashed, age } })
            //Send Email
            const token = jwt.sign({ _id: newUser._id, site: req.headers.origin }, process.env.SIGNUPKEY, { expiresIn: "12h" })
            const link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}`
            const message = `<h3>Follow the below link to confirm your email </h3> <h2><a href=${link}>Confirm<a/><h2/>`
            if (newUser) {
                const sent = await sendEmail(email, "Confirmation Email", message)
                if (sent.accepted.length) {
                    return res.status(201).json({ message: "done", user: { _id: newUser._id, first_name, last_name, email, age } })
                } else {
                    return next(Error("Error in sending email please try again", { cause: 400 }))
                }
            } else {
                return next(Error("Error while Sign up please try again ", { cause: 400 }))
            }

        } else {
            return next(Error("Email already exist", { cause: 409 }))
            // res.status(200).json({ message: "Email already exist" })

        }
    })

export const confirmEmail = asyncHandler(async (req, res, next) => {
    const { token } = req.params
    const decoded = jwt.verify(token, process.env.SIGNUPKEY)
    if (decoded?._id) {
        const user = await findOne({ model: userModel, filter: { _id: decoded._id } })
        if (user) {
            const updated = await updateOne({ model: userModel, filter: { _id: user._id, isConfirmed: false }, data: { isConfirmed: true } })
            // updated.modifiedCount ? res.redirect('https://moviie-react.netlify.app/') : next(Error("Already confirmed", { cause: 400 }))
            return res.redirect(decoded.site);
            // res.status(200).send("Email is confirmed")
        } else {
            return next(Error("User not found", { cause: 404 }))
        }

    } else {
        return next(Error("In-valid token payload", { cause: 403 }))
    }
})

export const signIn = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    const user = await findOne({ model: userModel, filter: { email: email.toLowerCase() } })
    if (user) {
        const match = bcrypt.compareSync(password, user.password)
        if (match) {
            if (user.isConfirmed) {
                const result = { first_name: user.first_name, last_name: user.last_name, _id: user._id }
                const token = jwt.sign({ user: result }, process.env.SIGNINKEY, { expiresIn: 60 * 60 * 24 })
                return res.status(200).json({ message: "done", token, isSigned: true })
            } else {
                return next(Error("Please Confirm your email", { cause: 403 }))
            }
        } else {
            return next(Error("Wrong Email or Password", { cause: 401 }))
        }
    } else {
        return next(Error("Wrong Email or Password", { cause: 401 }))
    }
})


// export const sendCode = asyncHandler(async (req, res, next) => {
//     const { email } = req.body
//     const user = await findOne({ model: userModel, filter: { email }, select: "email" })
//     if (user) {
//         const code = nanoid()
//         const message = `<h3>Your code is <b>${code}</b> </h3> `
//         const updateCode = await updateOne({ model: userModel, filter: { email }, data: { code } })
//         if (updateCode.modifiedCount) {
//             const sent = await sendEmail(email, "Reset Password", message)
//             if (sent.accepted) {
//                 res.status(200).json({ message: "done", details: "Email sent if exists" })
//             } else {
//                 next(Error("error in sending email", { cause: 400 }))
//             }
//         } else {
//             next(Error("error in sending email", { cause: 400 }))
//         }
//     } else {
//         res.status(200).json({ message: "done", details: "Email sent if exists" })
//     }
// })

// export const resetPassword = asyncHandler(async (req, res, next) => {
//     const { email, newPassword, code } = req.body
//     const user = await findOne({ model: userModel, filter: { email }, select: "password code" })
//     if (user) {
//         if (user.code === code) {
//             const hashed = bcrypt.hashSync(newPassword, +process.env.SALTROUNDS)
//             const updateUser = await updateOne({ model: userModel, filter: { email, code }, data: { code: null, password: hashed } })
//             updateUser.modifiedCount ? res.status(200).json({ message: "done" }) : next(Error("fail to update password", { cause: 400 }))
//         } else {
//             next(Error("Code misMatch", { cause: 403 }))
//         }
//     } else {
//         next(Error("User not found", { cause: 404 }))
//     }
// })

