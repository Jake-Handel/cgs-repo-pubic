<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <header class="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div class="container mx-auto px-4 py-3">
        <div class="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between">
          <router-link to="/" class="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent hover:from-teal-700 hover:to-blue-700 transition-all duration-500 whitespace-nowrap">Student Opportunities</router-link>

          <div class="w-full flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-end">
            <div class="relative category-dropdown-container">
              <button 
                @click="showCategoryDropdown = !showCategoryDropdown"
                class="flex items-center justify-between w-full sm:w-48 border rounded-lg py-2.5 px-4 text-gray-700 bg-white/70 backdrop-blur-sm shadow-sm hover:bg-white hover:shadow-md hover:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 transition-all duration-200 ease-in-out transform hover:-translate-y-0.5"
                :class="{ 'border-teal-500 ring-2 ring-teal-400 ring-opacity-50 bg-white': showCategoryDropdown }"
              >
                <span class="truncate">{{ selectedCategory ? selectedCategory : 'All Categories' }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 ml-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              
              <!-- Dropdown menu -->
              <div 
                v-show="showCategoryDropdown" 
                @click.stop
                class="absolute z-50 mt-1 w-full sm:w-56 rounded-md shadow-xl bg-white ring-1 ring-gray-200 overflow-hidden transform transition-all duration-200 origin-top"
                :class="{ 'scale-95 opacity-0': !showCategoryDropdown, 'scale-100 opacity-100': showCategoryDropdown }"
              >
                <div class="py-1" role="menu" aria-orientation="vertical">
                  <button 
                    @click.stop="selectCategory('')"
                    class="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 flex items-center justify-between transition-colors duration-150 ease-in-out"
                    :class="{ 'bg-teal-50 text-teal-700 font-medium': !selectedCategory }"
                    role="menuitem"
                  >
                    <span>All Categories</span>
                    <svg v-if="!selectedCategory" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  <div v-for="category in Object.keys(categoryDisplayNames)" :key="category">
                    <button 
                      @click.stop="selectCategory(category)"
                      class="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 flex items-center justify-between transition-colors duration-150 ease-in-out"
                      :class="{ 'bg-teal-50 text-teal-700 font-medium': selectedCategory === category }"
                      role="menuitem"
                    >
                      <span>{{ categoryDisplayNames[category] }}</span>
                      <svg v-if="selectedCategory === category" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
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
              <div class="relative sort-dropdown-container">
                <button 
                  @click="toggleSortDropdown"
                  class="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 hover:border-teal-400 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 transition-all duration-200 ease-in-out transform hover:-translate-y-0.5"
                  :class="{ 'bg-gray-50 border-teal-400 ring-2 ring-teal-100': showSortDropdown }"
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
                  @click.stop
                  class="absolute right-0 mt-2 w-56 rounded-md shadow-xl bg-white ring-1 ring-gray-200 z-50 transform transition-all duration-200 origin-top-right"
                  :class="{ 'scale-95 opacity-0': !showSortDropdown, 'scale-100 opacity-100': showSortDropdown }"
                >
                  <div class="py-1" role="menu" aria-orientation="vertical">
                    <p class="px-4 py-2.5 text-sm text-gray-600 font-medium border-b border-gray-100 bg-gray-50">Sort by</p>
                    <button 
                      v-for="option in sortOptions" 
                      :key="option.value"
                      @click="selectSortOption(option.value)"
                      class="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150 ease-in-out"
                      :class="{ 'bg-gray-100 text-teal-700 font-medium': sortBy === option.value }"
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

    <div class="container mx-auto px-4 py-4">
      <main class="container mx-auto px-4 py-6">
        <div class="mb-6 flex items-center justify-center">
          <h2 class="text-3xl font-bold">
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">
              {{ currentCategory }}
            </span>
            <span class="text-gray-500 text-base font-normal ml-3">
              {{ filteredOpportunities.length }} opportunities
            </span>
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="opportunity in filteredOpportunities" 
            :key="opportunity.id" 
            class="opportunity-card group relative overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-gray-200"
            :class="cardColorClass(opportunity.type)"
          >
            <!-- Background gradient effect on hover -->
            <div class="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div class="h-48 bg-gray-50 flex items-center justify-center overflow-hidden relative">
              <!-- Shine effect on hover -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-full group-hover:translate-x-full"></div>
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
            <div class="p-6 relative z-10">
              <!-- Category tag -->
              <span class="inline-block px-3 py-1 mb-3 text-xs font-medium rounded-full" 
                    :class="getCategoryColor(opportunity.type)">
                {{ opportunity.type }}
              </span>
              <h3 class="text-xl font-semibold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors duration-300">
                {{ opportunity.title }}
              </h3>
              <div class="space-y-2 text-sm">

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
                    class="inline-flex items-center text-teal-600 hover:text-teal-800 font-medium text-sm transition-all duration-200 group"
                  >
                    <span class="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-teal-600 after:transition-all after:duration-300 group-hover:after:w-full">
                      Apply Now
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 ml-1.5 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
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
      class="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-6 pb-4 relative overflow-hidden fixed bottom-0 w-full transition-transform duration-300">
      <!-- Animated background elements -->
      <div class="absolute inset-0 -z-10">
        <div class="absolute -bottom-40 -right-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div class="absolute -top-20 -left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>
      
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <!-- Contact Us -->
          <div data-aos="fade-up" data-aos-delay="100">
            <div class="inline-flex items-center mb-6">
              <div class="w-2 h-8 bg-gradient-to-b from-teal-400 to-blue-500 rounded-full mr-3"></div>
              <h3 class="text-xl font-bold text-white">Contact Us</h3>
            </div>
            <p class="text-gray-300 mb-6">
              Have an opportunity to share? We'd love to hear from you!
            </p>
            <button 
              @click="openMail"
              class="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl hover:from-teal-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <i class="fas fa-envelope mr-2"></i>
              <span>Email Us</span>
            </button>
          </div>
          
          <!-- Quick Links -->
          <div data-aos="fade-up" data-aos-delay="200">
            <div class="inline-flex items-center mb-6">
              <div class="w-2 h-8 bg-gradient-to-b from-teal-400 to-blue-500 rounded-full mr-3"></div>
              <h3 class="text-xl font-bold text-white">Quick Links</h3>
            </div>
            <ul class="space-y-3">
              <li>
                <router-link 
                  to="/" 
                  class="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span class="w-1.5 h-1.5 bg-teal-400 rounded-full mr-3 group-hover:bg-white transition-colors duration-300"></span>
                  Home
                </router-link>
              </li>
              <li>
                <router-link 
                  to="/opportunities" 
                  class="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span class="w-1.5 h-1.5 bg-teal-400 rounded-full mr-3 group-hover:bg-white transition-colors duration-300"></span>
                  Opportunities Database
                </router-link>
              </li>
            </ul>
          </div>
          
          <!-- About -->
          <div data-aos="fade-up" data-aos-delay="300">
            <div class="inline-flex items-center mb-6">
              <div class="w-2 h-8 bg-gradient-to-b from-teal-400 to-blue-500 rounded-full mr-3"></div>
              <h3 class="text-xl font-bold text-white">About</h3>
            </div>
            <p class="text-gray-300 mb-4">
              A platform connecting students with opportunities for academic, personal, and professional growth.
            </p>
            <p class="text-gray-400 text-sm">
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
    const showCategoryDropdown = ref(false);
    const showSortDropdown = ref(false);
    const sortBy = ref('alphabetical');
    
    const sortOptions = [
      { value: 'alphabetical', label: 'Alphabetical (A-Z)' },
      { value: 'date', label: 'Date (Earliest first)' },
    ];
    
    const selectCategory = (category) => {
      selectedCategory.value = category === selectedCategory.value ? '' : category;
      showCategoryDropdown.value = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    const toggleCategoryDropdown = () => {
      showCategoryDropdown.value = !showCategoryDropdown.value;
    };
    
    const toggleSortDropdown = () => {
      showSortDropdown.value = !showSortDropdown.value;
    };
    
    const selectSortOption = (option) => {
      sortBy.value = option;
      showSortDropdown.value = false;
    };

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
      } else if (typeParts.some(t => t.includes('summer school')) || typeParts.some(t => t.includes('summer program'))) {
        return 'text-yellow-600';
      }
      
      // Default color for other types
      return 'text-teal-600';
    };

    const getCategoryColor = (type) => {
      const colors = {
        'Humanities & Politics & Int. Relations': 'bg-blue-100 text-blue-800',
        'Speech & Debate & Model UN': 'bg-purple-100 text-purple-800',
        'STEM': 'bg-green-100 text-green-800',
        'Leadership/Volunteering': 'bg-yellow-100 text-yellow-800',
        'Business & Economics & Entrepreneurship': 'bg-indigo-100 text-indigo-800',
        'Law': 'bg-red-100 text-red-800',
        'Creative Expression & Team Oriented Activities': 'bg-pink-100 text-pink-800',
        'Summer Schools/Internships': 'bg-teal-100 text-teal-800',
        'Impressive Commended': 'bg-amber-100 text-amber-800'
      };
      return colors[type] || 'bg-gray-100 text-gray-800';
    };

    const openMail = () => {
      window.open('mailto:sidney.zhang@cgs.act.edu.au');
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
    });
    
    onUnmounted(() => {
    });
    
    return {
      opportunities,
      selectedCategory,
      searchQuery,
      showFooter,
      currentCategory,
      filteredOpportunities,
      cardColorClass,
      getCategoryColor,
      openMail,
      showSortDropdown,
      showCategoryDropdown,
      sortBy,
      sortOptions,
      selectSortOption,
      selectCategory,
      toggleCategoryDropdown,
      toggleSortDropdown,
      categoryDisplayNames
    };
  }
};
</script>