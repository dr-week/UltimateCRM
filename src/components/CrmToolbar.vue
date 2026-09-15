<template>
  <header class="crm-toolbar">
    <div class="toolbar-left">
      <CrmBreadcrumbs />
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
      <CrmToolbarSearch />
      <CrmToolbarActions />
    </div>
  </header>
</template>

<script setup lang="ts">
import { useCrmStore } from '@/stores/crmStore';
import CrmBreadcrumbs from '@/components/toolbar/CrmBreadcrumbs.vue';
import CrmToolbarSearch from '@/components/toolbar/CrmToolbarSearch.vue';
import CrmToolbarActions from '@/components/toolbar/CrmToolbarActions.vue';

const store = useCrmStore();
</script>

<style scoped>
.crm-toolbar { height: 56px; padding: 0 1.25rem; background: var(--bg-surface); border-bottom: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
.toolbar-left { display: flex; align-items: center; gap: 1.25rem; }
.quick-filters { display: flex; gap: 0.5rem; }
.toolbar-select { background: rgba(255,255,255,0.04); border: 1px solid var(--border-subtle); border-radius: 6px; color: var(--text-muted); font-size: 0.78rem; padding: 0.35rem 0.6rem; cursor: pointer; }
.toolbar-right { display: flex; align-items: center; gap: 0.75rem; }
</style>
