<template>
  <h3>{{ counterData.title }}</h3>
  <div class="counter">
    <button @click="increase">+</button>
    <span>{{ counter }}</span>
    <button @click="decrease">-</button>
  </div>
  <input type="text" v-model="counterData.title" v-autoFocus />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import vAutoFocus from '@/directives/vAutoFocus'

const counter = ref(0);
const counterData = reactive({
  title: 'My Counter'
});

// const vAutoFocus = {
//   mounted(el: HTMLElement) {
//     el.focus()
//   }
// }

const increase = () => counter.value++;
const decrease = () => counter.value--;
</script>

<style scoped>
.counter {
  display: flex;
  align-items: center;
}
</style>