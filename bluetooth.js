const Bluetooth = require('node-bluetooth');

// Create a Bluetooth object
const bluetooth = new Bluetooth();

// Discover nearby devices
bluetooth.on('device', (address, name) => {
  console.log(`Found device: ${name} (${address})`);
});

function startBluetoothDiscovery() {
  bluetooth.inquire();
}

function connectToDevice(address) {
  bluetooth.findSerialPortChannel(address, (channel) => {
    bluetooth.connect(address, channel, () => {
      console.log('Connected to the device');
      // Perform any actions needed after connecting to the device
    });
  });
}

module.exports = {
  startBluetoothDiscovery,
  connectToDevice,
};