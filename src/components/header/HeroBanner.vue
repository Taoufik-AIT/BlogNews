<template>
    <header class="hero-banner">
      <div class="hero-content">
        <h1>Bienvenue sur BlogNews</h1>
        <p>Votre source d'information sur le développement web et les technologies modernes</p>
        <router-link to="/catalog" class="cta-button">Explorez nos articles</router-link>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: 'HeroBanner'
  }
  </script>
  
  <style scoped>
  .hero-banner {
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('@/assets/img/img-7.png');
    background-size: cover;
    background-position: center;
    height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
  }
  
  .hero-content {
    max-width: 800px;
    padding: 2rem;
  }
  
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .cta-button {
    display: inline-block;
    background-color: #f5f5f5;
    color: #151515;
    padding: 0.8rem 1.5rem;
    text-decoration: none;
    font-size: 1.2rem;
    transition: background-color 0.3s ease;
  }
  
  .cta-button:hover {
    background-color: #0056b3;
    color: #f5f5f5;
  }
  
  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
  
    p {
      font-size: 1.2rem;
    }
  
    .cta-button {
      font-size: 1rem;
    }
  }
  </style>