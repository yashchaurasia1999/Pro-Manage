const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    try {
        const { token } = req.headers;
        console.log(token)
        if (!token) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized - Token not provided' });
        }

        // const token = authorization.replace('Bearer ', ''); // Remove the 'Bearer ' prefix
        const decodedToken = jwt.verify(token, process.env.secret_key);
        console.log(decodedToken)
        if (!decodedToken) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized - Invalid token' });
        }

        const user = decodedToken.userId; // Set user information in the request object
        console.log(user)
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ status: 'error', message: 'Unauthorized - Invalid token' });
    }
};

module.exports = isLoggedIn;
