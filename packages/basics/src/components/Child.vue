<template>
  <span>name: {{ person.name }}</span>
  <br />
  <span>age: {{ person.age }}</span>
</template>
<script setup lang="ts">
import { watch } from 'vue';

const props = defineProps<{
  person: { name: string, age: number }
}>();
// const { person } = toRefs(props);
// console.log(person)
watch(() => props.person, (v) => {
  console.log(v)
})
</script>