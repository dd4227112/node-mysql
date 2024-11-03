const jwt = require('jsonwebtoken');
module.exports.cleanResult = (data, ...columns) => {
    // convert model object to javascript object
    result = data.toJSON();
    // remove some columns since we dont want to show them to user
    columns.forEach((column) => {
        delete result[column]
    })
    return result;
}

module.exports.createToken = (userData) => {
    const token = jwt.sign({ id: userData.id, email: userData.email }, process.env.JWT_SECRETE_KEY, { algorithm: process.env.JWT_ALGORITHM, expiresIn: process.env.TOKEN_EXPIRE });
    return token;
}

module.exports.devError = (res, error) => {
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
module.exports.prodError = (res, error) => {
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