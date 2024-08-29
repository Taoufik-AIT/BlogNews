<template>
  <div class="article-container" v-if="article">
    <div class="article">
      <div class="article-image-container">
        <img :src="article.imageUrl" :alt="article.title" class="article-image" />
        <button @click="handleToggleFavorite" class="favorite-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" :fill="isArticleFavorite ? '#FF0000' : '#FFFFFF'"/>
          </svg>
        </button>
      </div>
      <h1 class="article-title">{{ article.title }}</h1>
      <div class="article-meta">
        <img :src="require(`@/${article.authorImage}`)" :alt="article.author" class="author-image" />
        <div class="author-info">
          <span class="author-name">{{ article.author }}</span>
          <span class="article-date">{{ formatDate(article.date) }}</span>
        </div>
      </div>
      <div class="article-content">
        <p>{{ article.description }}</p>
        <p>Lorem ipsum dolor sit amet consectetur. Rutrum in tellus diam elementum. Dolor sed odio nibh risus sit sodales. Ac sem euismod bibendum curabitur. Pretium bibendum sit turpis facilisis quam commodo adipiscing id. Lorem ipsum dolor sit amet consectetur. Rutrum in tellus diam elementum. Dolor sed odio nibh risus sit sodales. Ac sem euismod bibendum curabitur.</p>
        <p>Pretium bibendum sit turpis facilisis quam commodo adipiscing id. Lorem ipsum dolor sit amet consectetur. Rutrum in tellus diam elementum. Dolor sed odio nibh risus sit sodales. Ac sem euismod bibendum curabitur. Pretium bibendum sit turpis facilisis quam commodo adipiscing id.</p>
      </div>
      <Comments :articleId="article.id" />
    </div>
    <div class="recommended-section">
      <h2>Nouveautés</h2>
      <RecommendedArticles :articles="recommendedArticles" />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useArticles } from "@/composables/useArticles";
import RecommendedArticles from '@/components/RecommendedArticles.vue';
import Comments from '@/components/Comments.vue';

export default {
  name: 'ArticleView',
  components: {
    RecommendedArticles,
    Comments
  },
  setup() {
    const route = useRoute();
    const { getArticleById, toggleFavorite, isFavorite, getRecommendedArticles } = useArticles();
    const article = ref(null);
    const recommendedArticles = ref([]);

    const loadArticle = (id) => {
      article.value = getArticleById(parseInt(id));
      recommendedArticles.value = getRecommendedArticles(parseInt(id), 3);
      window.scrollTo(0, 0);
    };

    onMounted(() => {
      loadArticle(route.params.id);
    });

    watch(() => route.params.id, (newId) => {
      loadArticle(newId);
    });

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    };

    const handleToggleFavorite = () => {
      if (article.value) {
        toggleFavorite(article.value.id);
      }
    };

    const isArticleFavorite = computed(() => {
      return article.value ? isFavorite(article.value.id) : false;
    });

    return {
      article,
      recommendedArticles,
      formatDate,
      handleToggleFavorite,
      isArticleFavorite,
    };
  }
}
</script>

<style scoped>
.article-container {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  gap: 1.5rem;
}

.article {
  flex: 1;
}

.article-image-container {
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
}

.article-image {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
}

.favorite-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
}

.article-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: left;
}

.article-meta {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.author-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 1rem;
}

.author-info {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.author-name {
  font-weight: bold;
}

.article-date {
  color: #a2a2a2;
  font-size: 0.9rem;
}

.article-content {
  line-height: 1.6;
}

.article-content p {
  margin-bottom: 1rem;
  text-align: left;
}

.recommended-section {
  width: 300px;
}

.recommended-section h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: left;
}

@media (max-width: 1024px) {
  .article-container {
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .article-container {
    flex-direction: column;
    padding: 0.5rem;
  }

  .recommended-section {
    width: 100%;
  }

  .article-title {
    font-size: 1.5rem;
  }

  .article-meta {
    align-items: flex-start;
  }

  .author-image {
    margin-bottom: 0.5rem;
  }
}

@media (max-width: 480px) {
  .article-container {
    padding: 0.25rem;
  }
}
</style>