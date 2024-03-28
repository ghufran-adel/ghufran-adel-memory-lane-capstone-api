const validateMilestoneData = (req, res, next) => {
    const { title, date, address, latitude, longitude, description } = req.body;
    const missingFields = [];
  
    // Check if required fields are present and non-empty
    if (!title) {
      missingFields.push('title');
    }
    if (!date) {
      missingFields.push('date');
    }
    if (!address) {
      missingFields.push('address');
    }
    if (!description) {
      missingFields.push('description');
    }
  
    // Check if latitude and longitude are valid numbers
    if (latitude !== undefined && isNaN(parseFloat(latitude))) {
      return res.status(400).json({ message: "Latitude must be a valid number" });
    }
  
    if (longitude !== undefined && isNaN(parseFloat(longitude))) {
      return res.status(400).json({ message: "Longitude must be a valid number" });
    }
  
    if (missingFields.length > 0) {
      console.log("Missing fields:", missingFields);
      return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
    }
  
    next();
  };
  
  module.exports = {validateMilestoneData};
  