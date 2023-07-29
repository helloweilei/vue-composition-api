<template>
  <nav class="nav">
    <RouterLink class="link" to="/scene">Scene</RouterLink>
    <!-- <a @click="gotoMaterial">Material</a> -->
    <RouterLink class="link" to="/materials">Materials</RouterLink>
  </nav>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// const gotoMaterial = () => router.push('/material')
</script>

<style scoped>
.nav {
  position: absolute;
  top: 10px;
  left: 10px;
}

.link,
a {
  margin-right: 20px;
  color: blueviolet;
  text-decoration: none;
}
</style>