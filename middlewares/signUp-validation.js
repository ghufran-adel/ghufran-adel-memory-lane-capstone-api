//middleware function for validating the request body
const validateSignUp = (req, res, next) => {
  if (!req.body.user_name || !req.body.password || !req.body.email) {
    const missingFields = [];
    if (!req.body.user_name) missingFields.push("user_name");
    if (!req.body.email) missingFields.push("email");
    if (!req.body.password) missingFields.push("password");

    return res.status(400).json({
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }
  // Function to validate email format
  const validateEmail = () => {

    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(req.body.email);
  };

  if (validateEmail) {
    return res.status(400).json({
      message: "Invalid email format",
    });
  }

  next();
};

// Export the middleware function
module.exports = { validateSignUp };
