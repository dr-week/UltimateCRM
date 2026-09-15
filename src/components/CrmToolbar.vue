<template>
  <header class="crm-toolbar">
    <div class="toolbar-left">
      <div class="breadcrumbs">
        <span class="bc-root">UltimateCRM</span>
        <span class="bc-sep">/</span>
        <span class="bc-active">{{ currentTitle }}</span>
      </div>

      <div class="quick-filters">
        <select v-model="store.selectedStageFilter" class="toolbar-select">
          <option value="all">All Stages</option>
          <option value="Lead">New Lead</option>
          <option value="Qualified">Qualified</option>
          <option value="Proposal">Proposal</option>
          <option value="Negotiation">Negotiation</option>
          <option value="Closed Won">Closed Won</option>
          <option value="Closed Lost">Closed Lost</option>
        </select>
      </div>
    </div>

    <div class="toolbar-right">
      <div class="search-box">
        <Search :size="14" class="search-icon" />
        <input 
          v-model="store.searchQuery" 
          type="text" 
          placeholder="Filter deals, contacts ( / )..." 
          class="toolbar-search"
        />
      </div>

      <div class="view-toggle-btns">
        <button 
          class="btn-toggle" 
          :class="{ active: store.viewMode === 'kanban' }"
          @click="store.viewMode = 'kanban'; store.activeNav = 'kanban'"
          title="Kanban Board"
        >
          <Kanban :size="15" />
        </button>
        <button 
          class="btn-toggle" 
          :class="{ active: store.viewMode === 'table' }"
          @click="store.viewMode = 'table'; store.activeNav = 'kanban'"
          title="Table View"
        >
          <Table :size="15" />
        </button>
      </div>

      <button @click="store.fetchLeads" class="btn-icon-secondary" title="Refresh Live Data">
        <RefreshCw :size="14" :class="{ spinning: store.isLoading }" />
      </button>

      <button @click="store.isNewLeadOpen = true" class="btn-primary-create">
        <Plus :size="15" />
        <span>+ Create Deal</span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCrmStore } from '@/stores/crmStore';
import { Search, Kanban, Table, RefreshCw, Plus } from 'lucide-vue-next';

const store = useCrmStore();

const currentTitle = computed(() => {
  switch (store.activeNav) {
    case 'dashboard': return 'Executive Analytics Dashboard';
    case 'leads': return 'Inbound Leads Directory';
    case 'kanban': return `Deals Pipeline (${store.viewMode === 'kanban' ? 'Kanban' : 'Table'})`;
    case 'contacts': return 'Contacts & Organizations';
    case 'tasks': return 'Tasks & Notes Timeline';
    case 'calls': return 'Call Logs & Activity History';
    default: return 'Deals Pipeline';
  }
});
</script>

<style scoped>
.crm-toolbar { height: 56px; padding: 0 1.25rem; background: var(--bg-surface); border-bottom: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
.toolbar-left { display: flex; align-items: center; gap: 1.25rem; }
.breadcrumbs { display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; font-weight: 500; }
.bc-root { color: var(--text-subtle); }
.bc-sep { color: var(--border-subtle); }
.bc-active { color: var(--text-main); font-weight: 700; }
.quick-filters { display: flex; gap: 0.5rem; }
.toolbar-select { background: rgba(255,255,255,0.04); border: 1px solid var(--border-subtle); border-radius: 6px; color: var(--text-muted); font-size: 0.78rem; padding: 0.35rem 0.6rem; cursor: pointer; }
.toolbar-right { display: flex; align-items: center; gap: 0.75rem; }
.search-box { position: relative; display: flex; align-items: center; }
.search-icon { position: absolute; left: 0.6rem; color: var(--text-subtle); }
.toolbar-search { background: rgba(255,255,255,0.04); border: 1px solid var(--border-subtle); border-radius: 6px; padding: 0.35rem 0.6rem 0.35rem 2rem; font-size: 0.78rem; color: var(--text-main); width: 220px; transition: width 0.2s ease; }
.toolbar-search:focus { width: 280px; outline: none; border-color: var(--accent-primary); }
.view-toggle-btns { display: flex; background: rgba(255,255,255,0.04); border-radius: 6px; padding: 2px; border: 1px solid var(--border-subtle); }
.btn-toggle { background: transparent; border: none; color: var(--text-subtle); padding: 0.3rem 0.5rem; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.btn-toggle.active { background: var(--accent-primary); color: #fff; }
.btn-icon-secondary { background: rgba(255,255,255,0.04); border: 1px solid var(--border-subtle); color: var(--text-muted); padding: 0.4rem; border-radius: 6px; cursor: pointer; display: flex; align-items: center; }
.btn-icon-secondary:hover { color: var(--text-main); border-color: rgba(255,255,255,0.2); }
.spinning { animation: spin 1s linear infinite; }
@keyframes spin { 100% { transform: rotate(360deg); } }
.btn-primary-create { background: linear-gradient(135deg, var(--accent-primary), #8b5cf6); border: none; color: #fff; font-size: 0.8rem; font-weight: 600; padding: 0.45rem 0.9rem; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25); }
.btn-primary-create:hover { opacity: 0.92; transform: translateY(-1px); }
</style>
