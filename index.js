const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();


// Serve static files from the public/images directory
// app.use("/public/images", express.static(__dirname + "/public/images/"));
app.use(express.static("public"));


const { PORT, CORS_ORIGIN } = process.env;
const allowedOrigins = CORS_ORIGIN;
const port = PORT || 5051;
console.log(CORS_ORIGIN)

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());



// end of setting to upload image


const usersRoutes = require("./routes/users-routes");
const profileRoutes = require("./routes/profile-routes");
const milstonesRoutes = require("./routes/milestones-routes");
const mediaRoutes=require("./routes/media-routes");


// All routes
app.use("/api/", usersRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/milstones", milstonesRoutes);
app.use("/api/media", mediaRoutes);




app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});