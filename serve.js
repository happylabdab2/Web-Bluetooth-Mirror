const bluetooth = require('node-bluetooth');
const screenshot = require('screenshot-desktop')
connsole.log("starting screen mirror");

const address = '00:1A:7D:DA:71:13'; // Bluetooth address of the device
channel = 1; // Bluetooth channel of the device

bluetooth.connect(address, channel, function (err, connection) {
    if (err) return console.error(err);

    connection.on('data', (buffer) => {
        console.log('received message:', buffer.toString());
        if (buffer.toString() == 1) {
            screenshot().then((img) => {
                // img: Buffer filled with jpg goodness
                connection.write(img.toString("base64"), () => {
                    console.log("sent");
                });
            }).catch((err) => {
                throw new Error(err);
            });
        }
    });
});
