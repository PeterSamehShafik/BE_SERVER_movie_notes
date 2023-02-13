

export const globalErrorHandling = (err, req, res, next) => {
    if (err) {
        if (process.env.MODE === "DEV") {
            return res.status(err['cause'] || 500).json({ message: err.message, stack: err.stack })
            // console.log({ Error: err.stack })
        } else {
            return res.status(err['cause'] || 500).json({ message: err.message })
        }
    }
}

export const asyncHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next)
        } catch (error) {
            return next(Error(error, { cause: 500 }))
        }
    }
}