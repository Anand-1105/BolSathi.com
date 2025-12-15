const Mailjet = require('node-mailjet');

const sendEmail = async ({ email, subject, text, html }) => {
    try {
        const mailjet = Mailjet.apiConnect(
            process.env.MAILJET_API_KEY,
            process.env.MAILJET_API_SECRET
        );

        const request = await mailjet.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    From: {
                        Email: process.env.Ob_EMAIL || 'pushpeshlink@gmail.com', // Use a default or env var
                        Name: 'BolSathi',
                    },
                    To: [
                        {
                            Email: email,
                            Name: '',
                        },
                    ],
                    Subject: subject,
                    TextPart: text,
                    HTMLPart: html,
                },
            ],
        });

        console.log('Email sent successfully:', request.body);
        return request.body;
    } catch (error) {
        console.error('Error sending email:', error.statusCode, error.message);
        throw error;
    }
};

module.exports = sendEmail;
