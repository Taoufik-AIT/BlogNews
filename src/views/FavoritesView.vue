<template>
  <div class="favorites-container">
    <div class="favorites">
      <h1 class="favorites-title">Mes Articles Favoris</h1>
      <div v-if="favoriteArticles.length > 0" class="article-grid">
        <ArticleCard
          v-for="article in favoriteArticles"
          :key="article.id"
          :article="article"
          @click="navigateToArticle(article.id)"
        />
      </div>
      <div v-else class="no-favorites">
        <p>Vous n'avez pas encore d'articles favoris. Explorez le catalogue pour en ajouter !</p>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ArticleCard from "@/components/ArticleCard.vue";
import { useArticles } from "@/composables/useArticles";

export default {
  name: 'FavoritesView',
  components: {
    ArticleCard
  },
  setup() {
    const router = useRouter();
    const { favoriteArticles } = useArticles();

    onMounted(() => {
      window.scrollTo(0, 0);
    });

    const navigateToArticle = (articleId) => {
      router.push({ name: "article", params: { id: articleId } });
    };

    return {
      favoriteArticles,
      navigateToArticle
    };
  }
}
</script>

<style scoped>
.favorites-container {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px);
  max-width: 100%;
  overflow-x: hidden;
}

.favorites {
  flex-grow: 1;
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.favorites-title {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.no-favorites {
  text-align: center;
  padding: 2rem;
  background-color: #f8f8f8;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .favorites {
    padding: 1rem;
  }

  .article-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .article-grid ::v-deep .article-card {
    display: flex;
    flex-direction: row;
    height: 120px;
  }

  .article-grid ::v-deep .article-image {
    width: 120px;
    height: 120px;
    padding-top: 0;
    position: relative;
  }

  .article-grid ::v-deep .favorite-button {
    position: absolute;
    top: 5px;
    right: 5px;
  }

  .article-grid ::v-deep .article-content {
    flex: 1;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .article-grid ::v-deep .article-title {
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }

  .article-grid ::v-deep .article-excerpt {
    display: none;
  }

  .article-grid ::v-deep .article-meta {
    margin-top: auto;
  }
}
</style>