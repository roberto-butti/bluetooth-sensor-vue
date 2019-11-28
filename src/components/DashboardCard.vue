<template>
  <div class="w-full md:w-1/2 xl:w-1/3 p-3">
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
      <div class="flex content-center mb-4 rounded-full p-5 bg-blue-600">
        <div class="w-1/3 text-left py-2 px-4">
          <i class=" fa fa-2x fa-inverse" :class="icon"></i>
        </div>
        <div class="w-1/3 py-2 text-center font-bold uppercase text-white">{{ title }}</div>
        <div v-if="!isConnected" class="w-1/3 text-right">
          <button
            @click="connectDevice()"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          ><i class="fa fa-2x fa-inverse fa-plug" ></i></button>
        </div>
        <div v-else class="w-1/3 text-right">
        <i class="fa fa-2x fa-inverse fa-check-circle" ></i>
        </div>
      </div>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ value }}</div>
        <p v-if="isConnected"
          class="text-gray-700 text-base"
        >
        DEVICE<br />
        ID: {{ sensor_id  }}<br />
        Name: {{ sensor_name  }}
        
        </p>
        <p v-else>
          Connect the device before to use it
          </p>
      </div>
      <div class="px-6 py-4">
        <span
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
        >#{{ title }}</span>
                <span v-if="isConnected"
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
        >#Connected</span>
                <span v-if="!isConnected"
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
        >#NOTConnected</span>


      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardCard",
  props: {
    title: { type: String, default: "Title" },
    value: { type: Number, default: 0 },
    icon: { type: String, default: "icons" },
    isConnected:{ type: Boolean, default: false },
    sensor_id: { type: String, default: "" },
    sensor_name: { type: String, default: "" },
  },

  methods: {
    connectDevice() {
      this.$emit("connectDevice");
      
    }
  },
  data() {
    return {
      
    }
  }
};
</script>

<style>
</style>