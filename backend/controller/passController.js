const Sib = require('sib-api-v3-sdk');
require('dotenv').config()

exports.forgetPassword = (req, res) => {
    const mail = req.body.email;

    // Initialize the client
    const client = Sib.ApiClient.instance;
    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = "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"

    // Create instance of the transactional email API
    const TranEmailApi = new Sib.TransactionalEmailsApi();

    // Define sender and recipient
    const sender = { email: 'solutions9584@gmail.com' };
    const receivers = [{ email: mail }]; // Use the email from the request body

    // Send the transactional email
    TranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: "Password Reset Request",
        textContent: "Your password reset request was successful. Please follow the instructions to reset your password."
    })
    .then(response => {
        res.status(201).json({ message: 'Password reset email sent successfully', response });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Failed to send password reset email', error: err.message });
    });
};
