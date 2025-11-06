import nodemailer from "nodemailer";

export const sendRegistrationMail = async (email, name) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Gmail address
                pass: process.env.EMAIL_PASS, // App Password
            },
        });

        const mailOptions = {
            from: `"LifeShare Blood Network" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "❤️ Donor Registration Successful",
            html: `
                <div style="font-family:Arial,sans-serif;padding:20px;background:#f8f9fa;border-radius:10px;">
                    <h2 style="color:#d90429;">Thank You, ${name}!</h2>
                    <p>We appreciate your generosity and willingness to save lives through blood donation.</p>
                    <p>You have been successfully registered in the LifeShare Blood Network system.</p>
                    <br/>
                    <p style="color:#555;">With gratitude,<br/>The LifeShare Team</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log("✅ Mail sent to:", email);
    } catch (error) {
        console.error("❌ Mail sending failed:", error.message);
    }
};
