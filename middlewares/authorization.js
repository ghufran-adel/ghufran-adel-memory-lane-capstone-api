const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY; 


//middleware function for authorize the request header
function authorize(req, res, next) {

	const { authorization } = req.headers;
	const token = authorization.split(" ")[1];

	if (!authorization) {
		return res.status(401).json("Please login");
	}

	const payload = jwt.verify(token, secretKey);

	if (!payload) {
		return res
			.status(403)
			.json("Error loading, please sign in again");
	}

	req.decoded = payload;
	next();
}

// Export the middleware function
module.exports = { authorize };