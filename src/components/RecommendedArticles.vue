<template>
  <div class="recommended-articles">
    <h3 class="recommended-title">Articles recommandés</h3>
    <div v-for="article in articles" :key="article.id" class="recommended-article">
      <div class="article-image" @click="navigateToArticle(article.id)">
        <img :src="article.imageUrl" :alt="article.title" />
        <button @click.stop="handleToggleFavorite(article.id)" class="favorite-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" :fill="isFavorite(article.id) ? '#FF0000' : '#FFFFFF'"/>
          </svg>
        </button>
      </div>
      <div class="article-content" @click="navigateToArticle(article.id)">
        <h4 class="article-title">{{ article.title }}</h4>
        <p class="article-date">{{ formatDate(article.date) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useArticles } from '@/composables/useArticles';

export default {
  name: 'RecommendedArticles',
  props: {
    articles: {
      type: Array,
      required: true
    }
  },
  setup() {
    const router = useRouter();
    const { toggleFavorite, isFavorite } = useArticles();

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    };

    const navigateToArticle = (articleId) => {
      router.push({ name: "article", params: { id: articleId } });
    };

    const handleToggleFavorite = (articleId) => {
      toggleFavorite(articleId);
    };

    return {
      formatDate,
      navigateToArticle,
      handleToggleFavorite,
      isFavorite
    };
  }
}
</script>

<style scoped>
.recommended-articles {
  margin-top: 2rem;
}

.recommended-title {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-align: left;
}

.recommended-article {
  display: flex;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}


.article-image {
  position: relative;
  width: 100px;
  height: 100px;
  overflow: hidden;
  cursor: pointer;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.favorite-button {
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
}

.favorite-button svg {
  width: 20px;
  height: 20px;
  filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));
}

.article-content {
  flex: 1;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
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