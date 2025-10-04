import { generateVerificationOtpEmailTemplate } from "./emailTemplates.js";
import { sendEmail } from "./sendEmail.js";

export async function sendVerificationCode(verificationCode, email, res) {
    try {
        const message = generateVerificationOtpEmailTemplate(verificationCode);

        sendEmail({
            email: email,
            subject: "Verification Code (DigiLibrary)",
            message,
        });
        res.status(200).json({
            success: true,
            message: `Verification code sent to ${email} successfully`,
        });
    } catch (error) {

        return res.status(201).json({
           success: false,
           message: "Verification code failed to send",

         });
    }
}