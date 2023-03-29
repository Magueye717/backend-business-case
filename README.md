# PACKAGE TRACKER
#### Video Demo:  <URL HERE>
#### Description:
 This project allows tracking of packages in real time.
 
 It is composed of 3 main actors.
- The `Admin` has the role to add, delete, modify or list packages and deliveries (CRUD operations)
- The `Driver` who is in charge of the delivery and change the status of the delivery (picked-up, in-transite, delivered or failed).  
Each status change updates the delivery.
 a) When the status changes from open to picked-up, set the pickup_time to current time
b)When the status changes from picked-up to in-transit, set the start_time to current time
c)When the status changes from in-transit to delivered or failed, set the end_time to current time.
The Driver sees on a map the point of pick-up and delivery. Every 20 seconds, his position is retrieved to update the delivery.
-The `Costomer`, also called `Tracker`, sees on a map in real time the location of his package according to the position of the Driver.
 
 It is composed of two parts: the server (backend) and the client (frontend).
 
The server is made with Node.js because it is fast and robust. 
Here is the structure of the project:
The `app.js` is the bootstrap file. This file is the entry point of the application. On the `app.js`, we have defined the middlewares, created the server and all the socket requests for the real times connection with the client.

On the model folder, there are the two files (`Delivery.js` and `Package.js`) to represent the schemas (entities) of the database and the relationships between the entities.

On the controllers folder, there are two files (`delivery.controller.js` and `package.controller.js`). These two files encapsulate the application logic of the application in other words the CRUP operations for the Delivery and Package entities.

In the routes folder, there are `delivery.route.js` and `package.route.js` which allow to define the routes of the different endpoints.


TODO
# Steps 
### Run the backend (Node.Js)
#### 1. Clone the project with this link  👉  https://github.com/Magueye717/backend-business-case.git
#### 2. Install the packages with this commande : `npm install` or `yarn install`
#### 3. Set de Database url for the connection to mongodb. Edit the `DEV_DB_URL` or `PROD_DB_URL` variable on the `.env` file.
   NB: If you want to use the PROD_DB_URL, change the mongoose connection like this : 
    `mongoose.connect(process.env.PROD_DB_URL).then(() => console.log("connected to the DB"));`
#### 4. Run commande `npm start` or `yarn start`

####

### Run the frontend (React.js)
#### 5. Clone the project with this link  👉  https://github.com/Magueye717/frontend-business-case.git
#### 6. Install the packages with this commande : `npm install` or `yarn install`
#### 7. Run commande `npm start` or `yarn start`
