require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mongoString = process.env.DATABASE_URL;
const routes = require("./routes/routes");

const bluetooth = require("./bluetooth");

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();

app.use(cors()); // Add CORS middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", routes);

// Endpoint to trigger Bluetooth functionality
app.get("/trigger-bluetooth", (req, res) => {
  const deviceUUID = '0000110C-0000-1000-8000-00805F9B34FB'; // Replace with the UUID of your BLE device
  bluetooth.start(deviceUUID);
  res.send("Bluetooth functionality triggered.");
});

app.listen(3000, () => {
  console.log("Server Started at 3000");
});
