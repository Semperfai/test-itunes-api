<script setup lang="ts">
import type { SelectOptions } from '@/types/ItunesTypes.interface';
import { ref, type PropType } from 'vue';

const modelValue = defineModel<string | number>()

const isDropdownOpen = ref(false);
defineProps({
  options: [] as PropType<SelectOptions[]>,
  default: () => []
})
</script>
<template>
 <div class="custom-select">
   <select v-model="modelValue" class="select-input" @click="isDropdownOpen = !isDropdownOpen" @blur="isDropdownOpen = false">
     <option disabled value="">Sort</option>
     <option v-for="option in options" :key="option.value" :value="option.value">
       {{ option.name }}
     </option>
   </select>
   <div class="arrow" :class="{ open: isDropdownOpen }"></div>
 </div>
</template>

<style scoped>

.custom-select {
  position: relative;
  display: inline-block;
  align-self: start;
}

.select-input {
  min-width: 10em;
  appearance: none;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.select-input:focus {
  outline: none;
  border-color: #000;
}

.select-input::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px 4px 0 4px;
  border-color: #666 transparent transparent transparent;
  pointer-events: none;
}

.arrow {
  position: absolute;
  top: calc(50% - 3px);
  right: 10px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px 4px 0 4px;
  border-color: #666 transparent transparent transparent;
  transition: transform 0.3s;
  transform: translateY(-50%);
}

.arrow.open {
  transform: translateY(-50%) rotate(180deg);
}
</style>
