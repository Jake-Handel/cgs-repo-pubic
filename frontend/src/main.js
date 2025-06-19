import { createApp } from 'vue'
import { inject } from '@vercel/analytics';
import { SpeedInsights } from "@vercel/speed-insights/vue"

import App from './App.vue'
import router from './router'
import './assets/main.css'
import VercelAnalytics from './plugins/vercel-analytics'  // Add Vercel Analytics plugin

// Import Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'

// Add icons to the library
library.add(faBookOpen)

const app = createApp(App)

// Register the FontAwesomeIcon component globally
app.component('font-awesome-icon', FontAwesomeIcon)

// Use router
app.use(router)

// Use Vercel Analytics
app.use(VercelAnalytics)

// Mount the app
app.mount('#app')