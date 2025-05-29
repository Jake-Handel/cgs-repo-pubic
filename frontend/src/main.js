import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

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

// Mount the app
app.mount('#app')