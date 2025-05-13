const express = require("express");
const router = express.Router();
const { fetchGitHubUser } = require("../utils/github");

router.post("/", async (req, res, next) => {
  try {
    if (!req.body.developers || !Array.isArray(req.body.developers)) {
      return res
        .status(400)
        .json({ error: "Request body must include a developers array" });
    }

    const promises = req.body.developers.map((dev) => fetchGitHubUser(dev));
    const results = await Promise.all(promises);

    return res.json(results);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
