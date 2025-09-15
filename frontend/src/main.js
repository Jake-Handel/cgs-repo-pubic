import { createApp } from 'vue';
// Vercel analytics will be imported conditionally in production
import App from './App.vue';
import router from './router';
import './assets/main.css';

// Import AOS (Animate On Scroll)
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBookOpen, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

// Add icons to the library
library.add(faBookOpen, faEnvelope, faTwitter, faFacebookF, faInstagram, faLinkedinIn);

// Import DOMPurify for XSS protection
import DOMPurify from 'dompurify';

// Security configuration
const security = {
  // Sanitize HTML to prevent XSS
  sanitize: (dirty) => {
    if (!dirty) return '';
    return DOMPurify.sanitize(dirty, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
      ALLOWED_ATTR: ['href', 'target', 'rel'],
    });
  },
  
  // Sanitize URL to prevent XSS and open redirects
  sanitizeUrl: (url) => {
    if (!url) return '#';
    try {
      const parsed = new URL(url, window.location.origin);
      if (!['http:', 'https:', 'mailto:'].includes(parsed.protocol)) return '#';
      return parsed.toString();
    } catch (e) {
      return '#';
    }
  }
};

// Create app
const app = createApp(App);

// Initialize AOS
app.AOS = AOS.init({
  // Global settings
  disable: false,
  startEvent: 'DOMContentLoaded',
  initClassName: 'aos-init',
  animatedClassName: 'aos-animate',
  useClassNames: false,
  disableMutationObserver: false,
  debounceDelay: 50,
  throttleDelay: 99,
  // Settings that can be overridden per element:
  offset: 120,
  delay: 0,
  duration: 800,
  easing: 'ease',
  once: true,
  mirror: false,
  anchorPlacement: 'top-bottom',
});

// Register the FontAwesomeIcon component globally
app.component('font-awesome-icon', FontAwesomeIcon);

// Add security methods to global properties
app.config.globalProperties.$security = security;

// Register a global directive for safe HTML
app.directive('safe-html', (el, binding) => {
  el.innerHTML = security.sanitize(binding.value);
});

// Add security headers in development
if (process.env.NODE_ENV === 'development') {
  const meta = document.createElement('meta');
  meta.httpEquiv = 'Content-Security-Policy';
  meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' https: data:;";
  document.head.appendChild(meta);
}

// Use router
app.use(router);

// Mount the app
app.mount('#app');

// Load Vercel analytics only in production
if (process.env.NODE_ENV === 'production') {
  import('@vercel/analytics').then(({ inject: injectAnalytics }) => {
    injectAnalytics();
  });
  import('@vercel/speed-insights').then(({ inject: injectSpeedInsights }) => {
    injectSpeedInsights();
  });
}

// Re-initialize AOS after route changes
router.afterEach(() => {
  AOS.refresh();
});