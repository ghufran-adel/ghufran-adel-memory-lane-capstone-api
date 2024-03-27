const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY; 


//middleware function for authorize the request header
function authorize(req, res, next) {

	const { authorization } = req.headers;
	const token = authorization.split(" ")[1];

	if (!authorization) {
		return res.status(401).json("Please include a JWT token in the Authorization header");
	}

	try{
		const payload = jwt.verify(token, secretKey);
		req.decoded = payload;
		next();
	}
	catch (error) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
	

	// if (!payload) {
	// 	return res
	// 		.status(403)
	// 		.json("Error loading, please sign in again");
	// }



}

// Export the middleware function
module.exports = { authorize };