<template>
  <div class="pagination-control">
    <button
      @click="$emit('prev')"
      :disabled="currentPage === 1"
      class="pagination-button"
    >
      Previous
    </button>
    <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>
    <button
      @click="$emit('next')"
      :disabled="currentPage === totalPages"
      class="pagination-button"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  name: 'PaginationControl',
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style scoped>
.pagination-control {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.pagination-button {
  padding: 0.5rem 1rem;
  color: black;
  border: solid black 0.5px;
  border-radius: 0pc;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination-button:hover {
  background-color: #0056b3;
  color: #F4F4F4;
}

.pagination-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.page-info {
  font-size: 1rem;
}
</style>