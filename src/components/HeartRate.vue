<template>
  <DashboardCard
    :title="title"
    :value="heartRate.value"
    :sensor_id= "heartRate.device && heartRate.device.id"
    :sensor_name= "heartRate.device && heartRate.device.name"
    icon="fa-heart"
    @connectDevice="connectHeartRate"
    :isConnected="heartRate.isConnected"
  />
</template>

<script>
import DashboardCard from "./DashboardCard.vue";
import { parseHeartRateValues } from "../utils";
export default {
  name: "HeartRate",
  components: {
    DashboardCard
  },
  data: () => {
    return {
      title: "Heart Rate",
      heartRate: {
        isConnected: false,
        device: null,
        status: "Not connected",
        service: null,
        characteristic: null,
        value: 0
      }
    };
  },
  methods: {
    connectHeartRate: async function() {
      //console.log(this.heartRate);

      try {
        if (!this.heartRate.device) {
          this.heartRate.device = await navigator.bluetooth.requestDevice({
            filters: [{ services: ["heart_rate"] }]
          });
        }
        this.heartRate.server = await this.heartRate.device.gatt.connect();
        this.heartRate.service = await this.heartRate.server.getPrimaryService(
          "heart_rate"
        );
        var characteristic = await this.heartRate.service.getCharacteristic(
          "heart_rate_measurement"
        );
        this.heartRate.characteristic = await characteristic.startNotifications();
        this.heartRate.isConnected = true;
        this.heartRate.characteristic.addEventListener(
          "characteristicvaluechanged",
          this.handleCharacteristicValueChanged.bind(this)
        );
        console.log(this.heartRate.device)
      } catch (error) {
        this.heartRate.isConnected = false;
        console.log(error);
      }
    },
    handleCharacteristicValueChanged(e) {
      //console.log(e);
      var valueObject = parseHeartRateValues(e.target.value);
      //console.log("EtargetValue", e.target.value);
      //console.log(parseHeartRateValues(e.target.value));
      var value = valueObject.heartRate;
      console.log(value);
      this.heartRate.value = value;
    }
  }
};
</script>

<style>
</style>