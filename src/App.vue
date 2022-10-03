<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <hr>

  <header>
    <img alt="Air logo" class="logo" src="@/assets/airlogo.svg" height="24" />

    <!-- Anticipating menu navigation -->
    <!-- 
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">about</RouterLink>
    </nav> 
    -->
  </header>

  <RouterView />

</template>

<style scoped>
hr {
  border: none;
  height: 3.43px;
  background-color: #33DBDB;
  width: 100%;
  /* If being really pixel perfect, this would more closly match the 
  Figma where this border extendes outside the frame. */
  /* margin: -2px 0px 0px 0px; */
  margin: 0px 0px 0px 0px;
}

header {
  max-width: 1054px;
  margin: 33px auto 0px auto;
  padding: 0px 16px;
  display: flex;
  justify-content: space-between;
}

nav {
  display: flex;
  gap: 10px;
}
</style>
