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

-   `app.js` main server configuration.
-   `lib` constants and reusable variables.
-   `errors` class objects for centralized error handling.
-   `helpers` non-feature functions or libraries such as `limiter` for limiting user requests.
-   `routes` main routing logic with integration of `celebrate` & `Joi` libraries for data validation.
-   `controllers` main in-route logic with the best practice of centralized error handling and promises based db-server communication.
-   `middlewares` server actions before/after a selected event has happened on the server such as `auth` for protecting routes and setting for the next operation the current user whom sending the request.

**Links**

-   [Show me the app](https://www.amitnew.students.nomoredomainssbs.ru/)
-   API => https://api.amitnew.students.nomoredomainssbs.ru

Still editing...
