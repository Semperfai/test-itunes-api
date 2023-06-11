<template>
  <div class="album-card">
    <h2 class="album-name">Album Name: {{ album.collectionName }}</h2>
    <h4 class="section-title">Artwork</h4>
    <img class="artwork" :src="album.artworkUrl100" alt="album" />
    <h4 class="section-title">Price: {{ album.collectionPrice }}</h4>
  </div>
</template>

<script lang="ts">
import type { Result } from '@/types/ItunesTypes.interface'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  props: {
    album: {
      type: Object as PropType<Result>,
      required: true
    }
  }
})
</script>

<style scoped>
.album-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f8f8f8;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.album-card:hover {
  background-color: #c5f9f8;
  transform: translateY(-5px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
}

.album-name {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #666;
  margin-top: 20px;
  margin-bottom: 10px;
}

.artwork {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
</style>
