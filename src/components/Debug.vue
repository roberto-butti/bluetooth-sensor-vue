<template>
  <DashboardCard :title="title" :value="debug.value" icon="fa-bug" :isConnected="debug.isConnected" @connectDevice="connectDebug" />
</template>

<script>
import DashboardCard from "./DashboardCard.vue";
import { connectDevice } from "../utils";
export default {
  name: "Debug",
  components: {
    DashboardCard
  },
  data: () => {
    return {
      title: "Debug",
      debug: {
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
    connectDebug: async function() {
      //console.log(this.heartRate);

      try {
        this.debug = await connectDevice("battery_service", 'battery_service', "battery_level")
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
      var value = e.target.value.getUint8(0);
      console.log(value);
      this.debug.value = value;
    }
  }
};
</script>

<style>
</style>