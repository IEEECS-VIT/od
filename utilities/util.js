exports.allowedUsers = function (types) {
    return function (req, res, next) {
        if (req.user && types.indexOf(req.user.type) !== -1) {
            next();
        } else {
            var error = new Error ('Unauthorized');
            error.status = 403;
            next(error);
        }
    };
};