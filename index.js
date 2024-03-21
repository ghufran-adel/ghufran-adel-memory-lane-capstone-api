const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const { PORT, CORS_ORIGIN } = process.env;
const allowedOrigins = CORS_ORIGIN.split(",");
const port = PORT || 5051;

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());



const usersRoutes = require("./routes/users-routes");
const profileRoutes = require("./routes/profile-routes");
const milstonesRoutes = require("./routes/milstones-routes");
const mediaRoutes=require("./routes/media-routes");


// All routes
app.use("/api/users", usersRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/milstonesRoutes", milstonesRoutes);
app.use("/api/media", mediaRoutes);




app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});