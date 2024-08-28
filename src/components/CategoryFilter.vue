<template>
    <div class="category-filter">
      <button
        v-for="category in categories"
        :key="category"
        @click="selectCategory(category)"
        :class="{ active: category === selectedCategory }"
        class="category-button"
      >
        {{ category }}
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CategoryFilter',
    props: {
      categories: {
        type: Array,
        required: true
      },
      selectedCategory: {
        type: String,
        required: true
      }
    },
    methods: {
      selectCategory(category) {
        this.$emit('select-category', category);
      }
    }
  }
  </script>
  
  <style scoped>
  .category-filter {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
  }
  
  .category-button {
    background: none;
    border: none;
    padding: 0rem;
    cursor: pointer;
    font-size: 1rem;
    color: #999;
    transition: color 0.3s ease;
  }
  
  .category-button.active {
    color: #000;
    font-weight: bold;
  }
  </style>