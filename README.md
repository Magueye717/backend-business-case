# PACKAGE TRACKER
#### Video Demo:  <URL HERE>
#### Description:
 This project allows tracking of packages in real time.
 It is composed of two parts: the server (backend) and the client (frontend).
 
This project is made with Node.js because it is fast and robust. 
Here is the structure of the project:
The `app.js` is the bootstrap file. This file is the entry point of the application. On the `app.js`, we have defined the middlewares, created the server and all the socket requests for the real times connection with the client.

On the model folder, there are the two files (`Delivery.js` and `Package.js`) to represent the schemas (entities) of the database and the relationships between the entities.

On the controllers folder, there are two files (`delivery.controller.js` and `package.controller.js`). These two files encapsulate the application logic of the application in other words the CRUP operations for the Delivery and Package entities.

In the routes folder, there are `delivery.route.js` and `package.route.js` which allow to define the routes of the different endpoints.


TODO
# Steps 
### Run the backend (Node.Js)
#### 1. Clone the project with this link  👉  https://github.com/Magueye717/backend-business-case.git
#### 2. Install the packages with this commande : npm install or yarn install
#### 3. Set de Database url for the connection to mongodb. Edit the DEV_DB_URL or PROD_DB_URL variable on the .env file.
   NB: If you want to use the PROD_DB_URL, change the mongoose connection like this : 
    `mongoose.connect(process.env.PROD_DB_URL).then(() => console.log("connected to the DB"));`
#### 4. npm start or yarn start

####

### Run the frontend (React.js)
#### 5. Clone the project with this link  👉  https://github.com/Magueye717/frontend-business-case.git
#### 6. Install the packages with this commande : npm install or yarn install
#### 7. npm start or yarn start
