<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="searchQuery"
      @input="onSearch"
      placeholder="Rechercher..."
      class="search-input"
    />
    <button class="search-button" @click="onSearch">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    onSearch() {
      this.$emit('search', this.searchQuery);
    }
  }
}
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  overflow: hidden;
  width: 100%;
  max-width: 300px;
}

.search-input {
  flex-grow: 1;
  padding: 0.5rem 1rem;
  border: none;
  outline: none;
  font-size: 1rem;
  min-width: 0; /* Allows the input to shrink below its content size */
}

.search-button {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px; 
}

.search-icon {
  width: 20px;
  height: 20px;
  color: #666;
}

@media (max-width: 768px) {
  .search-bar {
    max-width: none;
  }

  .search-input {
    padding: 0.5rem;
  }

  .search-button {
    padding: 0.5rem;
  }
}
</style>