<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <header class="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div class="container mx-auto px-4 py-3">
        <div class="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between">
          <router-link to="/" class="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent hover:from-teal-700 hover:to-blue-700 transition-all duration-500 whitespace-nowrap">Student Opportunities</router-link>

          <div class="flex space-x-4">
            <router-link 
              to="/" 
              class="px-4 py-2 rounded-lg text-gray-700 hover:bg-white hover:shadow-md transition-all duration-200"
              :class="{ 'bg-white shadow-md': $route.path === '/' }"
            >
              Home
            </router-link>
            <router-link 
              to="/opportunities" 
              class="px-4 py-2 rounded-lg text-gray-700 hover:bg-white hover:shadow-md transition-all duration-200"
              :class="{ 'bg-white shadow-md': $route.path === '/opportunities' }"
            >
              Opportunities
            </router-link>
            <router-link 
              to="/code-golf" 
              class="px-4 py-2 rounded-lg bg-gradient-to-r from-teal-600 to-blue-600 text-white shadow-md transition-all duration-200"
            >
              Code Golf
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <!-- Hero Section -->
      <section class="py-12 md:py-16 relative overflow-hidden">
        <div class="absolute inset-0 -z-10">
          <div class="absolute top-1/4 -left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div class="absolute top-1/2 -right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div class="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div class="relative text-center">
          <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">
              Arduino C Code Golf
            </span>
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Write the shortest Arduino C code to solve these challenges. Test your optimization skills!
          </p>
        </div>
      </section>

      <!-- Challenges Grid -->
      <section class="py-8">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="challenge in challenges" 
            :key="challenge.id"
            class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
            @click="selectChallenge(challenge)"
            :class="{ 'ring-2 ring-teal-500': selectedChallenge && selectedChallenge.id === challenge.id }"
          >
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <span 
                  class="px-3 py-1 rounded-full text-sm font-medium"
                  :class="getDifficultyClass(challenge.difficulty)"
                >
                  {{ challenge.difficulty }}
                </span>
                <span class="text-sm text-gray-500">{{ challenge.points }} pts</span>
              </div>
              
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ challenge.title }}</h3>
              <p class="text-gray-600 mb-4">{{ challenge.description }}</p>
              
              <div class="flex items-center justify-between text-sm text-gray-500">
                <span>🏆 Best: {{ challenge.bestScore }} chars</span>
                <span v-if="challenge.solvedBy" class="text-teal-600">{{ challenge.solvedBy }} solved</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Code Editor Section -->
      <section v-if="selectedChallenge" class="py-8">
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900">{{ selectedChallenge.title }}</h2>
            <button 
              @click="selectedChallenge = null"
              class="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="mb-6">
            <h3 class="font-semibold text-gray-900 mb-2">Challenge:</h3>
            <p class="text-gray-700">{{ selectedChallenge.fullDescription }}</p>
            
            <div v-if="selectedChallenge.example" class="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 class="font-semibold text-gray-900 mb-2">Example:</h4>
              <pre class="text-sm text-gray-700 whitespace-pre-wrap">{{ selectedChallenge.example }}</pre>
            </div>

            <div v-if="selectedChallenge.constraints" class="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 class="font-semibold text-yellow-800 mb-2">Constraints:</h4>
              <ul class="text-sm text-yellow-700 list-disc list-inside">
                <li v-for="constraint in selectedChallenge.constraints" :key="constraint">{{ constraint }}</li>
              </ul>
            </div>
          </div>

          <div class="mb-6">
            <h3 class="font-semibold text-gray-900 mb-2">Your Solution (Arduino C):</h3>
            <textarea
              v-model="userCode"
              class="w-full h-64 p-4 font-mono text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50"
              placeholder="// Write your Arduino C code here..."
              spellcheck="false"
            ></textarea>
            <div class="flex items-center justify-between mt-2">
              <span class="text-sm text-gray-500">Character count: {{ userCode.length }}</span>
              <span 
                v-if="userCode.length > 0"
                class="text-sm"
                :class="userCode.length < selectedChallenge.bestScore ? 'text-green-600' : 'text-gray-500'"
              >
                {{ userCode.length < selectedChallenge.bestScore ? '🎉 New record!' : `Target: ${selectedChallenge.bestScore}` }}
              </span>
            </div>
          </div>

          <div class="flex gap-4">
            <button 
              @click="submitSolution"
              class="px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl hover:from-teal-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Submit Solution
            </button>
            <button 
              @click="resetCode"
              class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300"
            >
              Reset
            </button>
          </div>

          <!-- Result Section -->
          <div v-if="submissionResult" class="mt-6 p-4 rounded-lg" :class="submissionResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'">
            <h4 class="font-semibold mb-2" :class="submissionResult.success ? 'text-green-800' : 'text-red-800'">
              {{ submissionResult.success ? '✅ Success!' : '❌ Try Again' }}
            </h4>
            <p class="text-sm" :class="submissionResult.success ? 'text-green-700' : 'text-red-700'">
              {{ submissionResult.message }}
            </p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'CodeGolfChallenges',
  data() {
    return {
      selectedChallenge: null,
      userCode: '',
      submissionResult: null,
      challenges: [
        {
          id: 1,
          title: 'Blink LED',
          description: 'Make an LED blink on pin 13',
          fullDescription: 'Write the shortest Arduino C code that will make the built-in LED (pin 13) blink once per second. The LED should turn on for 500ms, then off for 500ms, repeating indefinitely.',
          difficulty: 'Easy',
          points: 10,
          bestScore: 67,
          solvedBy: 234,
          example: 'LED on (500ms) -> LED off (500ms) -> repeat...',
          constraints: [
            'Must use pinMode() and digitalWrite()',
            'Must use delay() for timing',
            'Code must run in loop() function'
          ]
        },
        {
          id: 2,
          title: 'Button Counter',
          description: 'Count button presses on pin 2',
          fullDescription: 'Write the shortest Arduino C code that counts how many times a button connected to pin 2 is pressed. Send the count to serial monitor each time it changes. Use internal pull-up resistor.',
          difficulty: 'Medium',
          points: 25,
          bestScore: 142,
          solvedBy: 156,
          example: 'Button press -> Serial.print(count) -> count++',
          constraints: [
            'Must use INPUT_PULLUP',
            'Must detect button press (not hold)',
            'Must use Serial.begin()',
            'Debouncing not required for this challenge'
          ]
        },
        {
          id: 3,
          title: 'PWM Fade',
          description: 'Fade an LED using PWM on pin 9',
          fullDescription: 'Write the shortest Arduino C code that fades an LED connected to pin 9 from off to fully on and back to off continuously. Use analogWrite() for PWM control.',
          difficulty: 'Medium',
          points: 20,
          bestScore: 98,
          solvedBy: 189,
          example: '0 → 255 → 0 (fade) → repeat',
          constraints: [
            'Must use analogWrite()',
            'Must create smooth fade effect',
            'Use delay() for timing'
          ]
        },
        {
          id: 4,
          title: 'Serial Echo',
          description: 'Echo back serial input',
          fullDescription: 'Write the shortest Arduino C code that reads characters from serial and echoes them back. If "HELLO" is sent, "HELLO" should be received back.',
          difficulty: 'Easy',
          points: 15,
          bestScore: 54,
          solvedBy: 312,
          example: 'Input: "HELLO" -> Output: "HELLO"',
          constraints: [
            'Must use Serial.available()',
            'Must use Serial.read()',
            'Must use Serial.write() or Serial.print()'
          ]
        },
        {
          id: 5,
          title: 'Temperature Alert',
          description: 'Alert if analog reading > threshold',
          fullDescription: 'Write the shortest Arduino C code that reads analog pin A0 and turns on the built-in LED if the reading is above 512 (half of 1023). The LED should turn off when below threshold.',
          difficulty: 'Medium',
          points: 30,
          bestScore: 87,
          solvedBy: 145,
          example: 'A0 > 512 -> LED ON, else LED OFF',
          constraints: [
            'Must use analogRead()',
            'Must use digitalWrite() for LED',
            'Continuous monitoring in loop()'
          ]
        },
        {
          id: 6,
          title: 'Morse Code SOS',
          description: 'Blink SOS in Morse code',
          fullDescription: 'Write the shortest Arduino C code that blinks "SOS" in Morse code on the built-in LED. S = 3 short dots, O = 3 long dashes. Dot = 200ms, Dash = 600ms, gap between letters = 200ms.',
          difficulty: 'Hard',
          points: 50,
          bestScore: 178,
          solvedBy: 67,
          example: '... --- ... (repeat)',
          constraints: [
            'Must follow Morse timing correctly',
            'Must repeat SOS continuously',
            'Dot = 200ms on, 200ms off',
            'Dash = 600ms on, 200ms off',
            'Letter gap = 600ms off'
          ]
        }
      ]
    }
  },
  methods: {
    selectChallenge(challenge) {
      this.selectedChallenge = challenge;
      this.userCode = '';
      this.submissionResult = null;
    },
    getDifficultyClass(difficulty) {
      switch(difficulty) {
        case 'Easy':
          return 'bg-green-100 text-green-700';
        case 'Medium':
          return 'bg-yellow-100 text-yellow-700';
        case 'Hard':
          return 'bg-red-100 text-red-700';
        default:
          return 'bg-gray-100 text-gray-700';
      }
    },
    submitSolution() {
      // Simulate submission validation
      // In a real app, this would send to a backend for validation
      const charCount = this.userCode.length;
      const isValid = this.userCode.trim().length > 0;
      
      if (!isValid) {
        this.submissionResult = {
          success: false,
          message: 'Please enter some code before submitting.'
        };
        return;
      }

      // Simulate validation (in real app, this would compile and test the code)
      const containsRequired = this.checkRequiredFunctions(this.userCode);
      
      if (containsRequired) {
        this.submissionResult = {
          success: true,
          message: `Solution submitted! Character count: ${charCount}. ${charCount < this.selectedChallenge.bestScore ? 'New record! 🎉' : ''}`
        };
        
        // Update best score if better
        if (charCount < this.selectedChallenge.bestScore) {
          this.selectedChallenge.bestScore = charCount;
          this.selectedChallenge.solvedBy++;
        } else {
          this.selectedChallenge.solvedBy++;
        }
      } else {
        this.submissionResult = {
          success: false,
          message: 'Code appears to be missing required Arduino functions. Please check your solution.'
        };
      }
    },
    checkRequiredFunctions(code) {
      // Basic validation - check for common Arduino functions
      const arduinoFunctions = ['setup', 'loop', 'pinMode', 'digitalWrite', 'delay', 'analogRead', 'analogWrite', 'Serial'];
      return arduinoFunctions.some(func => code.toLowerCase().includes(func.toLowerCase()));
    },
    resetCode() {
      this.userCode = '';
      this.submissionResult = null;
    }
  }
}
</script>

<style scoped>
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

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
