<template>
  <div>City: {{ weatherInfo.data.city }}</div>
  <div>Weather: {{ weatherInfo.data.weather }}</div>
  <div>Temperature: {{ weatherInfo.data.temperature }}</div>
</template>

<script setup lang="ts">
import { onMounted, shallowReactive } from 'vue';

type WeatherData = { city?: string, weather?: string, temperature?: number }

//const weatherInfo = reactive<WeatherData>({});
const weatherInfo = shallowReactive<{ data: WeatherData }>({ data: {} })

onMounted(() => {
  fetch('https://restapi.amap.com/v3/weather/weatherInfo?key=97f5db37721a27ed1b1dc52fb4b5bf80&city=610100')
    .then((response) => response.json())
    .then(data => {
      const { city, weather, temperature } = data.lives[0];
      weatherInfo.data = { city, weather, temperature };
    });
});
</script>