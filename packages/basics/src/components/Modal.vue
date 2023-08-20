<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Teleport v-if="modelValue" to="body">
    <div class="modal-container">
      <h3 class="modal-title">
        <slot name="title"></slot>
      </h3>
      <div class="modal-content">
        <slot></slot>
      </div>
      <div class="modal-actions">
        <button @click="emit('update:modelValue', false)">{{ closeText }}</button>
      </div>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
defineProps({
  closeText: {
    type: String,
    default: 'Close Modal Now'
  },
  modelValue: {
    type: Boolean,
    default: false
  },
})
const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.modal-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: blueviolet;
  z-index: 1000;
}
</style>