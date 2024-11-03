const user = require("../db/models/user");
const appError = require("../Utils/appError");
const jwt = require('jsonwebtoken');
const asyncErrorHanlder = require("../Utils/asyncErrorHandler");

module.exports.authMiddleware = asyncErrorHanlder(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return next(new appError('Unauthorized access', 401));

    if (!token || !token.toLowerCase().startsWith('bearer ')) return next(new appError('Invalid Authorization header', 400));

    userToken = token.split(' ')[1];
    plainToken = jwt.verify(userToken, process.env.JWT_SECRETE_KEY, { algorithms: process.env.JWT_ALGORITHM });
    console.log(plainToken);

    if (!plainToken) return next(new appError('Unauthorized access', 401));

    // find login user
    const loginUser = await user.findOne({
        where: { email: plainToken.email },
        attributes: ['id', 'firstName', 'lastName', 'email', 'userType']
    });
    if (!loginUser) return next(new appError('User with the given token does not exist', 401));

    req.user = loginUser;
    next();
});
module.exports.roleMiddleware = (req, res, next) => {
    if (req.user.userType != 1) return next(new appError('You don\'t have permission to perform this action', 403));
    next();
}