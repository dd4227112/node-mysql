const user = require('../db/models/user');
const bcrypt = require('bcryptjs');
const asyncErrorHanlder = require('../Utils/asyncErrorHandler');
const appError = require('../Utils/appError');
const { createToken, cleanResult } = require('../Utils/helper');
const sequelize = require('../config/database');

const { QueryTypes, Op } = require('sequelize'); // call Sequelize class , Op == operators (==, !=, in, not in, <, > etc) Op.eq, Op.ne, Op.in, etc


const getUsers = asyncErrorHanlder(async (req, res) => {
    // const users = await user.findAll({
    //     // attributes: [['id', 'user_id'], 'firstName', 'lastName', 'userType', 'email', 'createdAt'] // select id as user_id, firstName, lastName, userType, email, createdAt from users
    //     attributes: {
    //         exclude: ['password', 'deletedAt']
    //     }
    // });

    const users = await sequelize.query('SELECT id, "firstName", "lastName", email,  case when "userType" = \'1\' then \'admin\' else \'user\' end as "role", "userType", "createdAt", "updatedAt" FROM users', {
        type: QueryTypes.SELECT
    })
    res.status(200).json({
        status: 'success',
        count: users.length,
        data: {
            users,
        }
    });
});

const SignUp = asyncErrorHanlder(async (req, res, next) => {
    const data = req.body;
    if (![1, 2].includes(data.userType)) return next(new appError('Invalid User Types', 400));

    const newUser = await user.create({
        firstName: data.firstName,
        lastName: data.lastName,
        userType: data.userType,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword

    });
    const token = createToken(newUser);

    res.status(201).json({
        status: 'success',
        token,
        user: cleanResult(newUser, 'password', 'createdAt', 'updatedAt', 'deletedAt', 'token_expire', 'access_token'),
    });
});

const signIn = asyncErrorHanlder(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new appError('Password and Email are required!', 400));

    const userData = await user.findOne(
        {
            where: { email },
        });

    if (!userData || !(await bcrypt.compare(password, userData.password))) return next(new appError('Password or Email are incorrect!', 401));

    const token = createToken(userData);
    res.status(200).json({
        status: 'success',
        token,
        user: cleanResult(userData, 'password', 'createdAt', 'updatedAt', 'deletedAt', 'token_expire', 'access_token'),
    });
});

module.exports = { getUsers, SignUp, signIn }