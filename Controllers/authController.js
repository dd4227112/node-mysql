const user = require('../db/models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncErrorHanlder = require('../Utils/asyncErrorHandler');
const appError = require('../Utils/appError');

const index = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'SignUp page'
    });
}
const cleanResult = (data, ...columns) => {
    // convert model object to javascript object
    result = data.toJSON();
    // remove some columns since we dont want to show them to user
    columns.forEach((column) => {
        delete result[column]
    })
    return result;
}

const createToken = (userData) => {
    const token = jwt.sign({ id: userData.id, email: userData.email }, process.env.JWT_SECRETE_KEY, { algorithm: process.env.JWT_ALGORITHM, expiresIn: process.env.TOKEN_EXPIRE });
    return token;
}
const SignUp = asyncErrorHanlder(async (req, res, next) => {
    const data = req.body;
    if (![1, 2].includes(data.userType)) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid User Types'
        });
    }
    const newUser = await user.create({
        firstName: data.firstName,
        lastName: data.lastName,
        userType: data.userType,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword

    });
    token = createToken(newUser);

    res.status(201).json({
        status: 'success',
        token,
        user: cleanResult(newUser, 'password', 'createdAt', 'updatedAt', 'deletedAt'),
    });
});

const signIn = asyncErrorHanlder(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new appError('Password and Email are required!', 400));
    }
    const userData = await user.findOne(
        {
            where: { email },
        });

    if (!userData || !(await bcrypt.compare(password, userData.password))) {
        return next(new appError('Password or Email are incorrect!', 401));
    }
    token = createToken(userData);
    res.status(200).json({
        status: 'success',
        token,
        user: cleanResult(userData, 'password', 'createdAt', 'updatedAt', 'deletedAt'),
    });
});

module.exports = { index, SignUp, signIn }