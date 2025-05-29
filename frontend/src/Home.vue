<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          <div>
            <router-link 
              to="/" 
              class="text-xl font-semibold text-teal-800 hover:text-teal-600 transition-colors duration-300"
            >
              Student Opportunities
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <!-- Hero Section -->
      <section class="mb-24">
        <div class="flex items-center gap-4 mb-8">
          <div class="w-12">
            <font-awesome-icon :icon="['fas', 'book-open']" size="2x" class="text-teal-800" />
          </div>
          <h2 class="text-teal-800 text-2xl font-medium">Empowering and Enriching Students</h2>
        </div>

        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <h1 class="text-4xl md:text-5xl font-bold text-teal-900 leading-tight">
              Opportunities<br />
              for Students
            </h1>
            
            <p class="text-xl text-gray-600">
              Discover a wide range of opportunities for academic, personal, and professional growth.
            </p>

            <!-- Action buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
              <router-link 
                to="/opportunities" 
                class="px-8 py-4 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 text-lg shadow-md hover:shadow-lg"
              >
                <span class="text-sm">→</span>
                View Database
              </router-link>
              <button 
                class="px-8 py-4 border border-teal-600 text-teal-600 rounded-xl hover:bg-teal-50 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 text-lg shadow-md hover:shadow-lg"
                @click="openMail"
              >
                <span class="text-sm">→</span>
                Share your Opportunities
              </button>
            </div>
          </div>

          <div class="flex justify-end">
            <div class="w-full max-w-md h-auto">
              <img 
                src="./assets/images/Book.png" 
                alt="Book illustration" 
                class="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="mb-24">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
          <!-- Left: Image -->
          <div class="rounded-2xl overflow-hidden shadow-lg">
            <img 
              src="./assets/images/Forward-img.png" 
              alt="Students working in a collaborative space" 
              class="w-full h-full object-cover"
            />
          </div>
          
          <!-- Right: Content -->
          <div class="space-y-6 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
            <h2 class="text-3xl font-bold text-teal-800">Foreword</h2>
            <p class="text-lg text-gray-700">
              As students, we understand how important education, experience, and enrichment are in paving the way to success. If nothing else, they teach us to be effortful in life.
            </p>
            <p class="text-lg text-gray-700">
              Taking on the opportunities around us allow for a holistic student who is truly 
              <span class="font-semibold text-teal-800">Ready for the World</span>.
            </p>
          </div>
        </div>
      </section>

      <!-- How to Use Section -->
      <section class="mb-24">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
          <!-- Left: Content -->
          <div class="space-y-6 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
            <h2 class="text-3xl font-bold text-teal-800">How to Use?</h2>
            <p class="text-lg text-gray-700">
              Multiple categories are included in our database.
            </p>
            <p class="text-lg text-gray-700">
              Use the tags, categories and search filters to quickly find opportunities that suit you.
            </p>
          </div>
          
          <!-- Right: Quote -->
          <div class="space-y-6 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
            <blockquote class="text-2xl text-gray-700">
              "Opportunity dances with those who are already on the dance floor"
            </blockquote>
            <cite class="text-teal-800 font-semibold">
              H. Jackson Brown Jr.
            </cite>
            
            <div>
              <h3 class="text-2xl font-bold text-teal-800">Beyond just 'Academics'</h3>
              <p class="text-lg text-gray-700">
                Including Volunteering, Sports, Music, Self-Development Opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer 
      class="bg-white border-t border-gray-100 mt-auto"
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
              Developed by Jake Handel &copy; 2025
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default defineComponent({
  name: 'HomePage',
  components: {
    FontAwesomeIcon
  },
  methods: {
    openMail() {
      window.open('mailto:sidney.zhang@cgs.act.edu.au');
    }
  }
})
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

/* Add smooth transitions */
* {
  transition: all 0.3s ease-in-out;
}

/* Add hover effects */
button:hover {
  transform: translateY(-2px);
}

/* Add subtle animations */
section {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>