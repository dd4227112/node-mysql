const index = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'SignUp page'
    });
}

module.exports = { index }