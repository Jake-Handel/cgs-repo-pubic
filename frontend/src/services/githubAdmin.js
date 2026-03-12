// GitHub API integration for admin functionality
import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';
const REPO_OWNER = 'Jake-Handel'; // Update with actual repo owner
const REPO_NAME = 'cgs-repo-pubic';
const DATA_FILE_PATH = 'frontend/src/data/opportunities.js';
const PASSWORD_FILE_PATH = 'admin-password.json';

class GitHubAdminService {
  constructor(token) {
    this.token = token;
    this.axios = axios.create({
      baseURL: GITHUB_API_BASE,
      headers: {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }

  // Get current month's password from GitHub
  async getCurrentPassword() {
    try {
      // Check for hardcoded password in environment first (for development/testing)
      if (process.env.VUE_APP_ADMIN_PASSWORD) {
        return process.env.VUE_APP_ADMIN_PASSWORD;
      }

      const response = await this.axios.get(
        `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${PASSWORD_FILE_PATH}`
      );
      
      const content = JSON.parse(atob(response.data.content));
      const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format
      
      if (content.month !== currentMonth) {
        // Generate new password for this month
        const newPassword = this.generateSecurePassword();
        const updatedContent = {
          month: currentMonth,
          password: newPassword
        };
        
        // Update password file
        await this.updateFile(PASSWORD_FILE_PATH, JSON.stringify(updatedContent, null, 2), 'Update monthly admin password');
        return newPassword;
      }
      
      return content.password;
    } catch (error) {
      console.error('Error fetching password:', error);
      // Fallback: generate and store new password
      const newPassword = this.generateSecurePassword();
      const content = {
        month: new Date().toISOString().slice(0, 7),
        password: newPassword
      };
      
      try {
        await this.createFile(PASSWORD_FILE_PATH, JSON.stringify(content, null, 2), 'Create admin password file');
      } catch (createError) {
        console.error('Error creating password file:', createError);
      }
      
      return newPassword;
    }
  }

  // Generate secure random password (12 digits)
  generateSecurePassword() {
    const digits = '0123456789';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return password;
  }

  // Get current opportunities data
  async getOpportunities() {
    try {
      const response = await this.axios.get(
        `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${DATA_FILE_PATH}`
      );
      
      return atob(response.data.content);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
      throw error;
    }
  }

  // Update opportunities data
  async updateOpportunities(newContent, message = 'Update opportunities data') {
    try {
      // Get current file info for SHA
      const currentFile = await this.axios.get(
        `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${DATA_FILE_PATH}`
      );

      // Update file
      const response = await this.axios.put(
        `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${DATA_FILE_PATH}`,
        {
          message: message,
          content: btoa(newContent),
          sha: currentFile.data.sha,
          branch: 'main'
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error updating opportunities:', error);
      throw error;
    }
  }

  // Helper method to create new file
  async createFile(path, content, message) {
    return await this.axios.put(
      `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
      {
        message: message,
        content: btoa(content),
        branch: 'main'
      }
    );
  }

  // Helper method to update existing file
  async updateFile(path, content, message) {
    const currentFile = await this.axios.get(
      `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`
    );

    return await this.axios.put(
      `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
      {
        message: message,
        content: btoa(content),
        sha: currentFile.data.sha,
        branch: 'main'
      }
    );
  }
}

export default GitHubAdminService;
