<template>
  <header class="header glass-panel">
    <div class="header-left">
      <div class="logo">
        <div class="logo-icon">
          <Layers class="icon-violet" />
        </div>
        <div class="logo-text">
          <h1>Ultimate<span>CRM</span></h1>
          <span class="logo-subtitle">Decoupled Vue 3 & TypeScript</span>
        </div>
      </div>

      <div class="backend-badge" :class="backendClass">
        <span class="dot"></span>
        {{ store.apiConfig.backendType.toUpperCase() }} MODE
      </div>
    </div>

    <div class="header-center">
      <div class="search-box">
        <Search class="search-icon" />
        <input 
          type="text" 
          v-model="store.searchQuery"
          placeholder="Search leads, companies, or emails..."
          class="input-field search-input"
        />
      </div>

      <select v-model="store.selectedStageFilter" class="input-field stage-select">
        <option value="all">All Pipeline Stages</option>
        <option value="Lead">Stage: Lead</option>
        <option value="Qualified">Stage: Qualified</option>
        <option value="Proposal">Stage: Proposal</option>
        <option value="Negotiation">Stage: Negotiation</option>
        <option value="Closed Won">Stage: Closed Won</option>
        <option value="Closed Lost">Stage: Closed Lost</option>
      </select>
    </div>

    <div class="header-right">
      <div class="view-toggle">
        <button 
          @click="store.viewMode = 'kanban'" 
          :class="['toggle-btn', { active: store.viewMode === 'kanban' }]"
          title="Kanban Board View"
        >
          <Kanban :size="18" />
        </button>
        <button 
          @click="store.viewMode = 'table'" 
          :class="['toggle-btn', { active: store.viewMode === 'table' }]"
          title="Table Contacts View"
        >
          <Table :size="18" />
        </button>
      </div>

      <button @click="store.isNewLeadOpen = true" class="btn-primary">
        <Plus :size="18" />
        New Deal
      </button>

      <button @click="store.isSettingsOpen = true" class="btn-icon" title="API Settings">
        <Settings :size="18" />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCrmStore } from '@/stores/crmStore';
import { Layers, Search, Kanban, Table, Plus, Settings } from 'lucide-vue-next';

const store = useCrmStore();

const backendClass = computed(() => {
  if (store.apiConfig.backendType === 'directus') return 'backend-directus';
  if (store.apiConfig.backendType === 'frappe') return 'backend-frappe';
  return 'backend-mock';
});
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.5rem;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
  border: 1px solid var(--border-glow);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-violet {
  color: var(--accent-primary);
}

.logo-text h1 {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.1;
  color: var(--text-main);
  letter-spacing: -0.02em;
}

.logo-text h1 span {
  color: var(--accent-primary);
}

.logo-subtitle {
  font-size: 0.7rem;
  color: var(--text-subtle);
  font-weight: 500;
}

.backend-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  border: 1px solid var(--border-subtle);
}

.backend-badge .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.backend-mock {
  background: rgba(6, 182, 212, 0.1);
  color: #38bdf8;
  border-color: rgba(6, 182, 212, 0.3);
}
.backend-mock .dot { background: #38bdf8; }

.backend-directus {
  background: rgba(139, 92, 246, 0.1);
  color: #c084fc;
  border-color: rgba(139, 92, 246, 0.3);
}
.backend-directus .dot { background: #c084fc; }

.backend-frappe {
  background: rgba(16, 185, 129, 0.1);
  color: #34d399;
  border-color: rgba(16, 185, 129, 0.3);
}
.backend-frappe .dot { background: #34d399; }

.header-center {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  max-width: 550px;
}

.search-box {
  position: relative;
  flex: 1;
}

.search-icon {
  position: absolute;
  left: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-subtle);
  width: 16px;
  height: 16px;
}

.search-input {
  padding-left: 2.3rem;
}

.stage-select {
  width: 180px;
  background-color: rgba(11, 15, 23, 0.6);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.view-toggle {
  display: flex;
  background: rgba(11, 15, 23, 0.6);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 3px;
}

.toggle-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  padding: 0.4rem 0.6rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.toggle-btn.active {
  background: var(--accent-primary);
  color: #ffffff;
}
</style>
