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
          title: 'Fizz Buzz',
          description: 'Print Fizz Buzz numbers 1-100',
          fullDescription: 'Print numbers 1 to 100 to serial, but print "Fizz" for multiples of 3, "Buzz" for multiples of 5, and "FizzBuzz" for multiples of both.',
          difficulty: 'Easy',
          points: 10,
          bestScore: 95,
          solvedBy: 456,
          example: '1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz...',
          constraints: [
            'Must use Serial.begin()',
            'Must print each number/word on separate line',
            'Range: 1 to 100'
          ]
        },
        {
          id: 2,
          title: 'Fibonacci',
          description: 'Print first 20 Fibonacci numbers',
          fullDescription: 'Print the first 20 numbers of the Fibonacci sequence (starting with 0, 1) to serial. Each number on a new line.',
          difficulty: 'Easy',
          points: 15,
          bestScore: 78,
          solvedBy: 389,
          example: '0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181',
          constraints: [
            'Must use Serial.begin()',
            'Start with 0, 1',
            'Print exactly 20 numbers'
          ]
        },
        {
          id: 3,
          title: 'Prime Numbers',
          description: 'Print first 15 prime numbers',
          fullDescription: 'Print the first 15 prime numbers to serial. Each number on a new line.',
          difficulty: 'Medium',
          points: 20,
          bestScore: 112,
          solvedBy: 267,
          example: '2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47',
          constraints: [
            'Must use Serial.begin()',
            'Print exactly 15 prime numbers',
            'Start from 2'
          ]
        },
        {
          id: 4,
          title: 'Reverse String',
          description: 'Reverse a hardcoded string',
          fullDescription: 'Reverse the string "Hello World" and print it to serial. Output should be "dlroW olleH".',
          difficulty: 'Easy',
          points: 10,
          bestScore: 62,
          solvedBy: 521,
          example: 'Input: "Hello World" -> Output: "dlroW olleH"',
          constraints: [
            'Must use Serial.begin()',
            'Hardcode the string "Hello World"',
            'Print reversed string'
          ]
        },
        {
          id: 5,
          title: 'ASCII Table',
          description: 'Print ASCII characters 32-126',
          fullDescription: 'Print printable ASCII characters (32 to 126) to serial. Show each character with its decimal value.',
          difficulty: 'Medium',
          points: 25,
          bestScore: 88,
          solvedBy: 198,
          example: '32: space, 33: !, 34: ", 35: #, ... 126: ~',
          constraints: [
            'Must use Serial.begin()',
            'Range: 32 to 126',
            'Format: "decimal: character"'
          ]
        },
        {
          id: 6,
          title: 'Factorial',
          description: 'Print factorials 1-10',
          fullDescription: 'Print factorials of numbers 1 to 10 to serial. Each on a new line (e.g., "1! = 1").',
          difficulty: 'Medium',
          points: 20,
          bestScore: 85,
          solvedBy: 234,
          example: '1! = 1, 2! = 2, 3! = 6, 4! = 24, 5! = 120, 6! = 720, 7! = 5040, 8! = 40320, 9! = 362880, 10! = 3628800',
          constraints: [
            'Must use Serial.begin()',
            'Range: 1 to 10',
            'Format: "n! = result"'
          ]
        },
        {
          id: 7,
          title: 'Palindrome Check',
          description: 'Check if string is palindrome',
          fullDescription: 'Check if the string "racecar" is a palindrome and print "true" or "false" to serial.',
          difficulty: 'Easy',
          points: 15,
          bestScore: 72,
          solvedBy: 312,
          example: 'Input: "racecar" -> Output: "true"',
          constraints: [
            'Must use Serial.begin()',
            'Hardcode the string "racecar"',
            'Print "true" or "false"'
          ]
        },
        {
          id: 8,
          title: 'Sum Array',
          description: 'Sum numbers in array',
          fullDescription: 'Create an array with numbers 1-10 and print their sum to serial.',
          difficulty: 'Easy',
          points: 10,
          bestScore: 58,
          solvedBy: 445,
          example: 'Array: [1,2,3,4,5,6,7,8,9,10] -> Sum: 55',
          constraints: [
            'Must use Serial.begin()',
            'Array must contain 1-10',
            'Print the sum'
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
