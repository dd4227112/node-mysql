
function devError(res, error) {
    if (error.isOperration) {
        res.status(error.statusCode).json({
            status: error.statusMessage,
            message: error.message,
            error,
            trace: error.stack
        })
    } else {
        res.status(500).json({
            status: 'error',
            message: error.message,
            error,
            trace: error.stack
        })
    }
}
function prodError(res, error) {
    if (error.isOperration) {
        res.status(error.statusCode).json({
            status: error.statusMessage,
            message: error.message,
        })
    } else {
        res.status(500).json({
            status: 'error',
            message: 'Somethind went wrong'
        })
    }
}

module.exports = (error, req, res, next) => {
    if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({
            status: 'error',
            message: `${error.errors[0].message}`,

        });
    } else if (error.name === 'SequelizeValidationError') {
        res.status(400).json({
            status: 'error',
            message: `${error.errors[0].message}`,
            error,
            trace: error.stack
        });
    }
    else if (process.env.APP_ENVIRONMENT === 'development') {
        devError(res, error);
    } else {
        prodError(res, error);
    }

}