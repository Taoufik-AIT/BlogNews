<template>
  <div class="catalog">
    <div class="catalog-header">
      <CategoryFilter
        :categories="categories"
        :selectedCategory="selectedCategory"
        @select-category="setCategory"
      />
      <div class="catalog-controls">
        <SearchBar @search="setSearchQuery" />
        <SortComponent class="sort-component" />
      </div>
    </div>
    <div v-if="articles.length > 0" class="article-grid">
      <ArticleCard
        v-for="article in articles"
        :key="article.id"
        :article="article"
        @click="navigateToArticle(article.id)"
      />
    </div>
    <div v-else class="no-results">
      <p>Aucun article trouvé. Veuillez essayer une autre recherche ou catégorie.</p>
    </div>
    <PaginationControl
      :current-page="currentPage"
      :total-pages="totalPages"
      @prev="handlePageChange('prev')"
      @next="handlePageChange('next')"
    />
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ArticleCard from "@/components/ArticleCard.vue";
import CategoryFilter from "@/components/CategoryFilter.vue";
import SearchBar from "@/components/SearchBar.vue";
import SortComponent from "@/components/SortComponent.vue";
import PaginationControl from "@/components/PaginationControl.vue";
import { useArticles } from "@/composables/useArticles";

export default {
  name: 'CatalogView',
  components: {
    ArticleCard,
    CategoryFilter,
    SearchBar,
    SortComponent,
    PaginationControl
  },
  setup() {
    const router = useRouter();
    const { 
      articles,
      categories,
      selectedCategory,
      currentPage,
      totalPages,
      setCategory,
      setSearchQuery,
      nextPage,
      prevPage
    } = useArticles();

    onMounted(() => {
      window.scrollTo(0, 0);
    });

    const navigateToArticle = (articleId) => {
      router.push({ name: "article", params: { id: articleId } });
    };

    const handlePageChange = (direction) => {
      if (direction === 'next') {
        nextPage();
      } else {
        prevPage();
      }
      window.scrollTo(0, 0);
    };

    return {
      articles,
      categories,
      selectedCategory,
      currentPage,
      totalPages,
      setCategory,
      setSearchQuery,
      navigateToArticle,
      handlePageChange
    };
  }
}
</script>

<style scoped>
.catalog {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  overflow-x: hidden;
}

.catalog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.catalog-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.no-results {
  text-align: center;
  padding: 2rem;
  background-color: #f8f8f8;
}

@media (max-width: 1024px) {
  .article-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .catalog {
    padding: 1rem;
  }

  .catalog-header {
    flex-direction: column;
    align-items: stretch;
  }

  .catalog-controls {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    width: 100%;
  }

  .article-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .sort-component {
    width: auto;
  }
}
</style>