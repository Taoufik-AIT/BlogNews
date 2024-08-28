import { ref, computed, watch } from "vue";

const originalArticles = [
  { id: 1, title: "The Future of AI in Web Development", description: "Exploring how artificial intelligence is reshaping the landscape of web development and its implications for developers.", imageUrl: "https://picsum.photos/id/1/400/300", authorImage: "assets/img/img-1.png", author: "Amélie Laurent", date: "2024-01-20", category: "Technology" },
  { id: 2, title: "Designing for Accessibility: Best Practices", description: "A comprehensive guide to creating inclusive web designs that cater to users of all abilities.", imageUrl: "https://picsum.photos/id/2/400/300", authorImage: "assets/img/img-2.png", author: "Ricardo Baker", date: "2024-01-15", category: "Design" },
  { id: 3, title: "The Rise of Serverless Architecture", description: "Understanding the benefits and challenges of serverless computing in modern web applications.", imageUrl: "https://picsum.photos/id/3/400/300", authorImage: "assets/img/img-3.png", author: "Lena Steiner", date: "2024-01-10", category: "Technology" },
  { id: 4, title: "Mastering CSS Grid Layout", description: "A deep dive into CSS Grid and how it's revolutionizing web page layouts.", imageUrl: "https://picsum.photos/id/4/400/300", authorImage: "assets/img/img-4.png", author: "Alex Whitten", date: "2024-01-05", category: "Design" },
  { id: 5, title: "The Impact of 5G on Web Performance", description: "Exploring how 5G technology will influence web development practices and user experiences.", imageUrl: "https://picsum.photos/id/5/400/300", authorImage: "assets/img/img-5.png", author: "Rafael Cruz", date: "2023-12-20", category: "Technology" },
  { id: 6, title: "JavaScript Frameworks Comparison", description: "An in-depth look at popular JavaScript frameworks and their pros and cons.", imageUrl: "https://picsum.photos/id/6/400/300", authorImage: "assets/img/img-6.png", author: "Sophie Chen", date: "2023-12-15", category: "Programming" },
  { id: 7, title: "The Art of Code Refactoring", description: "Best practices and techniques for improving code quality through refactoring.", imageUrl: "https://picsum.photos/id/7/400/300", authorImage: "assets/img/img-7.png", author: "Marcus Johnson", date: "2023-12-10", category: "Programming" },
  { id: 8, title: "Web Security Essentials", description: "A comprehensive guide to securing your web applications against common threats.", imageUrl: "https://picsum.photos/id/8/400/300", authorImage: "assets/img/img-8.png", author: "Emma Rodriguez", date: "2023-12-05", category: "Security" },
  { id: 9, title: "Responsive Design Strategies", description: "Techniques for creating fluid and adaptive layouts for various screen sizes.", imageUrl: "https://picsum.photos/id/9/400/300", authorImage: "assets/img/img-9.png", author: "David Kim", date: "2023-11-30", category: "Design" },
  { id: 10, title: "The Future of Web Browsers", description: "Exploring upcoming features and technologies in modern web browsers.", imageUrl: "https://picsum.photos/id/10/400/300", authorImage: "assets/img/img-10.png", author: "Olivia Patel", date: "2023-11-25", category: "Technology" },
  { id: 11, title: "Machine Learning in Frontend Development", description: "Implementing machine learning algorithms to enhance user experiences.", imageUrl: "https://picsum.photos/id/11/400/300", authorImage: "assets/img/img-11.png", author: "Thomas Müller", date: "2023-11-20", category: "Technology" },
  { id: 12, title: "Advanced CSS Animations", description: "Creating complex and performant animations using modern CSS techniques.", imageUrl: "https://picsum.photos/id/12/400/300", authorImage: "assets/img/img-12.png", author: "Aisha Rahman", date: "2023-11-15", category: "Design" },
  { id: 13, title: "Building Progressive Web Apps", description: "A step-by-step guide to creating fast and reliable progressive web applications.", imageUrl: "https://picsum.photos/id/13/400/300", authorImage: "assets/img/img-13.png", author: "Carlos Mendoza", date: "2023-11-10", category: "Programming" },
  { id: 14, title: "Web Accessibility Guidelines", description: "Understanding and implementing WCAG 2.1 for inclusive web design.", imageUrl: "https://picsum.photos/id/14/400/300", authorImage: "assets/img/img-14.png", author: "Nadia Ivanova", date: "2023-11-05", category: "Design" },
  { id: 15, title: "Optimizing Web Performance", description: "Strategies and tools for improving website speed and user experience.", imageUrl: "https://picsum.photos/id/15/400/300", authorImage: "assets/img/img-15.png", author: "Leo Nakamura", date: "2023-10-31", category: "Performance" },
  { id: 16, title: "Introduction to WebAssembly", description: "Understanding the basics of WebAssembly and its applications in web development.", imageUrl: "https://picsum.photos/id/16/400/300", authorImage: "assets/img/img-16.png", author: "Yuki Tanaka", date: "2023-10-26", category: "Programming" },
  { id: 17, title: "The Role of DevOps in Web Development", description: "Exploring how DevOps practices can streamline web development workflows.", imageUrl: "https://picsum.photos/id/17/400/300", authorImage: "assets/img/img-17.png", author: "Elena Petrova", date: "2023-10-21", category: "DevOps" },
  { id: 18, title: "Mastering Git for Web Developers", description: "Advanced Git techniques and workflows for efficient collaboration.", imageUrl: "https://picsum.photos/id/18/400/300", authorImage: "assets/img/img-18.png", author: "Michael Chang", date: "2023-10-16", category: "Version Control" },
  { id: 19, title: "The Impact of Dark Mode on UX", description: "Analyzing the benefits and implementation strategies of dark mode in web design.", imageUrl: "https://picsum.photos/id/19/400/300", authorImage: "assets/img/img-19.png", author: "Sarah Johnson", date: "2023-10-11", category: "Design" },
  { id: 20, title: "Micro Frontend Architecture", description: "Exploring the benefits and challenges of adopting a micro frontend architecture.", imageUrl: "https://picsum.photos/id/20/400/300", authorImage: "assets/img/img-20.png", author: "Daniel Lee", date: "2023-10-06", category: "Architecture" },
  { id: 21, title: "Web Components: A Deep Dive", description: "Understanding and implementing web components for reusable UI elements.", imageUrl: "https://picsum.photos/id/21/400/300", authorImage: "assets/img/img-21.png", author: "Jasmine Wong", date: "2023-10-01", category: "Programming" },
  { id: 22, title: "The Future of CSS: What's Next?", description: "Exploring upcoming CSS features and their potential impact on web design.", imageUrl: "https://picsum.photos/id/22/400/300", authorImage: "assets/img/img-1.png", author: "Omar Hassan", date: "2023-09-26", category: "Design" },
  { id: 23, title: "Serverless Computing for Web Apps", description: "Leveraging serverless architecture to build scalable and cost-effective web applications.", imageUrl: "https://picsum.photos/id/23/400/300", authorImage: "assets/img/img-2.png", author: "Lila Patel", date: "2023-09-21", category: "Technology" },
  { id: 24, title: "Mastering REST API Design", description: "Best practices for designing clean, efficient, and developer-friendly REST APIs.", imageUrl: "https://picsum.photos/id/24/400/300", authorImage: "assets/img/img-3.png", author: "Felix Schmidt", date: "2023-09-16", category: "API" },
  { id: 25, title: "The Rise of JAMstack", description: "Understanding the JAMstack architecture and its benefits for modern web development.", imageUrl: "https://picsum.photos/id/25/400/300", authorImage: "assets/img/img-4.png", author: "Nina Kowalski", date: "2023-09-11", category: "Architecture" },

];

const articles = ref([...originalArticles]);
const favorites = ref(JSON.parse(localStorage.getItem('favorites')) || []);
const selectedCategory = ref('All');
const searchQuery = ref('');
const sortOption = ref('default');
const currentPage = ref(1);
const itemsPerPage = 6;

watch(favorites, (newFavorites) => {
  localStorage.setItem('favorites', JSON.stringify(newFavorites));
}, { deep: true });

export function useArticles() {
  const toggleFavorite = (articleId) => {
    const index = favorites.value.indexOf(articleId);
    if (index === -1) {
      favorites.value.push(articleId);
    } else {
      favorites.value.splice(index, 1);
    }
  };

  const isFavorite = (articleId) => favorites.value.includes(articleId);

  const filteredArticles = computed(() => {
    let result = [...articles.value];

    if (selectedCategory.value !== 'All') {
      result = result.filter(article => article.category === selectedCategory.value);
    }

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(article => 
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query)
      );
    }

    return result;
  });

  const sortedArticles = computed(() => {
    let result = [...filteredArticles.value];

    switch (sortOption.value) {
      case 'nameAsc':
        return result.sort((a, b) => a.title.localeCompare(b.title));
      case 'nameDesc':
        return result.sort((a, b) => b.title.localeCompare(a.title));
      case 'dateAsc':
        return result.sort((a, b) => new Date(a.date) - new Date(b.date));
      case 'dateDesc':
        return result.sort((a, b) => new Date(b.date) - new Date(a.date));
      default:
        return result.sort((a, b) => originalArticles.findIndex(article => article.id === a.id) - originalArticles.findIndex(article => article.id === b.id));
    }
  });

  const paginatedArticles = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    return sortedArticles.value.slice(startIndex, startIndex + itemsPerPage);
  });

  const totalPages = computed(() => Math.ceil(sortedArticles.value.length / itemsPerPage));

  const favoriteArticles = computed(() => 
    articles.value.filter(article => favorites.value.includes(article.id))
  );

  const favoritesCount = computed(() => favorites.value.length);

  const categories = computed(() => {
    return ['All', 'Technology', 'Design', 'Programming', 'Security', 'Performance'];
  });

  const setCategory = (category) => {
    selectedCategory.value = category;
    currentPage.value = 1;
  };

  const setSearchQuery = (query) => {
    searchQuery.value = query;
    currentPage.value = 1;
  };

  const setSortOption = (option) => {
    sortOption.value = option;
    currentPage.value = 1;
  };

  const getArticleById = (id) => articles.value.find(article => article.id === parseInt(id));

  const getRecommendedArticles = (currentArticleId, count) => {
    const currentArticle = getArticleById(currentArticleId);
    if (!currentArticle) return [];

    return articles.value
      .filter(article => article.id !== currentArticleId && article.category === currentArticle.category)
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  };

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };

  return {
    articles: paginatedArticles,
    favoriteArticles,
    favoritesCount,
    categories,
    selectedCategory,
    searchQuery,
    sortOption,
    currentPage,
    totalPages,
    toggleFavorite,
    isFavorite,
    setCategory,
    setSearchQuery,
    setSortOption,
    getArticleById,
    getRecommendedArticles,
    nextPage,
    prevPage
  };
}