# Broken App Issues

# Issues Found and Fixed

## Bug 1: Missing Middleware for Parsing JSON
**Problem**: The Express app didn't include middleware to parse JSON request bodies.
**Solution**: Added `app.use(express.json())` to parse incoming JSON payloads.

## Bug 2: Asynchronous Code Handling
**Problem**: The original code didn't properly await the results of the axios requests before sending the response, resulting in an empty array being returned.
**Solution**: Used async/await pattern with a `for...of` loop (later refactored to `Promise.all` with a helper function) to properly wait for all GitHub API requests to complete before sending the response.

## Bug 3: No Error Handling
**Problem**: The original code had no error handling for failed API requests or other exceptions.
**Solution**: Added try/catch blocks and centralized error handling middleware (`errorHandler`) to properly catch and report errors.

## Bug 4: No GitHub API Rate Limit Handling
**Problem**: The app would fail without a clear error message when GitHub API rate limits were exceeded.
**Solution**: Added specific handling for rate limit responses (checking for 403 status and `x-ratelimit-remaining` header) within the `fetchGitHubUser` helper, throwing a custom error which the `errorHandler` then uses to return a 429 status code and informative message.

## Code Organization Issues
**Problem**: The original code had all logic in a single file with no separation of concerns.
**Solution**: Refactored the code into modular components:
- `routes/users.js` for API endpoints
- `utils/github.js` for the GitHub API helper function
- `middleware/error.js` for the centralized error handler

## Other Improvements
- Used `Promise.all` for parallel processing of GitHub API requests in the route handler.
- Added input validation for the request body in the route handler.
- Improved error messages in the central error handler for different scenarios (404, rate limit, general).
- Exported the `app` object from `app.js` for potential testing frameworks.
