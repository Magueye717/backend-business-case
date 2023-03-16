# Steps

### 1. npm install
### 2. Set the DEV_DB_URL | PROD_DB_URL variable in the .env
  NB: If you want to use the PROD_DB_URL, change the mongoose connection like this : 
    `mongoose.connect(process.env.PROD_DB_URL).then(() => console.log("connected to the DB"));`
  
### 3. npm start
