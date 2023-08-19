<template>
  <h2>Modals View</h2>
  <button @click="showModal = true">Show Modal</button>
  <Modal v-if="showModal" @closeModal="showModal = false">
    <template #title>Test Modal</template>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae voluptates minus totam sequi placeat molestiae.
      Omnis quas facere, voluptatibus doloribus cum cumque? Nobis, earum reprehenderit rerum tempora vero corrupti nam.
    </p>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Modal from '../components/Modal.vue'
const showModal = ref(false)
</script>