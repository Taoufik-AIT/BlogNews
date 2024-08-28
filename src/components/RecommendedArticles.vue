<template>
  <div class="recommended-articles">
    <router-link 
      v-for="article in articles" 
      :key="article.id" 
      :to="{ name: 'article', params: { id: article.id } }"
      class="recommended-article"
    >
      <div class="article-image">
        <img :src="article.imageUrl" :alt="article.title" />
      </div>
      <div class="article-info">
        <h4 class="article-title">{{ article.title }}</h4>
        <p class="article-date">{{ formatDate(article.date) }}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'RecommendedArticles',
  props: {
    articles: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  }
}
</script>

<style scoped>
.recommended-articles {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.recommended-article {
  display: flex;
  text-decoration: none;
  color: inherit;
  gap: 1rem;
}

.recommended-article:hover {
  color: #336da7;
}

.article-image {
  width: 100px;
  height: 100px;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.article-title {
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
  text-align: left;
}

.article-date {
  font-size: 0.8rem;
  color: #666;
  margin: 0;
  text-align: left;
}
</style>