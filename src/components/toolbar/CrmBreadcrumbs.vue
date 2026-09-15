<template>
  <div class="breadcrumbs">
    <span class="bc-root">UltimateCRM</span>
    <span class="bc-sep">/</span>
    <span class="bc-active">{{ currentTitle }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCrmStore } from '@/stores/crmStore';

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
.breadcrumbs { display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; font-weight: 500; }
.bc-root { color: var(--text-subtle); }
.bc-sep { color: var(--border-subtle); }
.bc-active { color: var(--text-main); font-weight: 700; }
</style>
