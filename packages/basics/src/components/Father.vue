<template>
  <div>
    <Child :person="person" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Child from './Child.vue';
const person = ref({
  name: 'WeiLei',
  age: 30
})

setTimeout(() => {
  person.value = {
    name: 'LiMing',
    age: 33,
  }
}, 2000);
</script>