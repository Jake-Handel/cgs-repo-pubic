<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-3">
        <div class="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between">
          <router-link to="/" class="text-xl font-semibold text-teal-800 hover:text-teal-600 transition-colors duration-300 whitespace-nowrap">Student Opportunities</router-link>

          <div class="w-full flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-end">
            <div class="relative">
              <select
                v-model="selectedCategory"
                class="border rounded-lg py-2 px-4 text-gray-700 w-full sm:w-48
                     hover:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50
                     transition-all duration-200 cursor-pointer
                     bg-white shadow-sm"
              >
                <option value="" class="text-gray-500">All Categories</option>
                <option value="Humanities & Politics & Int. Relations" class="text-teal-800">Humanities & Politics & Int. Relations</option>
                <option value="Speech & Debate & Model UN" class="text-teal-800">Speech & Debate & Model UN</option>
                <option value="STEM" class="text-teal-800">STEM</option>
                <option value="Leadership/Volunteering" class="text-teal-800">Leadership/Volunteering</option>
                <option value="Business & Economics & Entrepreneurship" class="text-teal-800">Business & Economics & Entrepreneurship</option>
                <option value="Law" class="text-teal-800">Law</option>
                <option value="Creative Expression & Team Oriented Activities" class="text-teal-800">Creative Expression & Team Oriented Activities</option>
                <option value="Summer Schools/Internships" class="text-teal-800">Summer Schools/Internships</option>
                <option value="Impressive Commended" class="text-teal-800">Impressive Commended</option>
              </select>
            </div>

            <div class="relative flex items-center space-x-2">
              <div class="relative flex-1">
                <input
                  type="text"
                  v-model="searchQuery"
                  placeholder="Search opportunities..."
                  class="border rounded-lg py-2 px-3 text-gray-700 w-full
                           hover:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50
                           transition-all duration-200"
                />
                <div class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              <!-- Sort Dropdown -->
              <div class="relative">
                <button 
                  @click="showSortDropdown = !showSortDropdown"
                  class="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition-all duration-200"
                  :class="{ 'bg-gray-100': showSortDropdown }"
                  aria-haspopup="true"
                  :aria-expanded="showSortDropdown"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                  </svg>
                </button>
                
                <!-- Dropdown menu -->
                <div 
                  v-show="showSortDropdown" 
                  @click="showSortDropdown = false"
                  class="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                >
                  <div class="py-1" role="menu" aria-orientation="vertical">
                    <p class="px-4 py-2 text-sm text-gray-700 font-medium border-b border-gray-100">Sort by</p>
                    <button 
                      v-for="option in sortOptions" 
                      :key="option.value"
                      @click="selectSortOption(option.value)"
                      class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between"
                      :class="{ 'bg-blue-50 text-teal-700': sortBy === option.value }"
                      role="menuitem"
                    >
                      <span>{{ option.label }}</span>
                      <svg v-if="sortBy === option.value" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-4 py-4 mb-40">
      <main class="container mx-auto px-4 py-6">
        <div class="mb-6 flex items-center justify-center">
          <h2 class="text-2xl font-semibold text-teal-800">
            {{ currentCategory }}
            <span class="text-gray-500 text-sm ml-2">
              {{ filteredOpportunities.length }} opportunities
            </span>
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="opportunity in filteredOpportunities" 
            :key="opportunity.id" 
            class="opportunity-card"
            :class="cardColorClass(opportunity.type)"
          >
            <div class="h-48 bg-white flex items-center justify-center border-b border-gray-100">
              <img
                v-if="opportunity.image"
                :src="require(`@/assets/images/${opportunity.image}`)"
                :alt="opportunity.title"
                class="h-full w-full object-cover rounded-t-xl"
                loading="lazy"
                @error="(e) => {
                  e.target.src = '/images/default-opportunity.jpg'
                }"
              />
              <div v-else class="flex items-center justify-center h-full w-full text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-teal-800 mb-2 hover:text-teal-600 transition-colors duration-200">
                {{ opportunity.title }}
              </h3>
              <div class="space-y-2 text-sm">
                <div class="flex items-center" :class="cardColorClass(opportunity.type)">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span class="font-medium">{{ opportunity.type }}</span>
                </div>
                <div class="flex items-center text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>{{ opportunity.audience }}</span>
                </div>
                <div class="flex items-center text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{{ opportunity.cost }}</span>
                </div>
                <div class="flex items-center text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{{ opportunity.application }}</span>
                </div>
                <div v-if="opportunity.applicationLink" class="flex items-center text-teal-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.103-1.103M19 4a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <a 
                    :href="opportunity.applicationLink" 
                    target="_blank" 
                    class="text-teal-600 hover:text-teal-800 underline transition-colors duration-200"
                  >
                    Apply Now
                  </a>
                </div>
                <div class="flex items-center text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{{ opportunity.date || 'TBD' }}</span>
                </div>
                <div class="flex items-center text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span>{{ opportunity.location }}</span>
                </div>
                <div v-if="opportunity.summary" class="mt-4 text-gray-700">
                  <p class="text-sm">{{ opportunity.summary }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Footer -->
    <footer 
      class="bg-white border-t border-gray-100 fixed bottom-0 w-full transition-transform duration-300"
      :class="{ 'translate-y-full': !showFooter }"
    >
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-teal-800 font-semibold mb-4">Contact Us</h3>
            <p class="text-gray-600 mb-4">
              Have an opportunity to share? Contact us at:
            </p>
            <button 
              @click="openMail"
              class="text-teal-600 hover:text-teal-800 transition-colors duration-200"
            >
              Email us
            </button>
          </div>
          
          <div>
            <h3 class="text-teal-800 font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li>
                <router-link 
                  to="/"
                  class="text-gray-600 hover:text-teal-600 transition-colors duration-200"
                >
                  Home
                </router-link>
              </li>
              <li>
                <router-link 
                  to="/opportunities"
                  class="text-gray-600 hover:text-teal-600 transition-colors duration-200"
                >
                  Opportunities Database
                </router-link>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-teal-800 font-semibold mb-4">About</h3>
            <p class="text-gray-600">
              A platform connecting students with opportunities for academic, personal, and professional growth.
            </p>
            <p>
              Developed by Jake Handel and Sidney Zhang &copy; 2025
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import opportunitiesData from './data/opportunities.js';

const categoryDisplayNames = {
  "Humanities & Politics & Int. Relations": 'Humanities & Politics & Int. Relations',
  "Speech & Debate & Model UN": 'Speech & Debate & Model UN',
  "STEM": 'STEM',
  "Leadership/Volunteering": 'Leadership/Volunteering',
  "Business & Economics & Entrepreneurship": 'Business & Economics & Entrepreneurship',
  "Law": 'Law',
  "Creative Expression & Team Oriented Activities": 'Creative Expression & Team Oriented Activities',
  "Summer Schools/Internships": 'Summer Schools/Internships',
  "Impressive Commended": 'Impressive Commended'
};

export default {
  name: 'OpportunitiesPage',
  setup() {
    const opportunities = ref([]);
    const selectedCategory = ref('');
    const searchQuery = ref('');
    const showFooter = ref(false);
    const showSortDropdown = ref(false);
    const sortBy = ref('alphabetical');
    
    const sortOptions = [
      { value: 'alphabetical', label: 'Alphabetical (A-Z)' },
      { value: 'date', label: 'Date (Earliest first)' },
    ];

    const currentCategory = computed(() => {
      if (!selectedCategory.value) return 'All opportunities';
      
      return categoryDisplayNames[selectedCategory.value] || 'All opportunities';
    });
    const filteredOpportunities = computed(() => {
      let filtered = [...opportunities.value];
      
      // Apply sorting based on selected option
      switch(sortBy.value) {
        case 'alphabetical':
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'date':
          filtered.sort((a, b) => {
            // Extract dates and compare
            const dateA = extractDate(a.datenum);
            const dateB = extractDate(b.datenum);
            return dateA - dateB; // Earliest first
          });
          break;
        default:
          filtered.sort((a, b) => a.title.localeCompare(b.title));
      }
      
      // Filter by category
      if (selectedCategory.value) {
        const categoryValue = selectedCategory.value;
        filtered = filtered.filter(opp => {
          const categories = opp.categories || [];
          return categories.some(cat => cat === categoryValue);
        });
      }

      // Filter by search query
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(opp => 
          opp.title.toLowerCase().includes(query) ||
          opp.type.toLowerCase().includes(query)
        );
      }

      return filtered;
    });

    const cardColorClass = (type) => {
      // Split the type string by commas and check each part
      const typeParts = type.toLowerCase().split(',').map(t => t.trim());
      
      // Check for specific type keywords
      if (typeParts.some(t => t.includes('competition'))) {
        return 'text-orange-600';
      } else if (typeParts.some(t => t.includes('activity'))) {
        return 'text-blue-600';
      } else if (typeParts.some(t => t.includes('workshop'))) {
        return 'text-purple-600';
      } else if (typeParts.some(t => t.includes('conference'))) {
        return 'text-green-600';
      } else if (typeParts.some(t => t.includes('summer school'))) {
        return 'text-yellow-600';
      }
      
      // Default color for other types
      return 'text-teal-600';
    }

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      
      if (documentHeight - windowHeight - scrollPosition < 100) {
        showFooter.value = true;
      } else {
        showFooter.value = false;
      }
    };

    const openMail = () => {
      window.open('mailto:sidney.zhang@cgs.act.edu.au');
    };
    
    const selectSortOption = (option) => {
      sortBy.value = option;
      showSortDropdown.value = false;
    };
    
    const extractDate = (dateString) => {
      if (!dateString) return new Date('9999-12-31'); // Put items without date at the end
      
      // Try to parse various date formats
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) return date;
      
      // Fallback for other date formats or return a very future date if can't parse
      return new Date('9999-12-31');
    };

    onMounted(() => {
      opportunities.value = opportunitiesData;
      window.addEventListener('scroll', handleScroll);
      
      // Close dropdown when clicking outside
      document.addEventListener('click', handleClickOutside);
    });
    
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    });
    
    const handleClickOutside = (event) => {
      const sortButton = event.target.closest('.relative > button');
      if (!sortButton) {
        showSortDropdown.value = false;
      }
    };

    return {
      opportunities,
      selectedCategory,
      searchQuery,
      showFooter,
      currentCategory,
      filteredOpportunities,
      cardColorClass,
      openMail,
      showSortDropdown,
      sortBy,
      sortOptions,
      selectSortOption
    };
  }
};
</script>

<style scoped>
.opportunity-card {
  @apply bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300;
}
</style>