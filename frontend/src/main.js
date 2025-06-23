import { createApp } from 'vue'
import { inject as injectAnalytics } from '@vercel/analytics';
import { inject as injectSpeedInsights } from '@vercel/speed-insights';
import App from './App.vue'
import router from './router'
import './assets/main.css'

// Import AOS (Animate On Scroll)
import AOS from 'aos'
import 'aos/dist/aos.css'

// Import Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBookOpen, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

// Add icons to the library
library.add(faBookOpen, faEnvelope, faTwitter, faFacebookF, faInstagram, faLinkedinIn)

const app = createApp(App)

// Register the FontAwesomeIcon component globally
app.component('font-awesome-icon', FontAwesomeIcon)

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
})

// Use router
app.use(router)

app.use(injectAnalytics)
app.use(injectSpeedInsights)

// Mount the app
app.mount('#app')

// Re-initialize AOS after route changes
router.afterEach(() => {
  AOS.refresh()
})