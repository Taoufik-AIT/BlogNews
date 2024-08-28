<template>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>À propos</h3>
          <p>Votre source d'informations sur le développement web et les technologies modernes.</p>
        </div>
        <div class="footer-section">
          <h3>Liens rapides</h3>
          <ul>
            <li><router-link to="/">Accueil</router-link></li>
            <li><router-link to="/catalog">Catalogue</router-link></li>
            <li><router-link to="/favorites">Favoris</router-link></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Contact</h3>
          <p>Email : contact@BlogNews.com</p>
          <p>Téléphone : +32 4 23 45 67 89</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} BlogNews. Tous droits réservés.</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer',
    computed: {
      currentYear() {
        return new Date().getFullYear();
      }
    }
  }
  </script>
  
  <style scoped>
  .footer {
    background-color: #f8f8f8;
    padding: 2rem 0;
    margin-top: 2rem;
  }
  
  .footer-content {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .footer-section {
    flex: 1;
    min-width: 200px;
    margin-bottom: 1rem;
  }
  
  .footer-section h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  
  .footer-section ul {
    list-style-type: none;
    padding: 0;
  }
  
  .footer-section ul li {
    margin-bottom: 0.5rem;
  }
  
  .footer-section a {
    color: #336da7;
    text-decoration: none;
  }
  
  .footer-section a:hover {
    text-decoration: underline;
  }
  
  .footer-bottom {
    text-align: center;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #ddd;
  }
  
  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
    }
  
    .footer-section {
      margin-bottom: 1.5rem;
    }
  }
  </style>