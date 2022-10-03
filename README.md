# Around the U.S

## Application overview

**Full stack web application with the following features**

-   Registration, Login and logout.
-   Image uploading, deleting and a like feature.
-   Profile editing which including: Edit profile picture, name and about.

## Back-End overview

**Used technologies**

-   Node & Express.
-   MongoDB & Mongoose.

**Directories & Files**

-   `logs` request and error logs.
-   `app.js` main server configuration.
-   `lib` constants and reusable variables.
-   `models` mongoose schemas and validations.
-   `errors` class objects for centralized error handling.
-   `helpers` non-feature functions or libraries such as `limiter` for limiting user requests.
-   `routes` main routing logic with integration of `celebrate` & `Joi` libraries for data validation.
-   `controllers` main in-route logic with the best practice of centralized error handling and promises based db-server communication.
-   `middlewares` server actions before/after a selected event has happened on the server such as `auth` for protecting routes and setting for the next operation the current user whom sending the request.

Third party libraries: cors, limiter, helmet, jwt, celebrate, and joi.

## Front-End overview

**Used technologies**

-   React & CSS3

**Directories & Files (Inside /src)**

-   `blocks` css blocks separated by components.
-   `lib` constants and reusable variables.
-   `components` reusable components that build the app.
-   `contexts` global state variables for handling a context data fetched from an API.
-   `utils` reusable functions and classes for mainly implementing authorization, API requests and simple error handling.

## Cloud overview

**Used technologies**

-   GCP, Ubuntu 22.04 LTS, Nginx, Certbot for HTTPS redirection, and PM2.

**CI/CD**

-   Back-end: While we are in the remote server, pulling the repository from the main branch and restarting the PM2 engine.
-   Front-End: Building the app locally using `npm run build` and then copy the files to our remote server via SSH connection.

## Implementations

-   ES6 JavaScript syntax.
-   REST api implementation.
-   Asynchronous programming.
-   OOP & Component-Oriented-Programming.
-   Centralized error handling for the back end.
-   BEM methodology in the css classification for each component.

**Links**

-   [Show me the app](https://www.amitnew.students.nomoredomainssbs.ru/)
-   API => https://api.amitnew.students.nomoredomainssbs.ru
