<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue';
import {Pokemon} from "@/models/Pokemon";
import {PokemonResponseDto} from "@/dto/PokemonResponseDto";
import axios from 'axios';
import {getImage, getId} from "@/utils/pokemonService";


const pokemons = ref<Pokemon[]>([]);
let filteredPokemons = ref<Pokemon[]>([]);
let input = ref("");
let limit = ref(9);

const filteredListPokemons = (search: string): Pokemon[] => {
  if ("" === search){
    return filteredPokemons.value = pokemons.value;
  }
  return pokemons.value.filter((search) =>
      search.name.toLowerCase().includes(input.value.toLowerCase())
  );
}

const showMore = () => {
  limit.value += 9;
}

watch(input, (value) => {
  filteredPokemons.value = filteredListPokemons(value);
})


onMounted(() => {
   axios.get<PokemonResponseDto>('https://pokeapi.co/api/v2/pokemon/?limit=151')
       .then((response) => {
         pokemons.value = response.data.results;
         filteredPokemons.value = pokemons.value;
       })
})

</script>

<template>

  <div class="header">
    <h1>Pokedex</h1>

    <div class="search-container">
      <input class="search-input" v-model="input" type="text" placeholder="Search">
    </div>

  </div>

  <div class="container">
    <div class="card" v-for="(pokemon) in filteredPokemons.slice(0, limit)" :key="pokemon.name">
      <img :src="getImage(getId(pokemon.url))" :alt="pokemon.name">
      <div class="title-card">
        <h3>{{ pokemon.name.toUpperCase() }}</h3>
      </div>
    </div>
  </div>

  <div class="show-more">
    <button class="btn" v-if="filteredPokemons.length > limit" @click="showMore">
      Show More
    </button>
  </div>

</template>

<style scoped>
@import "assets/style.css";
</style>

