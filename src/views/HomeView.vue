<template>
  <div class="home">
    <HeroBanner />
    <main>
      <section class="about-section">
        <About />
      </section>
      <section class="latest-articles-section">
        <LatestArticles />
      </section>
    </main>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import HeroBanner from '@/components/header/HeroBanner.vue'
import About from '@/components/main/About.vue'
import LatestArticles from '@/components/main/LatestArticles.vue'

export default {
  name: 'HomeView',
  components: {
    HeroBanner,
    About,
    LatestArticles
  },
  setup() {
    onMounted(() => {
      window.scrollTo(0, 0)
    })
  }
}
</script>

<style scoped>
.home {
  width: 100%;
  overflow-x: hidden;
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.about-section,
.latest-articles-section {
  margin-bottom: 4rem;
}

@media (max-width: 768px) {
  main {
    padding: 1rem;
  }
}
</style>