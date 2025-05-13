const axios = require("axios");

async function fetchGitHubUser(username) {
  try {
    const resp = await axios.get(`https://api.github.com/users/${username}`);
    return { name: resp.data.name, bio: resp.data.bio };
  } catch (err) {
    if (
      err.response &&
      err.response.status === 403 &&
      err.response.headers["x-ratelimit-remaining"] === "0"
    ) {
      const resetTime = new Date(
        err.response.headers["x-ratelimit-reset"] * 1000
      );
      throw new Error(
        `GitHub API rate limit exceeded. Resets at ${resetTime.toLocaleTimeString()}`
      );
    }
    throw err;
  }
}

module.exports = { fetchGitHubUser };
