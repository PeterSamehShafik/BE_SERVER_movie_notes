import nodemailer from 'nodemailer'


const sendEmail = async (dest, subject, message, attachments=[]) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'outlook',
            auth: {
                user: process.env.SENDEREMAIL,
                pass: process.env.SENDEREMAILPASSWORD
            }
        })

        let info = await transporter.sendMail({
            from: `Confirmation Email <${process.env.SENDEREMAIL}>`,
            to: dest,
            subject,
            html: message,
            attachments
        })
        // console.log(info)
        return info
    } catch (error) {
        // console.log(`error in sending email message ${error}`)
        return false
    }
}

export default sendEmail