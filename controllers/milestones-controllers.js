const knex = require("knex")(require("../knexfile"));

const getMilestones = async (req, res) => {
  // get the id from the token in the request

  const userId = req.decoded.id;
  const { profileId } = req.params;

  try {
    // Query milestones associated with the profile ID and user ID
    const milestones = await knex("milestones")
      .where({ profile_id: profileId })
      .whereIn("profile_id", function () {
        this.select("id")
          .from("profile")
          .where({ id: profileId, user_id: userId });
      });

    // Query media associated with the milestones
    const media = await knex("media").whereIn(
      "milestone_id",
      milestones.map((milestone) => milestone.id)
    );

    // Organize media into arrays for each milestone
    const milestonesWithMedia = milestones.map((milestone) => {
      const milestoneMedia = media.filter(
        (m) => m.milestone_id === milestone.id
      );
      return {
        ...milestone,
        media: milestoneMedia.map((m) => ({
          media_id: m.id,
          media_type: m.media_type,
          media_url: m.media_url,
        })),
      };
    });

    res.json(milestonesWithMedia);
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

const getOneMilestone = async (req, res) => {
  // get the id from the token in the request
  const userId = req.decoded.id;
  const { profileId } = req.params;
  const { milestoneId } = req.params;

  try {
    // Check if the profile belongs to the user
    const profile = await knex("profile")
      .where({ id: profileId, user_id: userId })
      .first();

    if (!profile) {
      return res
        .status(403)
        .json({ message: "Unauthorized access to profile" });
    }

    // Query milestone associated with the profile ID and milestone ID
    const milestone = await knex("milestones")
      .where({ profile_id: profileId, id: milestoneId })
      .first();

    if (!milestone) {
      return res.status(404).json({ message: "Milestone not found" });
    }

    // Query media associated with the milestone
    const media = await knex("media").where("milestone_id", milestone.id);

    // Organize media into arrays for the milestone
    const milestoneWithMedia = {
      ...milestone,
      media: media.map((m) => ({
        media_id: m.id,
        media_type: m.media_type,
        media_url: m.media_url,
      })),
    };

    res.json(milestoneWithMedia);
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

// POST new milestone

const addMilestone = async (req, res) => {
  // get the id from the token
  const userId = req.decoded.id;
  const { profileId } = req.params;
  console.log(req.body)

  try {
    // Check if the profile belongs to the user
    const profile = await knex("profile")
      .where({ id: profileId, user_id: userId })
      .first();

    if (!profile) {
      return res
        .status(403)
        .json({ message: "Unauthorized access to profile" });
    }

    // Extract profile data from the request body
    const { title, date, address, latitude, longitude, description ,people } = req.body;

    const latitudeValue = latitude ? parseFloat(latitude) : null;
    const longitudeValue = longitude ? parseFloat(longitude) : null;

    // Insert the new milestone into the database
    const newMilestone = await knex("milestones").insert({
      profile_id: profileId,
      title,
      date,
      address,
      latitude: latitudeValue,
      longitude: longitudeValue,
      description,
      people:people
    });

    // Fetch the newly created milestone
    const createdMilestone = await knex("milestones")
      .where({ id: newMilestone[0] })
      .first();

    // Iterate over each file  ( media ) and insert it into the database
    for (const file of req.files) {
      const filename = file.filename;
      const mediaUrl = `/uploads/${filename}`;

      // Insert the new media related to this milestone into the database
      const newMedia = await knex("media").insert({
        milestone_id: newMilestone[0],
        media_type: "image",
        media_url: mediaUrl,
      });
    }

    // Fetch the newly created media
    const createdMedia = await knex("media").where({
      milestone_id: newMilestone[0],
    });

    // Check if the insertion was successful
    if (
      !newMilestone ||
      newMilestone.length === 0 ||
      !createdMedia ||
      createdMedia.length === 0
    ) {
      return res.status(500).json({ message: "Failed to create milestone" });
    }

    res.status(201).json({
      message: "Milestone created successfully",
      ...createdMilestone,
      media: createdMedia.map((m) => ({
        media_id: m.id,
        media_type: m.media_type,
        media_url: m.media_url,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

// DELETE one milstone related to the profile ID

const deleteOneMilestone = async (req, res) => {
  // get the id from the token
  const userId = req.decoded.id;

  const { profileId } = req.params;
  const { milestoneId } = req.params;

  try {
    // Check if the profile belongs to the user
    const profile = await knex("profile")
      .where({ id: profileId, user_id: userId })
      .first();

    if (!profile) {
      return res
        .status(403)
        .json({ message: "Unauthorized access to profile" });
    }

    const Deletedmilstone = await knex("milestones")
      .where({ id: milestoneId })
      .delete();
    // No Content response
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

module.exports = {
  getMilestones,
  getOneMilestone,
  addMilestone,
  deleteOneMilestone,
};
