<template>
  <nav class="navbar">
    <div class="navbar-content">
      <div class="navbar-brand">
        <router-link to="/" class="brand-link">BlogNews</router-link>
      </div>
      <div class="navbar-links">
        <router-link to="/catalog" class="nav-link">Catalog</router-link>
        <router-link to="/favorites" class="nav-link favorites-link">
          Favorites
          <span v-if="favoritesCount > 0" class="favorites-count">{{ favoritesCount }}</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { useArticles } from '@/composables/useArticles';

export default {
  name: 'Navbar',
  setup() {
    const { favoritesCount } = useArticles();
    return { 
      favoritesCount 
    };
  }
}
</script>

<style scoped>
.navbar {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.brand-link {
  text-decoration: none;
  color: #007bff;
  transition: color 0.3s ease;
}

.brand-link:hover {
  color: #0056b3;
}

.navbar-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #007bff;
}

.favorites-link {
  position: relative;
}

.favorites-count {
  position: absolute;
  top: -10px;
  right: -15px;
  background-color: #dc3545;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.8em;
}

@media (max-width: 768px) {
  .navbar-content {
    flex-direction: column;
    padding: 1rem;
  }

  .navbar-brand {
    margin-bottom: 1rem;
  }

  .navbar-links {
    width: 100%;
    justify-content: space-between;
  }
}
</style>