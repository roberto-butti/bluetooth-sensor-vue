<template>
  <div class="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
    <div class="bg-blue-700 p-2 shadow text-xl text-white">
      <h3 class="font-bold pl-2">
        <div class="flex flex-row items-center">
          <div class="flex-shrink pr-4">
            <div class="rounded-full p-1 bg-black">
              <img alt="Bluetooth" width="48" src="/bluetooth.svg" />
            </div>
          </div>
          <div class="flex-1 text-right md:text-center">
            <h1 class="text-4xl uppercase text-gray-100">Bluetooth Web API</h1>
            <!--h3 class="font-bold text-3xl"></h3-->
          </div>
        </div>
      </h3>
    </div>
    <div class="container mx-auto">
      <div class="flex flex-wrap">
        <Cadence />
        <HeartRate />
        <Debug />
      </div>
    </div>
  </div>
</template>

<script>
import Cadence from "./components/Cadence.vue";
import HeartRate from "./components/HeartRate.vue";
import Debug from "./components/Debug.vue";

export default {
  name: "app",
  components: {
    Cadence,
    HeartRate,
    Debug
  }
};
</script>

<style>
/*app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>
