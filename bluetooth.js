const noble = require('noble');

// Bluetooth device UUID
const deviceUUID = '0000110C-0000-1000-8000-00805F9B34FB'; // Replace with the UUID of your BLE device

const start = (deviceUUID) => {
  noble.on('stateChange', (state) => {
    if (state === 'poweredOn') {
      console.log('Scanning for BLE devices...');
      noble.startScanning();
    } else {
      noble.stopScanning();
    }
  });

  noble.on('discover', (peripheral) => {
    if (peripheral.uuid === deviceUUID) {
      console.log(`Found device: ${peripheral.advertisement.localName} (${peripheral.uuid})`);
      noble.stopScanning();
      connectToDevice(peripheral);
    }
  });

  const connectToDevice = (peripheral) => {
    peripheral.connect((error) => {
      if (error) {
        console.error(`Error connecting to device: ${error}`);
        return;
      }

      console.log('Connected to device.');
      // Perform operations with the connected Bluetooth device here

      // Close the Bluetooth connection when done
      peripheral.disconnect((error) => {
        if (error) {
          console.error(`Error disconnecting from device: ${error}`);
          return;
        }
        console.log('Disconnected from device.');
      });
    });
  };
};

module.exports = { start };