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
    console.log("hello");
    // get the id from the token in the request
    const userId = req.decoded.id;
    const { profileId } = req.params;
    const {milestoneId} = req.params;
  
    try {
      // Check if the profile belongs to the user
      const profile = await knex("profile")
        .where({ id: profileId, user_id: userId })
        .first();
  
      if (!profile) {
        return res.status(403).json({ message: "Unauthorized access to profile" });
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
  

module.exports = { getMilestones , getOneMilestone };
