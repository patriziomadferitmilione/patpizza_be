require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mongoString = process.env.DATABASE_URL;
const routes = require("./routes/routes");

const bluetooth = require('./bluetooth');

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
app.post('/bluetooth/discover', (req, res) => {
  bluetooth.startBluetoothDiscovery();
  res.send('Bluetooth discovery started');
});

app.listen(3000, () => {
  console.log("Server Started at 3000");
});
