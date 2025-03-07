import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

export const sendMail = async (email: string, sub: string, text: string) => {
    try {
        const options = {
            from: process.env.MAIL_USER,
            to: email,
            subject: sub,
            text: text,
        };

        const info = await transporter.sendMail(options);
    } catch (error) {
        throw error;
    }
};
