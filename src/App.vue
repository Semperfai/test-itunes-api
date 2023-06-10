<template>
  <form @submit.prevent="searchItunes(searchText)">
    <input type="text" v-model="searchText" />
    <button @click="searchItunes(searchText)">Search</button>
    <div v-if="data.results">
      <div v-for="album in data.results" :key="album.artistId">
        <h3>Album Name: {{ album.collectionName }}</h3>
        <h5>Artwork</h5>
        <img :src="album.artworkUrl99" alt="" />
        <h4>Price: {{ album.collectionPrice }}</h4>
        <ShowAlbum :album="album" />
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent} from "vue";
import { itunesSearch } from "./services/iTunesAPI";
import ShowAlbum from "./components/ShowAlbum.vue";

export default defineComponent({
  name: "App",
  components: {
    ShowAlbum
  },
  data: () => {
    return {
      data: {},
      searchText: ""
    };
  },
  methods: {
    async searchItunes(search: string): Promise<void> {
      const value = await itunesSearch(search,5);
      this.data = value;
      console.log("data", value);
    }
  },

});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>