const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendGridMail = require('@sendgrid/mail');
const dotenv = require('dotenv');

dotenv.config();
sendGridMail.setApiKey(process.env.SG_API_KEY);

//Signup - email work flow
exports.signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                error: 'Email Address already exists'
            });
        }

        const token = jwt.sign({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, {
           expiresIn: '10m'
        });

        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `Account activation link`,
            html: `
            <h1>Please user the following link to activate your account</h1>
            <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
            <hr/>
            <p>This email may contain sensitive information</p>
            <p>${process.env.CLIENT_URL}</p>
            `
        }

        await sendGridMail.send(emailData);
        res.status(200).json({
            message: `Email has been sent to ${email}. Follow the instructions to activate your account`
        });

        //const newUser = await User.create({ name, email, password })

    } catch (err) {
        console.error(err);
        return res.status(404).json({
            error: err.message
        });
    }
}
