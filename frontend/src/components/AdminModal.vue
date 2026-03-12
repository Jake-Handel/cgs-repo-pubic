<template>
  <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeModal"></div>

      <!-- Modal panel -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
        <!-- Password entry screen -->
        <div v-if="!isAuthenticated" class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Admin Authentication</h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">Enter the admin password to access editing controls.</p>
                <p class="text-xs text-gray-400 mt-1">Password changes monthly automatically.</p>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <input
              v-model="passwordInput"
              type="password"
              placeholder="Enter 12-digit password"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              @keypress.enter="authenticate"
            />
            <div v-if="passwordError" class="mt-2 text-sm text-red-600">{{ passwordError }}</div>
          </div>
          <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              @click="authenticate"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Authenticate
            </button>
            <button
              @click="closeModal"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>

        <!-- Admin interface -->
        <div v-else class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Admin Panel</h3>
            <button
              @click="closeModal"
              class="text-gray-400 hover:text-gray-500"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Tabs -->
          <div class="border-b border-gray-200">
            <nav class="-mb-px flex space-x-8">
              <button
                @click="activeTab = 'edit'"
                :class="activeTab === 'edit' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
              >
                Edit Opportunities
              </button>
              <button
                @click="activeTab = 'add'"
                :class="activeTab === 'add' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
              >
                Add New
              </button>
            </nav>
          </div>

          <!-- Edit Opportunities Tab -->
          <div v-if="activeTab === 'edit'" class="mt-6">
            <div v-if="!editingOpportunity" class="mb-4">
              <input
                v-model="searchTerm"
                type="text"
                placeholder="Search opportunities..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div class="max-h-96 overflow-y-auto space-y-2">
              <div
                v-for="opportunity in filteredOpportunities"
                :key="opportunity.id"
                class="border rounded-lg p-3 hover:bg-gray-50"
              >
                <div class="flex items-center justify-between">
                  <div class="flex-1">
                    <h4 class="font-medium text-gray-900">{{ opportunity.title }}</h4>
                    <p class="text-sm text-gray-500">{{ opportunity.type }} - {{ opportunity.audience }}</p>
                  </div>
                  <div class="flex space-x-2">
                    <button
                      @click="editOpportunity(opportunity)"
                      class="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      @click="deleteOpportunity(opportunity.id)"
                      class="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Edit Form -->
            <div v-if="editingOpportunity" class="border-t pt-4">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Edit Opportunity</h3>
              <div class="space-y-4">
              <div class="mb-4">
                <input
                  v-model="editingOpportunity.title"
                  type="text"
                  placeholder="Title"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Type</label>
                  <input
                    v-model="editingOpportunity.type"
                    type="text"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Audience</label>
                  <input
                    v-model="editingOpportunity.audience"
                    type="text"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Cost</label>
                  <input
                    v-model="editingOpportunity.cost"
                    type="text"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    v-model="editingOpportunity.location"
                    type="text"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    v-model="editingOpportunity.date"
                    type="text"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Application</label>
                  <input
                    v-model="editingOpportunity.application"
                    type="text"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Application Link</label>
                <input
                  v-model="editingOpportunity.applicationLink"
                  type="url"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Image filename (with extension)</label>
                <input
                  v-model="editingOpportunity.image"
                  type="text"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Categories (comma-separated)</label>
                <input
                  v-model="categoriesInput"
                  type="text"
                  placeholder="e.g., 1, 3, 5"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div class="flex justify-end space-x-3">
                <button
                  @click="cancelEdit"
                  type="button"
                  class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  @click="updateExistingOpportunity"
                  :disabled="isSaving"
                  type="button"
                  class="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50"
                >
                  {{ isSaving ? 'Saving...' : 'Update Opportunity' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Add New Opportunity Tab -->
          <div v-if="activeTab === 'add'" class="mt-6">
            <form @submit.prevent="addNewOpportunity" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Title</label>
                <input
                  v-model="newOpportunity.title"
                  type="text"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Type</label>
                  <input
                    v-model="newOpportunity.type"
                    type="text"
                    required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Audience</label>
                  <input
                    v-model="newOpportunity.audience"
                    type="text"
                    required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Cost</label>
                  <input
                    v-model="newOpportunity.cost"
                    type="text"
                    required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    v-model="newOpportunity.location"
                    type="text"
                    required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    v-model="newOpportunity.date"
                    type="text"
                    required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Application</label>
                  <input
                    v-model="newOpportunity.application"
                    type="text"
                    required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Application Link</label>
                <input
                  v-model="newOpportunity.applicationLink"
                  type="url"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Image filename (with extension)</label>
                <input
                  v-model="newOpportunity.image"
                  type="text"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Categories (comma-separated)</label>
                <input
                  v-model="categoriesInput"
                  type="text"
                  placeholder="e.g., 1, 3, 5"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div class="flex justify-end space-x-3">
                <button
                  type="button"
                  @click="resetForm"
                  class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  :disabled="isSaving"
                  class="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50"
                >
                  {{ isSaving ? 'Saving...' : 'Add Opportunity' }}
                </button>
              </div>
            </form>
          </div>

          <!-- Status Messages -->
          <div v-if="statusMessage" :class="statusType === 'success' ? 'text-green-600' : 'text-red-600'" class="mt-4 text-sm">
            {{ statusMessage }}
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import GitHubAdminService from '../services/githubAdmin.js';

export default {
  name: 'AdminModal',
  props: {
    showModal: Boolean,
    opportunities: Array
  },
  emits: ['close', 'opportunities-updated'],
  data() {
    return {
      isAuthenticated: false,
      passwordInput: '',
      passwordError: '',
      activeTab: 'edit',
      searchTerm: '',
      isSaving: false,
      statusMessage: '',
      statusType: 'success',
      githubService: null,
      editingOpportunity: null,
      newOpportunity: {
        id: 0,
        title: '',
        image: '',
        type: '',
        audience: '',
        cost: '',
        date: '',
        datenum: 0,
        location: '',
        application: '',
        applicationLink: '',
        categories: []
      },
      categoriesInput: ''
    };
  },
  computed: {
    filteredOpportunities() {
      if (!this.searchTerm) return this.opportunities;
      return this.opportunities.filter(opp => 
        opp.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        opp.type.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    filteredOpportunitiesEditTab() {
      if (!this.searchTerm) return this.opportunities;
      return this.opportunities.filter(opp => 
        opp.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        opp.type.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  },
  methods: {
    async authenticate() {
      if (!this.passwordInput) {
        this.passwordError = 'Please enter a password';
        return;
      }

      try {
        // Get GitHub token from environment or localStorage
        const githubToken = process.env.VUE_APP_GITHUB_TOKEN || localStorage.getItem('github_admin_token');
        if (!githubToken) {
          this.passwordError = 'GitHub token not configured';
          return;
        }

        this.githubService = new GitHubAdminService(githubToken);
        const currentPassword = await this.githubService.getCurrentPassword();

        if (this.passwordInput === currentPassword) {
          this.isAuthenticated = true;
          this.passwordError = '';
        } else {
          this.passwordError = 'Invalid password';
        }
      } catch (error) {
        console.error('Authentication error:', error);
        this.passwordError = 'Authentication failed';
      }
    },
    closeModal() {
      this.isAuthenticated = false;
      this.passwordInput = '';
      this.passwordError = '';
      this.activeTab = 'edit';
      this.$emit('close');
    },
    async addNewOpportunity() {
      if (!this.githubService) return;

      this.isSaving = true;
      this.statusMessage = '';

      try {
        // Parse categories
        this.newOpportunity.categories = this.categoriesInput.split(',').map(cat => cat.trim()).filter(cat => cat);
        
        // Generate new ID
        const maxId = Math.max(...this.opportunities.map(opp => opp.id), 0);
        this.newOpportunity.id = maxId + 1;
        
        // Convert date to number for sorting
        this.newOpportunity.datenum = new Date(this.newOpportunity.date).getTime();

        // Get current opportunities content
        const currentContent = await this.githubService.getOpportunities();
        
        // Parse and update opportunities
        const updatedContent = this.updateOpportunitiesFile(currentContent, this.newOpportunity, 'add');
        
        // Save to GitHub
        await this.githubService.updateOpportunities(updatedContent, `Add new opportunity: ${this.newOpportunity.title}`);
        
        this.statusMessage = 'Opportunity added successfully!';
        this.statusType = 'success';
        this.resetForm();
        
        // Emit update to parent
        this.$emit('opportunities-updated');
        
      } catch (error) {
        console.error('Error adding opportunity:', error);
        this.statusMessage = 'Error adding opportunity: ' + error.message;
        this.statusType = 'error';
      } finally {
        this.isSaving = false;
      }
    },
    async deleteOpportunity(id) {
      if (!confirm('Are you sure you want to delete this opportunity?')) return;
      
      if (!this.githubService) return;

      try {
        const currentContent = await this.githubService.getOpportunities();
        const updatedContent = this.updateOpportunitiesFile(currentContent, { id }, 'delete');
        
        await this.githubService.updateOpportunities(updatedContent, `Delete opportunity ID: ${id}`);
        
        this.statusMessage = 'Opportunity deleted successfully!';
        this.statusType = 'success';
        
        this.$emit('opportunities-updated');
        
      } catch (error) {
        console.error('Error deleting opportunity:', error);
        this.statusMessage = 'Error deleting opportunity: ' + error.message;
        this.statusType = 'error';
      }
    },
    editOpportunity(opportunity) {
      this.editingOpportunity = { ...opportunity };
      this.categoriesInput = opportunity.categories ? opportunity.categories.join(', ') : '';
      this.activeTab = 'edit';
    },
    cancelEdit() {
      this.editingOpportunity = null;
      this.categoriesInput = '';
    },
    async updateExistingOpportunity() {
      if (!this.githubService) return;

      this.isSaving = true;
      this.statusMessage = '';

      try {
        // Parse categories
        this.editingOpportunity.categories = this.categoriesInput 
          ? this.categoriesInput.split(',').map(cat => cat.trim()).filter(cat => cat)
          : [];
        
        // Convert date to number for sorting
        this.editingOpportunity.datenum = new Date(this.editingOpportunity.date).getTime();

        // Get current opportunities content
        const currentContent = await this.githubService.getOpportunities();
        
        // Update opportunities
        const updatedContent = this.updateOpportunitiesFile(currentContent, this.editingOpportunity, 'edit');
        
        // Save to GitHub
        await this.githubService.updateOpportunities(updatedContent, `Update opportunity: ${this.editingOpportunity.title}`);
        
        this.statusMessage = 'Opportunity updated successfully!';
        this.statusType = 'success';
        this.editingOpportunity = null;
        this.categoriesInput = '';
        
        // Emit update to parent
        this.$emit('opportunities-updated');
        
      } catch (error) {
        console.error('Error updating opportunity:', error);
        this.statusMessage = 'Error updating opportunity: ' + error.message;
        this.statusType = 'error';
      } finally {
        this.isSaving = false;
      }
    },
    resetForm() {
      this.newOpportunity = {
        id: 0,
        title: '',
        image: '',
        type: '',
        audience: '',
        cost: '',
        date: '',
        datenum: 0,
        location: '',
        application: '',
        applicationLink: '',
        categories: []
      };
      this.categoriesInput = '';
    },
    updateOpportunitiesFile(content, opportunity, action) {
      // Find the opportunities array
      const lines = content.split('\n');
      let opportunitiesStart = -1;
      let opportunitiesEnd = -1;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.includes('export const opportunities = [')) {
          opportunitiesStart = i;
        }
        if (opportunitiesStart !== -1 && line.includes('];')) {
          opportunitiesEnd = i;
          break;
        }
      }
      
      if (opportunitiesStart === -1 || opportunitiesEnd === -1) {
        throw new Error('Could not find opportunities array in file');
      }
      
      // Extract current opportunities array content
      const arrayContent = lines.slice(opportunitiesStart + 1, opportunitiesEnd).join('\n');
      
      // Parse current opportunities (simple approach - evaluate the array content)
      let currentOpportunities = [];
      try {
        // Create a safe evaluation context
        const arrayString = '[' + arrayContent + ']';
        currentOpportunities = eval(arrayString);
      } catch (error) {
        console.error('Error parsing opportunities:', error);
        throw new Error('Failed to parse current opportunities');
      }
      
      // Update opportunities based on action
      if (action === 'add') {
        currentOpportunities.push(opportunity);
      } else if (action === 'delete') {
        currentOpportunities = currentOpportunities.filter(opp => opp.id !== opportunity.id);
      } else if (action === 'edit') {
        const index = currentOpportunities.findIndex(opp => opp.id === opportunity.id);
        if (index !== -1) {
          currentOpportunities[index] = opportunity;
        }
      }
      
      // Sort by ID
      currentOpportunities.sort((a, b) => a.id - b.id);
      
      // Generate new array content
      const newArrayContent = currentOpportunities.map(opp => {
        return `  {
    id: ${opp.id},
    title: '${opp.title.replace(/'/g, "\\'")}',
    image: '${opp.image}',
    type: '${opp.type.replace(/'/g, "\\'")}',
    audience: '${opp.audience.replace(/'/g, "\\'")}',
    cost: '${opp.cost.replace(/'/g, "\\'")}',
    date: '${opp.date}',
    datenum: ${opp.datenum},
    location: '${opp.location.replace(/'/g, "\\'")}',
    application: '${opp.application.replace(/'/g, "\\'")}',
    applicationLink: '${opp.applicationLink}',
    categories: [${opp.categories.map(cat => `'${cat}'`).join(', ')}]
  }`;
      }).join(',\n');
      
      // Reconstruct the file
      const newLines = [...lines];
      newLines.splice(opportunitiesStart, opportunitiesEnd - opportunitiesStart + 1, 
        'export const opportunities = [',
        newArrayContent,
        '];'
      );
      
      return newLines.join('\n');
    }
  }
};
</script>
