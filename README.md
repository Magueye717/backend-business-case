#### Description:
 This project allows tracking of packages in real time.
 It is composed of two parts: the server (backend) and the client (frontend).

# Steps
### Run the backend
### 1. Clone the project with this link https://github.com/Magueye717/backend-business-case.git

### 1. npm install
### 2. Set the DEV_DB_URL | PROD_DB_URL variable in the .env
  NB: If you want to use the PROD_DB_URL, change the mongoose connection like this : 
    `mongoose.connect(process.env.PROD_DB_URL).then(() => console.log("connected to the DB"));`
  
### 3. npm start
