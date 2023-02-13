import joi from "joi";

export const signUpValid = {
    body: joi.object().required().keys({
        first_name: joi.string().min(2).max(20).required(),
        last_name: joi.string().min(2).max(20).required(),
        email: joi.string().email().required(),
        password: joi.string(). //Minimum eight characters, at least one letter and one number:
            pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$")).required().messages({
                'string.pattern.base': "password must be Minimum 8 and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
            }),
        // cPassword:joi.string().valid(joi.ref('password')).required(),
        phone: joi.string().min(4).max(12),
        address: joi.string().min(4).max(30),
        age: joi.number().min(18).max(99),
        gender: joi.string().valid("male", "female")
    })
}

export const signInValid = {
    body: joi.object().required().keys({
        email: joi.string().email().required(),
        password: joi.string().min(4).max(30).required()
    })
}

export const checkTokenValid = {
    params: joi.object().required().keys({
        token: joi.string().required()
    })
}

export const sendCodeValid = {
    body: joi.object().required().keys({
        email: joi.string().email().required()
    })
}

export const resetPasswordValid = {
    body: joi.object().required().keys({
        email: joi.string().email().required(),
        code: joi.string().min(1).required(),
        newPassword: joi.string().min(4).max(20)
    })

}