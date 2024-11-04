const { prodError, devError } = require("../Utils/helper");

module.exports = (error, req, res, next) => {
    if (error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeValidationError') {
        res.status(400).json({
            status: 'error',
            message: `${error.errors[0].message}`,

        });
    } else if (error.name === 'TokenExpiredError') {
        res.status(403).json({
            status: 'error',
            message: `Session expired. Please login again`,

        });
    }
    else if (process.env.APP_ENVIRONMENT === 'development') {
        devError(res, error);
    } else {
        prodError(res, error);
    }

}