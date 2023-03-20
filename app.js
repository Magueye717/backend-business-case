const express = require("express");
const app = express();
const server = require("http").createServer(app);
let cors = require("cors");

require("dotenv/config");
const mongoose = require("mongoose");

const Delivery = require("./model/Delivery");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

const bodyParser = require("body-parser");

//Middle ware
app.use(bodyParser.json());

//import routes
const packageRoute = require("./routes/package.route");
const deliveryRoute = require("./routes/delivery.route");

app.use("/api/package", packageRoute);
app.use("/api/delivery", deliveryRoute);

// Connect to Mongo db
mongoose
  .connect(process.env.DEV_DB_URL)
  .then(() => console.log("connected to the DB"));

// create a listerning port
const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));

//Socket io connection
io.on("connection", (socket) => {
  console.log("Connected user: " + socket.id);

  //Change delivery location event
  socket.on("location_changed", async (data) => {
    const { delivery_id, location } = data;
    console.log({ data });
    try {
      // find and update
      const delivery = await Delivery.findOneAndUpdate(
        { _id: delivery_id },
        { location },
        { new: true }
      );

      //Send the edited delivery as a broadcast to the client side
      socket.broadcast.emit("delivery_updated", delivery);
    } catch (error) {
      console.error(error);
    }
  });

  //Change delivery status event
  socket.on("status_changed", async (data) => {
    let today = new Date();
    let currentTime = today.getHours() + ":" + today.getMinutes();

    try {
      const { delivery_id, status } = data;
      // Check status and the corresponding time
      const statusToUpdate = () => {
        switch (status) {
          case "picked-up":
            return { pickup_time: currentTime, status };
            break;
          case "in-transit":
            return { start_time: currentTime, status };
            break;
          default:
            return { end_time: currentTime, status };
            break;
        }
      };
      // find and update
      const delivery = await Delivery.findOneAndUpdate(
        { _id: delivery_id },
        statusToUpdate(),
        { new: true }
      );

      //Send the edited delivery to the client side
      socket.broadcast.emit("delivery_updated", delivery);
    } catch (error) {
      console.error(error);
    }
  });

  //Change delivery status event
  socket.on("delivery_updated", async (data) => {
    const { delivery_id, ...incomingInput } = data;

    try {
      // find and update
      const delivery = await Delivery.findOneAndUpdate(
        { _id: delivery_id },
        incomingInput,
        { new: true }
      );

      //Send the edited delivery as a broadcast to the client side
      socket.broadcast.emit("delivery_updated", delivery);
    } catch (error) {
      console.error(error);
    }
  });
});
