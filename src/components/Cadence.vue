<template>
  <DashboardCard
    :title="title"
    :value="sensor.value"
    :sensor_id= "sensor.device && sensor.device.id"
    :sensor_name= "sensor.device && sensor.device.name"
    icon="fa-bicycle"
    @connectDevice="connectCadenceSensor"
    :isConnected="sensor.isConnected"
  />
</template>

<script>
import DashboardCard from "./DashboardCard.vue";
import { parseCadenceValues, connectDevice } from "../utils";
export default {
  name: "Cadence",
  components: {
    DashboardCard
  },
  data: () => {
    return {
      title: "Cadence",
      value: 2,
      sensor: {
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
    connectCadenceSensor: async function() {
      //console.log(this.heartRate);

      try {
        this.debug = await connectDevice("cycling_speed_and_cadence", 'cycling_speed_and_cadence', "csc_measurement")
        console.log(this.debug)
        
        this.debug.characteristic.addEventListener(
          "characteristicvaluechanged",
          this.handleCharacteristicValueChanged.bind(this)
        );
      } catch (error) {
        console.log(error);
      }
    },
    handleCharacteristicValueChanged(e) {
      console.log("e.target cadence speed", e.target.value);
      var valueObject = parseCadenceValues(e.target.value);
      var value = valueObject.cadence;
      console.log(value);
      this.sensor.value = value;
    }
  }
};
</script>

<style>
</style>