const asyncErrorHanlder = (fun) => {
    return (req, res, next) => {
        fun(req, res, next).catch((error) => {
            next(error)
        });
    }
}
module.exports = asyncErrorHanlder;