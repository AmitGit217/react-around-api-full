# Around the U.S. Back End

## Features by routes

- `/users`- GET all users data, POST a new user.
- `/users/:_id` - GET a user by id.
- `/users/me` - PATCH the current user `name` and `about`. (update)
- `/users/me/avatar` - PATCH the current user `avatar`. (update)

- `/cards` - GET all cards data, POST a new card.
- `/cards/:_id` - DELETE card by id.
- `/cards/:_id/like` - PUT like & DELETE like for a card by id. (The current user is the added value)

## Directories

`/helpers` - Generic functions such as getting a file and parsing it from JSON.

`/controllers` - Main implementation of the data processing and server requests.

`/models` - Schemas for our data with the needed validations.

`/routes` — Routing files.

`/lib` - Reusable variables.

## Technologies

- Node.js
- Express.js
- JSON
- Postman
- MongoDB
- Mongoose

## Implementations

- Error handling.
- Regex for validation.
- Routes, helpers and controllers separation.
- Asynchronous programming using promises.
- Limiter library to avoid DoS attack

## Running the Project

`npm run start` — to launch the server.

`npm run dev` — to launch the server with the hot reload feature.
