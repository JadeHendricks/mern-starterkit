const User = require('../models/User');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const sendGridMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
const _ = require('lodash');
const { OAuth2Client } = require('google-auth-library');

dotenv.config();
sendGridMail.setApiKey(process.env.SG_API_KEY);

//Signup - email work flow
exports.signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'Email Address already exists'
            });
        }

        const token = jwt.sign({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, {
           expiresIn: 3600000
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
            message: err.message
        });
    }
}

exports.accountActivation = async (req, res, next) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({
            message: 'No token associated to this account'
        });
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION);

        const { name, email, password } = decoded;
        await User.create({ name, email, password });

        res.status(201).json({
            message: 'Signup success. Please signin'
        });
        
    } catch (err) {
        console.error(err);
        res.status(401).json({
            message: 'Expired Link. Signup again'
        });
    }
}

exports.signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });

        //TODO - CHECK PASSWORD
        //if (!user || !user.authenticate(password)) {
        if (!user || password !== user.password) {
            return res.status(400).json({
                message: 'Email or Password is incorrect.'
            });
        } 

        const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET, { expiresIn: 3600000 });
        const { _id, name, user_email, role } = user;

        res.status(200).json({
            token,
            user: { _id, name, user_email, role }
        });

    } catch (err) {
        console.error(err);
        res.status(400).json({
            message: err
        });
    }
}

exports.requireSignin = expressJwt({
    //validate token and makes data available in req.user
    secret: process.env.JWT_SECRET
});

exports.adminOnlyRoutes = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            });
        }
    
        if (user.role !== 'admin') {
            return res.status(400).json({
                message: 'Admin resource. Access denied.'
            });
        }
    
        req.profile = user;
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server Error'
        })
    }

}

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'User does not exist'
            });
        }
    
        const token = jwt.sign({ _id: user._id, name: user.name }, process.env.JWT_RESET_PASSWORD, {
            expiresIn: 3600000
         });
    
         const emailData = {
             from: process.env.EMAIL_FROM,
             to: email,
             subject: `Password Reset link`,
             html: `
             <h1>Please user the following link to reset your password</h1>
             <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
             <hr/>
             <p>This email may contain sensitive information</p>
             <p>${process.env.CLIENT_URL}</p>
             `
         }
    
         await user.updateOne({ resetPasswordLink: token });
    
         await sendGridMail.send(emailData);
         res.status(200).json({
             message: `Email has been sent to ${email}. Follow the instructions to reset your password`
         });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server Error'
        })
    }
}

exports.resetPassword = async (req, res) => {
    const { resetPasswordLink, newPassword } = req.body;

    try {
        if (resetPasswordLink && await jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD)) {
            let user = await User.findOne({ resetPasswordLink });
            if (!user) {
                return res.status(400).json({
                    message: 'User not found'
                });
            }
    
            const updatedFields = {
                password: newPassword,
                resetPasswordLink: ''
            }
    
            user = _.extend(user, updatedFields);
            await user.save();
    
            res.status(200).json({
                message: 'Password has been updated'
            })
        }   
    } catch (err) {
        console.error(err.message);
        res.status(401).json({
            message: err.message
        });
    }
}

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
exports.googleLogin = async (req, res) => {
    const { idToken } = req.body;

    try {
        const response = await client.verifyIdToken({ idToken, audience: process.env.REACT_APP_GOOGLE_CLIENT_ID });   

        if (response.payload.email_verified) {
            let user = await User.findOne({ email: response.payload.email });

            if (user) {
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: 3600000
                });
                const { _id, email, name, role } = user;
    
                res.status(200).json({
                    token,
                    user: { _id, email, name, role }
                });
            } 

            if (!user) {
                const password = response.payload.email + process.env.JWT_SECRET;
    
                user = new User({ name: response.payload.name, email: response.payload.email, password });
                user.save();

                console.log(user);
    
                const { _id, email, name, role } = user;
    
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: 3600000
                });
    
    
                res.status(200).json({
                    token,
                    user: { _id, email, name, role }
                });
            }
        }
        } catch (err) {
            console.error(err.message);
            res.status(400).json({
                error: err.message,
                message: 'Google Login Failed. Try Again!'
            });  
    }
}