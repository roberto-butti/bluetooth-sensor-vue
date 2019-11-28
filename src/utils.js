export const connectDevice = async (service = "battery_service", primary_service = "battery_service", str_characteristic = "battery_level") => {
    var device = {}
    try {
        if (!device.device) {
            device.device = await navigator.bluetooth.requestDevice({
                //acceptAllDevices: true,
                //optionalServices: ""
                filters: [{ services: [service] }]
            });
        }
        console.log("DEVICE", device.device);
        device.server = await device.device.gatt.connect();
        console.log("SERVER", device.server);
        device.service = await device.server.getPrimaryService(primary_service);
        var characteristic = await device.service.getCharacteristic(str_characteristic);
        console.log(characteristic);
        device.characteristic = await characteristic.startNotifications();
        /*
        device.characteristic.addEventListener(
            "characteristicvaluechanged",
            this.handleCharacteristicValueChanged.bind(this)
        );
        */
        device.isConnected = true;

    } catch (error) {
        console.log(error);
        device.isConnected = false;
    }

    return device
}

export const parseCadenceValues = (data) => {
    const value = data.buffer
    const result = {};

    result.cadence = value.getUint8(0)
    return result;
}

export const parseHeartRateValues = (data) => {
    const value = data.buffer ? data : new DataView(data);
    const flags = value.getUint8(0);
    const rate16Bits = flags & 0x1;
    const result = {};
    let index = 1;
    if (rate16Bits) {
        result.heartRate = value.getUint16(index, /* littleEndian= */true);
        index += 2;
    } else {
        result.heartRate = value.getUint8(index);
        index += 1;
    }
    const rrIntervalPresent = flags & 0x10;
    if (rrIntervalPresent) {
        const rrIntervals = [];
        for (; index + 1 < value.byteLength; index += 2) {
            rrIntervals.push(value.getUint16(index, /* littleEndian= */true));
        }
        result.rrIntervals = rrIntervals;
    }
    return result;
};

export default {
    parseHeartRateValues,
    connectDevice
};