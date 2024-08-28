<template>
    <section class="latest-articles">
      <h2>Derniers Articles</h2>
      <div class="articles-grid">
        <ArticleCard
          v-for="article in latestArticles"
          :key="article.id"
          :article="article"
          @click="navigateToArticle(article.id)"
        />
      </div>
    </section>
  </template>
  
  <script>
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import ArticleCard from '@/components/ArticleCard.vue'
  import { useArticles } from '@/composables/useArticles'
  
  export default {
    name: 'LatestArticles',
    components: {
      ArticleCard
    },
    setup() {
      const router = useRouter()
      const { articles } = useArticles()
  
      const latestArticles = computed(() => {
        return articles.value.slice(0, 4)
      })
  
      const navigateToArticle = (articleId) => {
        router.push({ name: 'article', params: { id: articleId } })
      }
  
      return {
        latestArticles,
        navigateToArticle
      }
    }
  }
  </script>
  
  <style scoped>
  .latest-articles {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
  }
  
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    text-align: left;
  }
  
  .articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    .articles-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>