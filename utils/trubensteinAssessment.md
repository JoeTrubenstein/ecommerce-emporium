# Joe Trubenstein Class assessment: 4/15/2019

On the scale from one to ten, please rate how comfortable you are with the material.

For example, What is Node? answer: 'YOUR ANSWER HERE' -> Rating 7.5

## What is Node?

Node is server side software that lets you develop a back end using JavaScript.
It's introduction allowed JavaScript developers who were previously limited to front end stuff become full stack.
With Node and npm together, you can quickly frame up projects, add and lockdown dependencies, and build / deploy whatever it is you're working on.

7 out of 10

## What is Express?

Express is a node package that quickly spins up a server for you using node. It's up to you to then define how the server behaves, such as what routes requests can take, and what pages the routes will serve etc.

7 out of 10

## What is Ajax call?

An ajax call, by definition, is an async call- and takes place on the page that you're already on, and therefore doesn't need to pass information between pages.

7 out of 10

## What is a callback?

A callback function is a function inside of a function, but not to be confused with a recursive function, because I guess you could technically say the same thing about those. Perhaps a better definition is that a callback function happens after its parent function is run.

6 out of 10

## What is a router?

The router method is used to define what behavior a route in our express server might take. For example,

```JavaScript
/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

```

This block of code runs when a user sends a GET request to the homepage. In our case, that would happen when you visit localhost:3000 in the browser.

9 out of 10

## What is a path?

A (file)path is the actual path one must follow to retrieve a file, like when finding the source attribute of an image.

```HTML
<IMG SRC="/path/to/my/image.jpg">

```

## What is a Get Request?

A GET request expects data in return, however it does not send any data along with it. Technically it might send headers or auth stuff, but you can't send a body of JSON data like in a POST request.

9 out of 10

## What is a Post Request?

A POST request lets you send a body of data to the server, in our case, it's frequently JSON, but it could be form data, url encoded data, etc.

```JSON
{
    "username":"joe",
    "password":"legendaryhamster"
}
```
posting that json might later show up on the server like -

```JavaScript
    console.log(req.body.username)
    // outputs "joe"
```
9 out of 10

## List a few ways a route can get incoming data?

POST requests will involve a route receiving some kind of data. We've used postman to for a lot of testing, but POST requests can come from a lot of places.
The most common way we've seen is using an HTML form with a method of POST and action leading to the route.

8 out of 10

## What is MongoDB?

MongoDB is another database, that might be considered an alternative to SQL. Using Mongoose allows for easy integration into Express / Node projects.
Robo3T is our equivalent of PHP myadmin , as in it allows us to query the DB with a GUI.

7 out of 10

## What is Mongoose?

Mongoose is a node package that allows you to easily hook up your express server to your mongodb. It comes with lots of built-in functions that make your life easier. For example, we defined a Mongoose Schema to outline what a new User will look like each time we push one to our db.

7 out of 10

## What is model?

A model is very close to a schema, except the model is for the server and the schema is for the DB. The model is based off of the schema. When we define our User model, it tells the rest of our node app what a User is. It defines it's structure, like what keys go where.

7 out of 10

## What is a Schema?

A schema is the blueprint for what a piece of data in the database will look like. For example, if we want to create a table for apartment listings, it's schema might include

-price
-address
-number of bedrooms
-number of bathrooms

8 out of 10

## What is module.exports?

When working in a node project you often will compartmentalize different functions and things into modules, so you can more easily pull them into different places. After you define a module, you have to export it before you can require it somewhere else.

6 out of 10

## What is a controller?

In our case, a controller is a set of functions that governs how our model is handled under certain situations. For example we use a signup controller on a user model when we want to create a new user. The controller has more than one function, and first checks if the user already exists before creating them.

5 out of 10

## Why do we need controller?

I'm not confident in my ability to articulate this one.

0 out of 10

## What is a view?

A view contains the actual pages that the browser will render. In our case, we're using EJS which allows us to write some JavaScript in between our HTML code, and thereby pass variables and data across and throughout our pages.

6 out of 10

## What is MVC?

Model View Controller is the practice of building web apps in the exact way we're doing right now. We use all 3.

5 out of 10

## What is middleware?

Middleware is code that takes place <em>in the middle</em> of code that could otherwise (through not necessarily better) run without it being in that particular place. Our signup controller is middleware, that works in the middle of a POST request to a route before the route finishes it's block of code.
This is done in the same practice of keeping things compartmentalized in modules.

6 out of 10

## What is bcrypt?

bcrypt is a node package that allows you to apply hashing algorithms to pieces of data in your project. We use it to salt our passwords upon user creation.

8 out of 10

## What is req.flash?

req.flash means the flash of the request. In our case, req.flash is used to pass an error message through a route so it can be seen once our view is rendered.

8 out of 10.

## What is express-validator?

express-validator is a node package that lets you set requirements for input bodies that aren't inherent to node or HTML. For example, you can give an input in a form a ```required``` attribute, and that will validate against an empty string. But if you wanted to for example require an input of at least 10 characters, you would need to set that up in validator.

8 out of 10

## What is a cookie?

A cookie is tiny piece of code that gets stored in your browser when you visit a site's server. Your browser retains this for various reasons, but at the very least it tells the server that you've already visited.

7 out of 10

## What is a session?

A session is a predetermined, finite amount of time spent between the browser and the server. The most basic example is that if i log into my site, the session begins. It ends when I log out.

7 out of 10.

---

If you need additional help, please list the items you need help below. We will setup a time to further discuss how we can arrange additional training.
