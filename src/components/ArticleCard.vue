<template>
  <div class="article-card" @click="$emit('click')">
    <div class="article-image">
      <img :src="article.imageUrl" :alt="article.title" />
      <button @click.stop="handleToggleFavorite" class="favorite-button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" :fill="isArticleFavorite ? '#FF0000' : '#FFFFFF'"/>
        </svg>
      </button>
    </div>
    <div class="article-content">
      <h2 class="article-title">{{ article.title }}</h2>
      <p class="article-excerpt">
        {{ truncateText(article.description, 100) }}
      </p>
      <div class="article-meta">
        <img
          :src="require(`@/${article.authorImage}`)"
          :alt="article.author"
          class="author-image"
        />
        <div class="author-info">
          <span class="author-name">{{ article.author }}</span>
          <span class="article-date">{{ formatDate(article.date) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useArticles } from '@/composables/useArticles';

export default {
  name: 'ArticleCard',
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  emits: ['click'],
  setup(props) {
    const { toggleFavorite, isFavorite } = useArticles();

    const isArticleFavorite = computed(() => isFavorite(props.article.id));

    const truncateText = (text, length) => {
      return text.length > length ? text.slice(0, length) + "..." : text;
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    };

    const handleToggleFavorite = (event) => {
      event.stopPropagation();
      toggleFavorite(props.article.id);
    };

    return {
      isArticleFavorite,
      truncateText,
      formatDate,
      handleToggleFavorite
    };
  }
}
</script>

<style scoped>
.article-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
}

.article-image {
  position: relative;
  width: 100%;
  padding-top: 100%; 
}

.article-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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

.favorite-button svg {
  width: 24px;
  height: 24px;
}

.article-content {
  padding: 10px;
  text-align: left;
}

.article-title {
  font-size: 1.2rem;
  margin-bottom: 8px;
}

.article-excerpt {
  color: #666;
  margin-bottom: 16px;
}

.article-meta {
  display: flex;
  align-items: center;
}

.author-image {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: bold;
}

.article-date {
  color: #999;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .article-card {
    flex-direction: row;
    align-items: center;
    height: auto;
    padding: 10px;
  }

  .article-image {
    width: 100px;
    height: 100px;
    padding-top: 0;
    flex-shrink: 0;
  }

  .article-content {
    flex: 1;
    padding-left: 15px;
  }

  .article-title {
    font-size: 1rem;
    margin-bottom: 4px;
  }

  .article-excerpt {
    display: none;
  }

  .article-meta {
    margin-top: 4px;
  }

  .author-image {
    width: 24px;
    height: 24px;
  }

  .author-info {
    flex-direction: row;
    align-items: center;
  }

  .author-name {
    margin-right: 8px;
  }

  .article-date {
    font-size: 0.8rem;
  }

  .favorite-button {
    top: 5px;
    right: 5px;
  }
}
</style>