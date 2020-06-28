const User = require('../models/User');

exports.signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                error: 'Email already exists'
            });
        }

        let newUser = await User.create({ name, email, password });

        res.json({
            user: newUser,
            message: 'Signup success! Please log in.'
        })

    } catch (err) {
        res.status(400).json({
            error: err
        })
    }

}