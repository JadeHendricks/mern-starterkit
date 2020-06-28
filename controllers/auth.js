exports.signup = async (req, res, next) => {
    console.log(req.body);
    res.json({
        data: 'You hit the signup endpoint'
    });
}