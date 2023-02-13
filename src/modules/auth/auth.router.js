import { Router } from 'express'
import * as authController from './controller/authController.js'
import * as validators from './auth.validation.js'
import { validation } from './../../middleware/validation.js';

const router = Router()

//signup and confirmation
router.post("/signup", validation(validators.signUpValid), authController.signUp)
router.get("/confirmEmail/:token", validation(validators.checkTokenValid), authController.confirmEmail)
//sign in
router.post("/signIn", validation(validators.signInValid), authController.signIn)



// //password reset
// router.post("/sendCode", validation(validators.sendCode), authController.sendCode)
// router.post("/resetPassword", validation(validators.resetPassword), authController.resetPassword)



export default router