<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <header class="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div class="container mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          <div class="animate-fade-in">
            <router-link 
              to="/" 
              class="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent hover:from-teal-700 hover:to-blue-700 transition-all duration-500"
            >
              Student Opportunities
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <!-- Hero Section -->
      <section class="py-16 md:py-24 relative overflow-hidden">
        <!-- Animated background elements -->
        <div class="absolute inset-0 -z-10">
          <div class="absolute top-1/4 -left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div class="absolute top-1/2 -right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div class="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div class="relative">
          <div class="flex items-center gap-4 mb-8 animate-fade-in-up" style="animation-delay: 100ms">
            <div class="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl shadow-lg transform transition-all duration-500 hover:rotate-12">
              <font-awesome-icon :icon="['fas', 'book-open']" size="lg" class="text-white" />
            </div>
            <h2 class="text-2xl font-medium bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Empowering and Enriching Students
            </h2>
          </div>

          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="space-y-8 animate-fade-in-up" style="animation-delay: 200ms">
              <h1 class="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                <span class="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">
                  Opportunities<br class="hidden md:block" />
                  <span class="inline-block mt-2">for Students</span>
                </span>
              </h1>
              
              <p class="text-xl text-gray-600 max-w-lg leading-relaxed">
                Discover a wide range of opportunities for academic, personal, and professional growth in one centralised platform.
              </p>

              <!-- Action buttons -->
              <div class="flex flex-col sm:flex-row gap-4 pt-4">
                <router-link 
                  to="/opportunities" 
                  class="group relative px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl overflow-hidden transition-all duration-500 transform hover:scale-105 flex items-center gap-3 text-lg shadow-lg hover:shadow-xl hover:from-teal-700 hover:to-blue-700"
                >
                  <span class="absolute inset-0 bg-gradient-to-r from-teal-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span class="relative z-10 flex items-center">
                    <span class="inline-block transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    <span class="ml-2">View Database</span>
                  </span>
                </router-link>
                <button 
                  class="group relative px-8 py-4 border-2 border-teal-600 text-teal-600 rounded-xl overflow-hidden transition-all duration-500 transform hover:scale-105 flex items-center gap-3 text-lg shadow-lg hover:shadow-xl bg-white/50 backdrop-blur-sm"
                  @click="openMail"
                >
                  <span class="absolute inset-0 bg-teal-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span class="relative z-10 flex items-center">
                    <span class="inline-block transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    <span class="ml-2">Share Opportunities</span>
                  </span>
                </button>
              </div>
            </div>

            <div class="hidden md:flex justify-end animate-float" style="animation-delay: 300ms">
              <div class="relative w-full max-w-md">
                <div class="absolute bg-transparent -inset-4 rounded-3xl opacity-20 blur-xl"></div>
                <div class="relative bg-transparent p-2 rounded-2xl transform transition-all duration-500 hover:rotate-1 hover:scale-105">
                  <img 
                    src="./assets/images/Book.png" 
                    alt="Book illustration" 
                    class="w-full h-auto bg-transparent object-contain transform hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-16 md:py-24 relative overflow-hidden">
        <!-- Animated background elements -->
        <div class="absolute inset-0 -z-10">
          <div class="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-1000"></div>
          <div class="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-3000"></div>
        </div>
        
        <div class="relative">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <!-- Left: Image with parallax effect -->
            <div class="relative group" data-aos="fade-right" data-aos-duration="1000">
              <div class="absolute -inset-4 bg-gradient-to-r from-teal-400 to-blue-500 rounded-3xl opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500"></div>
              <div class="relative overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-700 group-hover:shadow-xl">
                <img 
                  src="./assets/images/Forward-img.png" 
                  alt="Students working in a collaborative space" 
                  class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div class="absolute -bottom-6 -right-6 w-24 h-24 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            </div>
            
            <!-- Right: Content -->
            <div class="space-y-8 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
              <div class="inline-block px-4 py-2 bg-gradient-to-r from-teal-100 to-blue-100 rounded-full">
                <span class="text-sm font-semibold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Our Vision</span>
              </div>
              
              <h2 class="text-4xl font-bold text-gray-900 leading-tight">
                <span class="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">Foreword</span>
              </h2>
              
              <div class="space-y-6 text-gray-700">
                <p class="text-lg leading-relaxed">
                  As students, we understand how important education, experience, and enrichment are in paving the way to success. If nothing else, they teach us to be effortful in life.
                </p>
                <p class="text-lg leading-relaxed">
                  Taking on the opportunities around us allow for a holistic student who is truly 
                  <span class="font-semibold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Ready for the World</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- How to Use Section -->
      <section class="py-16 md:py-24 relative overflow-hidden">
        <!-- Animated background elements -->
        <div class="absolute inset-0 -z-10">
          <div class="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>
        
        <div class="relative">
          <div class="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
            <div class="inline-block px-4 py-2 bg-gradient-to-r from-teal-100 to-blue-100 rounded-full mb-4">
              <span class="text-sm font-semibold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Get Started</span>
            </div>
            <h2 class="text-4xl font-bold text-gray-900 mb-6">
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">How to Use Our Platform</span>
            </h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover opportunities tailored just for you with our intuitive platform
            </p>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Left: Steps -->
            <div class="space-y-8 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1" data-aos="fade-right">
              <div class="flex items-start gap-6">
                <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">1</div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Browse Categories</h3>
                  <p class="text-gray-600">
                    Explore our diverse range of categories including Academics, Leadership, Work experience, and more.
                  </p>
                </div>
              </div>
              
              <div class="flex items-start gap-6">
                <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">2</div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Use Filters</h3>
                  <p class="text-gray-600">
                    Narrow down your search with our powerful filters to find the perfect opportunities.
                  </p>
                </div>
              </div>
              
              <div class="flex items-start gap-6">
                <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">3</div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Apply & Engage</h3>
                  <p class="text-gray-600">
                    Apply to opportunities directly through our platform and start your journey.
                  </p>
                </div>
              </div>
              
              <div class="pt-4">
                <router-link 
                  to="/opportunities" 
                  class="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl hover:from-teal-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span>Explore Opportunities</span>
                  <span class="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                </router-link>
              </div>
            </div>
            
            <!-- Right: Quote Card -->
            <div class="relative group" data-aos="fade-left" data-aos-delay="200">
              <div class="absolute -inset-4 bg-gradient-to-r from-teal-500 to-blue-500 rounded-3xl opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500"></div>
              <div class="relative h-full p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl transform transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-1">
                <div class="absolute top-8 right-8 text-6xl text-teal-100 font-serif">"</div>
                <blockquote class="text-2xl font-medium text-gray-800 mb-6 leading-relaxed">
                  Opportunity dances with those who are already on the dance floor
                </blockquote>
                <cite class="flex items-center">
                  <div class="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center text-white font-bold mr-4 shadow-md">
                    HB
                  </div>
                  <div>
                    <div class="font-semibold text-gray-900">H. Jackson Brown Jr.</div>
                    <div class="text-teal-600">Author & Motivational Speaker</div>
                  </div>
                </cite>
                
                <div class="mt-12 pt-8 border-t border-gray-100">
                  <h3 class="text-xl font-bold text-gray-900 mb-3">Beyond just 'Academics'</h3>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-teal-50 text-teal-700 text-sm font-medium rounded-full">Volunteering</span>
                    <span class="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">Leadership</span>
                    <span class="px-3 py-1 bg-purple-50 text-purple-700 text-sm font-medium rounded-full">STEM</span>
                    <span class="px-3 py-1 bg-amber-50 text-amber-700 text-sm font-medium rounded-full">Self-Improvement</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-16 pb-8 relative overflow-hidden">
      <!-- Animated background elements -->
      <div class="absolute inset-0 -z-10">
        <div class="absolute -bottom-40 -right-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div class="absolute -top-20 -left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>
      
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
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
import { defineComponent } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default defineComponent({
  name: 'HomePage',
  components: {
    FontAwesomeIcon
  },
  methods: {
    openMail() {
      window.open('mailto:seniorschool@cgs.act.edu.au');
    }
  }
})
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

/* Base transitions */
* {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

/* Animation Classes */
.animate-fade-in {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-blob {
  animation: blob 10s infinite;
  filter: blur(40px);
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #0d9488, #0284c7);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #0f766e, #0369a1);
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Card hover effects */
.hover-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Button hover effects */
.btn-hover-scale {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.btn-hover-scale:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Gradient text animation */
.animate-gradient-text {
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient 3s linear infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>