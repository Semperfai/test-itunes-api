<template>
  <h1 class="custom-title">
    <span> Find out the price of your favorite artist's album on iTunes </span>
  </h1>
  <form class="form" @submit.prevent="searchItunes(searchText)">
    <div class="input-container">
      <input
        type="text"
        v-model="searchText"
        :class="{ filled: searchText }"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
      <label :class="{ active: searchText || isFocused }">Enter your text</label>
    </div>
    <button
      class="custom-button"
      :class="{ 'is-clicked': isClicked }"
      @click="searchItunes(searchText)"
    >
      Search
    </button>
  </form>
  <base-select v-model="selectedSort" :options="selectOptions"/>
  <div class="album-list" v-if="cards">
    <ShowAlbum v-for="album in currentCards" :key="album.collectionId" :album="album" />
  </div>
  <div class="pagination">
    <button @click="previousPage" :disabled="currentPage === 1" class="pagination-button">
      Previous
    </button>
    <span class="pages-counter">{{ currentPage }} / {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-button">
      Next
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, onMounted, computed ,watch} from 'vue'
import { itunesSearch } from './services/iTunesAPI'
import type { ITunesTypes, Result,SelectOptions } from './types/ItunesTypes.interface'
import ShowAlbum from './components/ShowAlbum.vue'
import BaseSelect from './components/BaseSelect.vue'

export default defineComponent({
  name: 'App',
  components: {
    ShowAlbum,BaseSelect
  },
  setup() {
    const isFocused = ref<boolean>(false)
    const isClicked = ref<boolean>(false)
    const cards = ref<Result[]>([])
    const album = reactive<{ data: ITunesTypes }>({ data: {} })
    const searchText = ref<string>('Eminem')
    const itemsPerPage = ref<number>(6)
    const currentPage = ref<number>(1)
    const selectedSort = ref<string | number>('')
    const selectOptions = ref<SelectOptions[]>([
      {value:'collectionName' , name: 'Name'},
      {value:'collectionPrice' , name: 'Price'},
    ])

    const totalPages = computed(() => {
      return Math.ceil(cards.value.length / itemsPerPage.value)
    })

    const currentCards = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage.value
      const endIndex = startIndex + itemsPerPage.value
      return cards.value.slice(startIndex, endIndex)
    })

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
      }
    }

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
      }
    }

    const searchItunes = async (search: string) => {
      const value = await itunesSearch(search)
      album.data = value
      if (album.data.results) {
        cards.value = album.data.results
      }
      isClicked.value = true
      setTimeout(() => {
        isClicked.value = false
      }, 500)
    }
   
    watch(selectedSort,(newValue) => {
      if(selectedSort.value === 'collectionPrice') {
        cards.value = cards.value.sort((album1,album2)=> {
          const value1 = album1[newValue] as number;
          const value2 = album2[newValue] as number;
          return value2 - value1;
        })
      }

      if(selectedSort.value === 'collectionName') {
         cards.value = cards.value.sort((album1,album2)=> {
          const value1 = album1[newValue] as string;
          const value2 = album2[newValue] as string;
          return value1.localeCompare(value2)
         }) 
      }
         
    })
    onMounted(() => {
      searchItunes(searchText.value)
    })

    return {
      cards,
      selectOptions,
      selectedSort,
      isFocused,
      searchText,
      searchItunes,
      isClicked,
      currentCards,
      currentPage,
      totalPages,
      previousPage,
      nextPage,
      ...toRefs(album)
    }
  }
})
</script>

<style>
@keyframes neonBackground {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 0;
  }
}

body {
  padding: 2em 1em;
  background: linear-gradient(90deg, #7700ff, #ff0099, #00aaff);
  background-size: 200% 100%;
  animation: neonBackground 10s ease-in-out infinite;
}

#app {
  display: flex;
  flex-direction: column;

  gap: 1em;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.pagination {
  margin: 1em 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.pagination-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4c1124;
  border-radius: 4px;
  color: #fff;
  border: none;
  font-size: 16px;
  cursor: pointer;
  overflow: hidden;
  transition: background-color 0.3s, transform 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1);
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pages-counter {
  margin: 0 16px;
  font-size: 18px;
}

.album-list {
  margin: 2em 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
}

@media screen and (max-width: 480px) {
  .form {
    max-width: 100%;
    padding: 0 20px;
  }
}
.input-container {
  position: relative;
  width: 100%;
  max-width: 300px;
  margin: 20px auto;
}

input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  border-bottom: 1px solid #ccc;
  transition: border-color 0.3s;
  font-size: 16px;
}

input.filled {
  border-color: #f0ad4e;
}

label {
  position: absolute;
  top: 10px;
  left: 10px;
  color: #999;
  font-size: 16px;
  transition: top 0.3s, font-size 0.3s;
}

label.active {
  top: -15px;
  font-size: 12px;
  color: white;
}

.custom-button {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  background-color: #4c1124;
  border-radius: 4px;
  color: #fff;
  border: none;
  font-size: 16px;
  cursor: pointer;
  overflow: hidden;
  transition: background-color 0.3s, transform 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1);
}

.custom-button:hover {
  background-color: #f50057;
}

.custom-button:focus {
  outline: none;
  background-color: #f50057;
}

.custom-title {
  position: relative;
  font-size: 2em;
  font-weight: bold;
  color: #ffffff;
  text-transform: uppercase;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.custom-title span {
  display: inline-block;
  transition: transform 0.3s ease-in-out;
}

.custom-title:hover span {
  transform: rotate(-10deg);
}
@media screen and (max-width: 768px) {
  .custom-title {
    font-size: 1.5em;
  }
}

@media screen and (max-width: 480px) {
  .custom-title {
    font-size: 1em;
  }
}
</style>
