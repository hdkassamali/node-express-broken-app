function errorHandler(err, req, res, next) {
  console.error(err.stack);
  const status =
    err.response && err.response.status === 404
      ? 404
      : err.message.includes("rate limit")
      ? 429
      : 500;
  const message =
    err.response && err.response.status === 404
      ? `User not found: ${err.config.url.split("/").pop()}`
      : err.message || "Something went wrong!";
  res.status(status).json({ error: message });
}

module.exports = { errorHandler };
