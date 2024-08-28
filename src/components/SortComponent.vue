<template>
    <div class="sort-component" v-click-outside="closeOptions">
      <button @click="toggleOptions" class="sort-button">
        Trier
        <span class="sort-arrow" :class="{ 'open': showOptions }">▼</span>
      </button>
      <div v-if="showOptions" class="sort-options">
        <button 
          v-for="(label, option) in sortLabels" 
          :key="option" 
          @click="setSort(option)" 
          :class="{ 'active': currentSort === option }"
          class="sort-option"
        >
          {{ label }}
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useArticles } from '@/composables/useArticles';
  
  export default {
    name: 'SortComponent',
    setup() {
      const { sortOption, setSortOption } = useArticles();
      const showOptions = ref(false);
  
      const sortLabels = {
        default: 'Par défaut',
        nameAsc: 'Nom, A-Z',
        nameDesc: 'Nom, Z-A',
        dateAsc: 'Date, croissant',
        dateDesc: 'Date, décroissant'
      };
  
      const currentSort = computed(() => sortOption.value);
  
      const setSort = (option) => {
        setSortOption(option);
        showOptions.value = false;
      };
  
      const toggleOptions = () => {
        showOptions.value = !showOptions.value;
      };
  
      const closeOptions = () => {
        showOptions.value = false;
      };
  
      return { currentSort, setSort, showOptions, toggleOptions, closeOptions, sortLabels };
    },
    directives: {
      clickOutside: {
        mounted(el, binding) {
          el.clickOutsideEvent = (event) => {
            if (!(el === event.target || el.contains(event.target))) {
              binding.value();
            }
          };
          document.addEventListener('click', el.clickOutsideEvent);
        },
        unmounted(el) {
          document.removeEventListener('click', el.clickOutsideEvent);
        },
      },
    },
  }
  </script>
  
  <style scoped>
  .sort-component {
    position: relative;
    display: inline-block;
  }
  
  .sort-button {
    display: flex;
    align-items: center;
    background: none;
    border: 1px solid #ccc;
    padding: 0.7rem 1.5rem;
    font-size: 1rem;
    cursor: pointer;
  }
  
  .sort-arrow {
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
  }
  
  .sort-arrow.open {
    transform: rotate(180deg);
  }
  
  .sort-options {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: white;
    border: 1px solid #ccc;
    border-top: none;
    z-index: 1000;
  }
  
  .sort-option {
    display: block;
    width: 100%;
    padding: 0.5rem 1rem;
    text-align: left;
    border: none;
    background: none;
    cursor: pointer;
    color: #999; /* Gris par défaut */
    font-weight: normal;
    transition: all 0.3s ease;
  }
  
  .sort-option:hover {
    background-color: #f0f0f0;
  }
  
  .sort-option.active {
    font-weight: bold;
    color: #000; /* Noir pour l'option active */
  }
  </style>