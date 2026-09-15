<template>
  <div class="toolbar-actions">
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
</template>

<script setup lang="ts">
import { useCrmStore } from '@/stores/crmStore';
import { Kanban, Table, RefreshCw, Plus } from 'lucide-vue-next';

const store = useCrmStore();
</script>

<style scoped>
.toolbar-actions { display: flex; align-items: center; gap: 0.75rem; }
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
