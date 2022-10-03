<script setup lang="ts">
import { getPersonData } from '../services/servicePersonData';
import PersonFinderResult from './PersonFinderResult.vue';
import type IPerson from '../interfaces/IPerson';
import { onMounted, onUnmounted, reactive, ref, shallowRef } from 'vue';
import LoadingIndicator from './LoadingIndicator.vue'

const isLoading = ref(false);
const searchInput = ref("");
const originanlPersonData = shallowRef([] as IPerson[]);
const personData = shallowRef([] as IPerson[]);

let inputTimeout: number;
onMounted(async () => {
  isLoading.value = true;
  originanlPersonData.value = await getPersonData();
  personData.value = originanlPersonData.value;
  isLoading.value = false;
})

const debounceInputEvent = () => {
  if (inputTimeout) 
    clearTimeout(inputTimeout); 

  inputTimeout = setTimeout(() => {
    personData.value = filterPersonDateByName(originanlPersonData.value, searchInput.value);
  }, 100);
}

const filterPersonDateByName = (personData: IPerson[], name: string): IPerson[] => {
    if (!name.length) {
    return personData;
  }
  name = name.toLocaleLowerCase()
  return personData.filter( (person:IPerson) => {
    return person.name.toLowerCase().includes(name);
  });

  // considering code if performance is slow. 
  let personDataFiltered: IPerson[] = [];
  let person: IPerson;
  for(let i = 0; i < personData.length; i++) {
    person = personData[i];
    if(person.name.toLowerCase().includes(name)) {
      personDataFiltered.push(person);
    }
  }
  return personDataFiltered
}

onUnmounted( () => {
  clearInterval(inputTimeout)
})
</script>

<template>

    <div class="person-finder">
      <h1>Person Finder</h1>
      <p>If you just can’t find someone and need to know what they look like, you’ve come to the right place! Just type the name of the person you are looking for below into the search box!</p>
      <input type="search" class="search" placeholder="Search in Air HQ" @input="debounceInputEvent" v-model="searchInput">
      <div class="person-results">
        
        <LoadingIndicator v-if="isLoading"/>

        <div class="no-results" v-if="!personData.length && !isLoading">no results founds</div>
        
        <PersonFinderResult :person-result="person" v-for="person in personData" :key="person.id" />

      </div>
    </div>

</template>

<style scoped>
.person-finder{
  margin: 0 auto;
  max-width: 561px;
  text-align: left;
  padding: 0 16px;
}

.person-results {
  display: flex;
  flex-direction: column;
  gap: 24px; 
}

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

.no-results {
  width: 100%;
  color: #AAA;
  border: 2px dashed#eee;
  border-radius: 2px;
  padding: 16px 16px 20px 16px;
  box-sizing: border-box;
}
</style>
