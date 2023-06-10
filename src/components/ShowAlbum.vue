<template>
    <h2>Album Name: {{ album.collectionName }}</h2>
    <h4>Artwork</h4>
    <img :src="album.artworkUrl100" alt="" />
    <h4>Price: {{ album.collectionPrice }}</h4>
  </template>
  
  <script lang="ts">
  import { defineComponent, type  PropType } from "vue";
  
  export default defineComponent({
    props: {
      album: {
        type: Object ,
        required: true
      }
    },
    setup() {
      return {};
    }
  });
  </script>
  
  <style scoped></style>