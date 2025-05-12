### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?

  *Callbacks*: Functions passed as arguments to be executed later, often when an async operation completes. Can lead to "callback hell" (deeply nested callbacks).
  *Promises*: Objects representing the eventual completion or failure of an asynchronous operation. Allow for chaining (`.then()`, `.catch()`, `.finally()`) and cleaner error handling.
  *Async/Await*: Syntactic sugar built on top of Promises, making asynchronous code look and behave more like synchronous code, improving readability.

- What is a Promise?

  A Promise is an object that represents the eventual result (either success or failure) of an asynchronous operation. It can be in one of three states:
    - *Pending*: Initial state, neither fulfilled nor rejected.
    - *Fulfilled*: The operation completed successfully, resulting in a value.
    - *Rejected*: The operation failed, resulting in an error/reason.

- What are the differences between an async function and a regular function?

  *Return Value*: An `async` function always implicitly returns a Promise. If the function explicitly returns a value, that value becomes the resolved value of the Promise. If it throws an error, the Promise is rejected with that error. A regular function returns whatever value is specified by the `return` statement (or `undefined` if none).
  *`await` Keyword*: The `await` keyword can only be used inside an `async` function. It pauses the execution of the `async` function until the awaited Promise settles (either resolves or rejects). Regular functions cannot use `await`.

- What is the difference between Node.js and Express.js?

  *Node.js*: A JavaScript runtime environment built on Chrome's V8 engine. It allows you to run JavaScript code outside of a web browser, typically for server-side applications, command-line tools, etc. It provides core modules for file system access, networking, etc.
  *Express.js*: A web application framework built *on top of* Node.js. It simplifies the process of building web servers and APIs by providing features like routing, middleware support, request/response handling, templating engine integration, etc. Express is not part of Node.js itself; it's an external package you install.

- What is the error-first callback pattern?

  A common convention in Node.js for asynchronous functions using callbacks. The callback function is designed to receive an error object as its *first* argument. If an error occurred during the async operation, this first argument will be populated with an error object (and subsequent arguments might be null/undefined). If the operation was successful, the first argument will be `null` or `undefined`, and the subsequent arguments will contain the results of the operation. This pattern standardizes error handling for callback-based APIs.

- What is middleware?

  In the context of Express.js (and similar frameworks), middleware refers to functions that have access to the request object (`req`), the response object (`res`), and the *next* middleware function in the application's request-response cycle. These functions can:
    - Execute any code.
    - Make changes to the request and response objects.
    - End the request-response cycle.
    - Call the next middleware function in the stack using `next()`.
  Middleware is used for tasks like logging, authentication, data validation, parsing request bodies, setting headers, error handling, etc.

- What does the `next` function do?

  In Express middleware, the `next` function is typically the third argument passed to the middleware function (e.g., `function(req, res, next)`). When called, it passes control to the *next* middleware function in the stack that matches the current route. If the current middleware function does not call `next()`, the request will be left hanging, and the client will not receive a response (unless the middleware function itself sends the response). It's crucial for chaining middleware operations. There's also a variation, `next(err)`, which skips all subsequent regular middleware and passes control directly to error-handling middleware.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

  *Performance/Concurrency*: The three `$.getJSON` calls are executed sequentially using `await`. Each call waits for the previous one to complete before starting. Since these network requests are independent, they *could* be run in parallel to potentially speed up the function. This can be achieved using `Promise.all()`.
  *Error Handling*: There is no explicit error handling (`try...catch` block). If any of the `$.getJSON` calls fail (e.g., network error, user not found), the entire `getUsers` function will reject its Promise, potentially causing an unhandled rejection if the caller doesn't handle it.
  *Dependency on jQuery (`$`)*: The code relies on `$.getJSON`, which is a jQuery method. While common in front-end code, using jQuery directly within Node.js/Express backend code is less conventional (though possible if jQuery is specifically included). Standard Node.js alternatives like `axios` or the built-in `fetch` (in newer Node versions) are more typical for making HTTP requests on the server-side. If this is intended for a browser environment, this dependency is fine.
  *Naming*: Variable names (`elie`, `joel`, `matt`) are okay but could be more descriptive if the context wasn't immediately obvious (e.g., `elieUserData`, `joelUserData`). `getUsers` is a good function name.
  *Return Order*: The returned array `[elie, matt, joel]` mixes the order of the retrieved users. While not necessarily an *error*, it might be unexpected if the caller assumes the order matches the request order. Returning `[elie, joel, matt]` would be more consistent with the sequential fetching order. If using `Promise.all`, the results array maintains the order of the promises passed to it.
