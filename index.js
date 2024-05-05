document.getElementById("connect").addEventListener("click", connect);
const canvas = document.getElementById("canvas");
async function connect() {
    try{
        const options = {
            "acceptAllDevices": true
          }

        const device= await navigator.bluetooth.requestDevice(options)
        .then(device => {
            console.log("Device connected: ", device);
            return device;
        })
        .catch(error => {
            console.error("An error occurred while connecting to the device: ", error);
            throw new Error(error);
        });

        const server = await device.gatt.connect();
        let service

        setInterval(async()=>{
            service = await server.getPrimaryService("screen_value");
            const characteristic = await service.getCharacteristic("screen_value");
            const value = await characteristic.readValue();
            canvas.src= value;
        },
        1000);
    }catch(error){throw new Error(error)}
}


document.body.addEventListener("onLoad", 
async function () {
    const btPermission = await navigator.permissions.query({ name: "bluetooth" });
    if (btPermission.state !== "denied") {
        document.getElementById("connect").disabled = false;
    }else{
        document.getElementById("connect").disabled = true;
        alert("Bluetooth permission is denied");
    }
})