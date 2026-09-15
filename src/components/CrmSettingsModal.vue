<template>
  <div v-if="store.isSettingsOpen" class="modal-overlay" @click.self="store.isSettingsOpen = false">
    <div class="modal-panel glass-panel">
      <div class="modal-header">
        <div class="modal-title">
          <Settings :size="20" class="icon-violet" />
          <h2>Decoupled API Backend Settings</h2>
        </div>
        <button @click="store.isSettingsOpen = false" class="btn-icon">
          <X :size="18" />
        </button>
      </div>

      <div class="modal-body">
        <p class="description">
          UltimateCRM connects directly to your headless backend via standard REST APIs.
          No backend code changes are required!
        </p>

        <!-- Provider Selection -->
        <div class="form-group">
          <label>Select Active Backend Provider</label>
          <div class="provider-grid">
            <button 
              type="button"
              @click="config.backendType = 'mock'"
              :class="['provider-btn', { active: config.backendType === 'mock' }]"
            >
              <Database :size="18" />
              <span>Interactive Mock</span>
            </button>
            <button 
              type="button"
              @click="config.backendType = 'directus'"
              :class="['provider-btn', { active: config.backendType === 'directus' }]"
            >
              <Layers :size="18" />
              <span>Directus REST API</span>
            </button>
            <button 
              type="button"
              @click="config.backendType = 'frappe'"
              :class="['provider-btn', { active: config.backendType === 'frappe' }]"
            >
              <Box :size="18" />
              <span>Frappe REST API</span>
            </button>
          </div>
        </div>

        <!-- Directus Config -->
        <div v-if="config.backendType === 'directus'" class="config-section">
          <div class="form-group">
            <label>Directus Instance Base URL</label>
            <input 
              v-model="config.directusUrl" 
              type="url" 
              placeholder="e.g. https://directus.mycompany.com" 
              class="input-field"
            />
          </div>
          <div class="form-group">
            <label>Static API Token</label>
            <input 
              v-model="config.directusToken" 
              type="password" 
              placeholder="Directus user token..." 
              class="input-field"
            />
          </div>
        </div>

        <!-- Frappe Config -->
        <div v-if="config.backendType === 'frappe'" class="config-section">
          <div class="form-group">
            <label>Frappe Bench Base URL</label>
            <input 
              v-model="config.frappeUrl" 
              type="url" 
              placeholder="e.g. https://erp.mycompany.com" 
              class="input-field"
            />
          </div>
          <div class="form-group">
            <label>Frappe API Key</label>
            <input 
              v-model="config.frappeApiKey" 
              type="text" 
              placeholder="API Key..." 
              class="input-field"
            />
          </div>
          <div class="form-group">
            <label>Frappe API Secret</label>
            <input 
              v-model="config.frappeApiSecret" 
              type="password" 
              placeholder="API Secret..." 
              class="input-field"
            />
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button @click="store.isSettingsOpen = false" class="btn-secondary">Cancel</button>
        <button @click="save" class="btn-primary">
          <Save :size="16" />
          Save & Connect
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import { useCrmStore } from '@/stores/crmStore';
import { ApiConfig } from '@/types/crm';
import { Settings, X, Database, Layers, Box, Save } from 'lucide-vue-next';

const store = useCrmStore();

const config = reactive<ApiConfig>({ ...store.apiConfig });

watch(() => store.isSettingsOpen, (val) => {
  if (val) {
    Object.assign(config, store.apiConfig);
  }
});

function save() {
  store.saveConfig({ ...config });
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(6px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.modal-panel {
  width: 100%;
  max-width: 540px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.modal-title h2 {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-main);
}

.icon-violet { color: var(--accent-primary); }

.modal-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.description {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.4;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-main);
}

.provider-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.provider-btn {
  background: rgba(11, 15, 23, 0.6);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 0.85rem 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.75rem;
  font-weight: 600;
}

.provider-btn.active {
  background: rgba(99, 102, 241, 0.15);
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  box-shadow: 0 0 16px -4px rgba(99, 102, 241, 0.4);
}

.config-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: rgba(11, 15, 23, 0.4);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
}

.modal-footer {
  padding: 1.25rem 1.5rem;
  border-top: 1px solid var(--border-subtle);
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}
</style>
