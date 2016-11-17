##Todo Server (MIT License)

Simple redis backed todo RESTful CRUD APIs to support Todo App.

##Install Node and Redis

Go to http://nodejs.org and install NodeJS

Go to http://redis.io/download and install Redis

##Run Locally

Make sure your redis server is running, I use port 6380 for this (default redis server port is 6379).
You can configure the port in redis.conf and then run the command similar to the following to start it up:

    redis-server ../redis.conf


Install all the dependencies:

    npm install

Run the app:

    node server.js


