import jwt from 'jsonwebtoken'
import userModel from './../../DB/models/user.model.js';
import { asyncHandler } from './errorHandling.js';



const auth = (accessRoles = []) => {
    return asyncHandler(async (req, res, next) => {
        const { authorization } = req.headers
        if (authorization.startsWith(process.env.BEARERKEY)) {
            const decoded = jwt.verify(authorization.split(process.env.BEARERKEY)[1], process.env.SIGNINKEY)
            if (decoded?.user?._id) {
                const user = await userModel.findOne({ _id: decoded.user._id, })
                if (user) {
                    req.user = user
                    return next()
                } else {
                    // res.status(400).json({ message: "This user was deleted or blocked or not confirmed yet, please contact the administrator" })
                    return next(Error("This user was deleted or blocked or not confirmed yet, please contact the administrator", { cause: 404 }))
                }
            } else {
                // res.status(400).json({ message: "authorization error (payload)" })
                return next(Error("authorization error (payload)", { cause: 400 }))

            }
        } else {
            // res.status(400).json({ message: "authorization error (bearerKey)" })
            return next(Error("authorization error (bearerKey)", { cause: 400 }))

        }

    }
    )
}



export default auth