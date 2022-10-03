

<script setup lang="ts">
import type IPerson from '../interfaces/IPerson';

defineProps<{
  personResult: IPerson
}>()
</script>

<template>

  <div class="person-result">
    <div class="avatar">
      <img alt="Waite Merigon Avatar" :src="personResult.avatar" />
    </div>
    <div class="description">
      <h5>{{personResult.name}}</h5>
      <p>{{personResult.description}}</p>
    </div>
  </div>

</template>

<style scoped>

.person-result {
  display: flex;
  gap: 24px;
}

.person-result .avatar {
  position: relative;
  min-width: 96px;
  height: 96px;
}
.person-result img {
  object-fit: cover;
  border-radius: 2px;
  max-width: 96px;
  max-height: 96px;
  position: relative;
}
.person-result img::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    line-height: 96px;
    background-color: #C4C4C4;
    color: var(--color-text-light);
    text-align: center;
    border-radius: 2px;
    display: block;
    max-width: 96px;
    height: 96px;
    overflow: hidden;
    font-size: 13px;
}
.person-result p {
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -1.5%;
  margin: 0px;
  color: var(--color-text-light);
}

</style>
