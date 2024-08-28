<template>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      :fill="isFilled ? 'currentColor' : 'none'"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="heart-icon"
      @click="$emit('toggle')"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  </template>
  
  <script>
  export default {
    name: 'HeartIcon',
    props: {
      isFilled: {
        type: Boolean,
        default: false
      }
    },
    emits: ['toggle']
  }
  </script>
  
  <style scoped>
  .heart-icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .heart-icon:hover {
    transform: scale(1.1);
  }
  </style>